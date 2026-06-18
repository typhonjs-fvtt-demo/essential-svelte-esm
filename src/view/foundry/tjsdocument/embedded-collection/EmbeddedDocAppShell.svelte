<script>
   import { flip }               from 'svelte/animate';

   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { TJSDocument }        from '#runtime/svelte/store/fvtt/document';
   import { DynReducerHelper }   from '#runtime/svelte/store/reducer';

   import { rippleFocus }        from '#standard/action/animate/composable';
   import { TJSInput }           from '#standard/component/form';

   /** @type {HTMLElement} */
   export let elementRoot;

   const filterSearch = DynReducerHelper.filters.regexObjectQuery('type');

   const input = {
      store: filterSearch,
      efx: rippleFocus(),
      placeholder: 'wildcard',
      type: 'search'
   }

   const doc = new TJSDocument();

   const wildcard = doc.embedded.create(foundry.documents.Item, {
      name: 'wildcard',
      filters: [filterSearch],
      sort: (a, b) => a.name.localeCompare(b.name)
   });

   /**
    * Handles parsing the drop event and sets new document source.
    *
    * @param {DragEvent}   event -
    */
   function onDrop(event)
   {
      try
      {
         doc.setFromDataTransfer(JSON.parse(event.dataTransfer.getData('text/plain')));
      }
      catch (err) { /**/ }
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <h1>Reactive Embedded Collections</h1>
      <!-- `preventDefault` on `dragover` is necessary for cross browser window drag & drop -->
      <div class=tjs-panel-content
           on:drop={onDrop}
           on:dragover|preventDefault
           role=region
           aria-dropeffect=none
           aria-label="Document drop target">
         Drop Actor Document Here<br>
         {#if $doc}
            Name: {$doc?.name}
         {/if}
      </div>
      <div class="column tjs-panel-content">
         <div class=item-by-type>Items by type ->&nbsp;<TJSInput {input}/>&nbsp;: {$wildcard.index.length}</div>
         <ol>
            {#each [...$wildcard] as item (item.id)}
               <li animate:flip={{duration: 200}}>{item.name}</li>
            {/each}
         </ol>
      </div>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      gap: 0.5em;

      --tjs-input-text-width: 100px;

      div.column {
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: flex-start;
         width: 100%;

         &.tjs-panel-content {
            --tjs-panel-padding: 0 0 0.5rem 0;
         }
      }

      div.item-by-type {
         display: flex;
         align-self: center;
         align-items: center;
         padding: 0.5rem;
         border-bottom: var(--tjs-content-border);
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 1.5em;
         font-weight: 100;
      }

      li {
         text-align: start;

         &:first-of-type {
            margin-top: 0.5rem;
         }
      }

      ol {
         overflow-y: auto;
         max-height: 75vh;

         // Note: this just keeps list oriented numbers simple for 0-99.
         padding: 0 0.5rem 0 2rem;
         margin: 0;
      }
   }
</style>
