<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   /** 
    * @import { SvelteApp }      from '#runtime/svelte/application';
    */

   /** @type {HTMLElement} */
   export let elementRoot;

   /** @type {SvelteApp.Context.External} */
   const { application } = getContext('#external');

   const activeClasses = application.reactive.activeClasses;

   /**
    * Adds or deletes a CSS class from the main app window.
    *
    * @param {string}   className - CSS class to modify.
    */
   function addDeleteClass(className)
   {
      if (activeClasses.has(className)) { activeClasses.delete(className); }
      else { activeClasses.add(className); }
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=text>
         <p>
            SvelteApp allows easy reactive control of CSS classes added / deleted from the main app window through the
            `activeClasses` Set available from `application.reactive.activeClasses`. It is a Readable reactive store
            that provides subscriber notifications when entries change. The `classes` SvelteApp option provides the
            base entries in the `activeClasses` Set. Other runtime classes like the current theme are not included in
            `activeClasses`; just the classes that you specify and add / delete at runtime. Of note, the main SvelteApp
            `classes` option is _not_ modified reactively, so any changes at runtime are only applied to the app window.
         </p>
         <p>
            This example is visually busy, but you can use this feature to change modes or other CSS / style
            modifications for your entire app.
         </p>
      </section>

      <fieldset class="tjs-panel-content tjs-panel-content--flex-col">
         <legend class=tjs-panel-legend>Active App Classes</legend>
         <div class=grid>
               <span>{$activeClasses.has('foo') ? 'Delete' : 'Add'} `foo`:</span>
               <input type='checkbox' on:change={() => addDeleteClass('foo')} />
               <span>(background transparent red)</span>

               <span>{$activeClasses.has('bar') ? 'Delete' : 'Add'} `bar`:</span>
               <input type='checkbox' on:change={() => addDeleteClass('bar')} />
               <span>(invert filter)</span>
         </div>
         <div class=row>
            Current active classes: {JSON.stringify([...$activeClasses])}
         </div>
      </fieldset>
   </main>
</ApplicationShell>

<style lang=scss>
   // Just an cheeky example / background transparent red.
   :global(#tjs-active-classes-esm.foo) {
      background: rgba(255, 0, 0, 0.5);
      color: white;  // For light theme text.
   }

   // Apply the invert filter.
   :global(#tjs-active-classes-esm.bar) {
      filter: invert(75%);
   }

   div {
      &.grid {
         display: grid;
         grid-template-columns: 80px auto 1fr;
         align-items: center;
         gap: 0.5em;
         margin: auto;

         > span:has(+ input[type='checkbox']) { justify-self: end; text-align: right; }
         > input[type='checkbox'] { justify-self: center; }
      }

      &.row {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
   }

   main {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      height: 100%;
   }

   section {
      display: flex;
      justify-content: center;

      &.text {
         flex-direction: column;
      }
   }

   fieldset {
      margin: auto auto 0 auto;
      width: 425px;
   }
</style>
