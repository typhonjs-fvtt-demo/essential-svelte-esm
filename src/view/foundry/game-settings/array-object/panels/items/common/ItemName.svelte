<script>
   /**
    * Defines a table cell that can be edited via an `input` element. Note `item` is `ItemEntryStore` and to
    * reactively update the data simply setting the new data to `item.name` will trigger serialization to the
    * Foundry DB.
    *
    * This component is a bit more complex because it takes into account keyboard / accessibility and `<Tab>` /
    * `<Shift-Tab>` traversal. In edit mode all events to automatically stop editing when the user navigates
    * away are also handled.
    *
    * @componentDescription
    */
   import {
      getContext,
      onDestroy,
      tick }               from 'svelte';

   import { CrossWindow }  from '#runtime/util/browser';

   /** @type {import('#arrayObjectContext').ItemEntryStore} */
   export let item = void 0;

   /**
    * The dynamic table cell tag allowing reuse of this component across grid / table element layouts.
    *
    * @type {import('#arrayObjectContext').TableTags}
    */
   const { cell } = getContext('tableTags');

   let editing = false;

   /** @type {HTMLInputElement} */
   let inputEl;

   /** @type {HTMLDivElement} */
   let divEl;

   let activeWindow;

   let hasInitialKeyFocus = false;

   let initialValue;

   onDestroy(() => onClose());

   /**
    * @param {Event & { currentTarget: HTMLInputElement, target: HTMLInputElement }} event -
    */
   function onChange(event)
   {
      item.name = event.target.value;

      onClose(event);
   }

   /**
    * @param {Event}  [event] -
    */
   function onClose(event)
   {
      // Early out if the pointer down is inside the input element.
      if (CrossWindow.isNode(event?.target) && (event.target === inputEl || inputEl?.contains(event.target)))
      {
         return;
      }

      if (hasInitialKeyFocus)
      {
         tick().then(() => divEl?.focus());
      }

      editing = false;
      initialValue = void 0;
      hasInitialKeyFocus = false;

      if (activeWindow)
      {
         // To support cases when the active window may be a popped out browser unregister directly.
         activeWindow.document.body.removeEventListener('pointerdown', onClose, true);
         activeWindow.document.body.removeEventListener('wheel', onClose, true);
         activeWindow.removeEventListener('blur', onClose);
         activeWindow.removeEventListener('resize', onClose);

         activeWindow = void 0;
      }
   }

   function onKeyup(event)
   {
      if (event.code === 'Enter') { onStartEdit(event); }
   }

   function onKeydownInput(event)
   {
      switch (event.code)
      {
         case 'Escape':
            event.stopPropagation();
            event.preventDefault();
            // Fallthrough
         case 'Tab':
            inputEl.value = initialValue;
            onClose();
            break;
      }
   }

   function onKeyupInput(event)
   {
      switch (event.code)
      {
         case 'Enter':
            inputEl?.blur();
            onClose();
            break;
      }
   }

   function onStartEdit(event)
   {
      if (item.canUserEdit && !editing)
      {
         initialValue = item.name;
         editing = true;

         tick().then(() => inputEl?.focus());

         activeWindow = CrossWindow.getWindow(event);

         /** @type {Element} */
         const activeEl = activeWindow.document.activeElement;

         // Track if table cell has initial key focus.
         hasInitialKeyFocus = activeEl?.matches(':focus-visible') && activeEl === divEl;

         // To support cases when the active window may be a popped out browser unregister directly.
         activeWindow.document.body.addEventListener('pointerdown', onClose, true);
         activeWindow.document.body.addEventListener('wheel', onClose, true);
         activeWindow.addEventListener('blur', onClose);
         activeWindow.addEventListener('resize', onClose);
      }
   }
</script>

{#if editing}
   <svelte:element this={cell} class=grid-cell>
      <input bind:this={inputEl}
             type=text
             on:change={onChange}
             on:keydown={onKeydownInput}
             on:keyup={onKeyupInput}
             value={item.name} />
   </svelte:element>
{:else}
   <svelte:element this={cell} class=grid-cell role=cell bind:this={divEl}
       class:can-edit={item.canUserEdit}
       on:click={onStartEdit}
       on:keyup={onKeyup}
       tabindex={item.canUserEdit ? 0 : null}>
      <span>{item.name}</span>
   </svelte:element>
{/if}

<style lang=scss>
   .can-edit {
      &:hover {
         cursor: var(--tjs-cursor-pointer)
      }

      &:focus-visible {
         outline: 2px solid transparent;
      }

      &:hover span, &:focus-visible span {
         text-decoration: underline;
      }
   }
</style>
