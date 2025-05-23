<script>
   import { flip }               from 'svelte/animate';

   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { TJSDocument }        from '#runtime/svelte/store/fvtt/document';
   import { DynReducerHelper }   from '#runtime/svelte/store/reducer';

   import { rippleFocus }        from '#standard/action/animate/composable';
   import { TJSInput }           from '#standard/component/form';

   export let elementRoot;

   const filterSearch = DynReducerHelper.filters.regexObjectQuery('type');

   const input = {
      store: filterSearch,
      efx: rippleFocus(),
      placeholder: 'wildcard',
      type: 'search'
   }

   const doc = new TJSDocument();

   const wildcard = doc.embedded.create(Item, {
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
      <div class=drop
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
      <div class=container>
         <div class=column>
            <div style="display: flex; align-items: center;">Items by type ->&nbsp;<TJSInput {input}/>&nbsp;: {$wildcard.index.length}</div>
            <br>
            <ol>
               {#each [...$wildcard] as item (item.id)}
                  <li animate:flip={{duration: 200}}>{item.name}</li>
               {/each}
            </ol>
         </div>
      </div>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      --tjs-input-text-width: 100px;

      div.container {
         display: flex;
         justify-content: flex-start;
      }

      div.column {
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: flex-start;
         width: 100%;
         border-radius: 10px;
         border: 1px solid var(--content-link-border-color);
         padding: 10px;
      }

      div.drop {
         background: rgba(0, 0, 0, 0.1);

         @at-root :global(body.theme-dark) & {
            background: rgba(208, 184, 163, 0.1);
         }

         border-radius: 10px;
         border: 1px solid var(--content-link-border-color);
         padding: 0.25em;
         margin-bottom: 0.25em;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 1.5em;
         font-weight: 100;
      }

      li {
         text-align: start
      }
   }
</style>
