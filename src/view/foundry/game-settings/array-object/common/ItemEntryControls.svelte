<script>
   import { getContext }         from 'svelte';

   import { rippleFocus }        from '#standard/action/animate/composable';
   import { TJSInput }           from '#standard/component/form';

   import { getRandomItem }      from '../data/randomItem.js';

   /** @type {import('#itemArrayStores').ItemArrayObjectStore} */
   const itemStore = getContext('#external').itemStore;

   const dataReducer = itemStore.dataReducer;

   /** @type {boolean} */
   const canEdit = getContext('#external').canEdit;

   const searchFilter = getContext('#external').searchFilter;

   const input = {
      store: searchFilter,
      efx: rippleFocus(),
      placeholder: 'Search',
      type: 'search'
   }
</script>

<section>
   {#if canEdit}
      <button disabled={$itemStore.length >= 25} on:click={() => itemStore.createEntry(getRandomItem())}>Add Item</button>
      <button on:click={() => itemStore.clearEntries()}>Remove All</button>
   {/if}
   <TJSInput {input}/>
   <span>Total: {$dataReducer.length} / 25</span>
</section>

<style lang=scss>
   section {
      --tjs-input-width: 12rem;

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem;
      gap: 0.75rem;

      height: 40px;

      border-bottom: 1px solid var(--color-warm-1)
   }

   span {
      width: 5rem;
   }
</style>
