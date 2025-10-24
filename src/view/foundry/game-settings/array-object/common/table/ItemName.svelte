<script>
   import {
      getContext,
      onDestroy,
      tick }               from 'svelte';

   import { CrossWindow }  from '#runtime/util/browser';

   /** @type {import('#itemArrayStores').ItemEntryData} */
   export let item = void 0;

   /** @type {boolean} */
   const canEdit = getContext('#external').canEdit;

   let editing = false;

   /** @type {HTMLInputElement} */
   let inputEl;

   /** @type {HTMLTableCellElement} */
   let tdEl;

   let activeWindow;

   let hasInitialKeyFocus = false;

   let initialValue;

   onDestroy(() => onClose());

   /**
    * @param {Event & { target: HTMLInputElement }} event -
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
         tick().then(() => tdEl?.focus());
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
      if (canEdit && !editing)
      {
         initialValue = item.name;
         editing = true;

         tick().then(() => inputEl?.focus());

         activeWindow = CrossWindow.getWindow(event);

         /** @type {Element} */
         const activeEl = activeWindow.document.activeElement;

         // Track if table cell has initial key focus.
         hasInitialKeyFocus = activeEl?.matches(':focus-visible') && activeEl === tdEl;

         // To support cases when the active window may be a popped out browser unregister directly.
         activeWindow.document.body.addEventListener('pointerdown', onClose, true);
         activeWindow.document.body.addEventListener('wheel', onClose, true);
         activeWindow.addEventListener('blur', onClose);
         activeWindow.addEventListener('resize', onClose);
      }
   }
</script>

{#if editing}
   <td>
      <input bind:this={inputEl}
             type=text
             on:change={onChange}
             on:keydown={onKeydownInput}
             on:keyup={onKeyupInput}
             value={item.name} />
   </td>
{:else}
   <td bind:this={tdEl}
       class:can-edit={canEdit}
       on:click={onStartEdit}
       on:keyup={onKeyup}
       tabindex={canEdit ? 0 : null}>
      <span>{item.name}</span>
   </td>
{/if}


<style lang=scss>
   td {
      padding: var(--table-col-padding);
   }

   td:focus {
      outline: 2px solid transparent;
   }

   td.can-edit {
      &:hover {
         cursor: var(--tjs-cursor-pointer)
      }

      &:hover span, &:focus-visible span {
         text-decoration: underline;
      }
   }
</style>
