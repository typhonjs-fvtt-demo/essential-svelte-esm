<script>
   import { getContext }         from 'svelte';
   import { flip }               from 'svelte/animate';

   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { rippleFocus }        from '@typhonjs-fvtt/svelte-standard/action';
   import { TJSInput }           from '@typhonjs-fvtt/svelte-standard/component';
   import { createFilterQuery }  from '@typhonjs-fvtt/svelte-standard/store';

   import { TJSDocument }        from './document/TJSDocument.js';

   export let elementRoot;

   const application = getContext('external').application;

   const filterSearch = createFilterQuery('type');

   const input = {
      store: filterSearch,
      efx: rippleFocus(),
      placeholder: "wildcard",
      type: 'search'
   }

   const doc = new TJSDocument(game.actors.get('yEkk9vsgMEtxx3XZ'), { delete: () => application.close() })

   /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, Item>} */
   const wildcard = doc.embedded.create('Item', {
      name: 'wildcard',
      filters: [filterSearch],
      sort: (a, b) => a.name.localeCompare(b.name)
   });

   // /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, Item>} */
   // const wildcard = doc.embedded.create('Item', 'wildcard');
   // wildcard.filters.add(filterSearch);
   // wildcard.sort.set((a, b) => a.name.localeCompare(b.name));

   // import { CustomReducer } from './CustomReducer.js';
   // const wildcard = doc.embedded.create('Item', CustomReducer);
   // wildcard.filters.add(filterSearch);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <h1>Embedded Doc Test</h1>
      <br>
      <div class=container>
         <div class=column>
            <div style="display: flex; align-items: center;">Number of &nbsp;<TJSInput {input}/>&nbsp;: {$wildcard.index.length}</div>
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
         padding: 10px;
      }

      div.column {
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: flex-start;
         border-radius: 10px;
         border: 2px solid rgba(0, 0, 0, 0.2);
         padding: 10px;
         margin-bottom: 10px;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 2em;
         font-weight: 100;
      }

      li {
         text-align: start
      }

      //label {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //}
   }
</style>