<script>
   import { getContext }         from 'svelte';

   import { TJSInput }           from '#standard/component/form';

   /** @type {import('#arrayObjectData').ItemContext} */
   const { canEdit, createRandomItem, itemStore, searchFilter } = getContext('#external').itemContext;

   const dataReducer = itemStore.dataReducer;

   const input = {
      store: searchFilter,
      placeholder: 'Search',
      type: 'search'
   }

   function clearEntries()
   {
      itemStore.clearEntries();

      // Reset search filter.
      searchFilter.set('');
   }

   function createEntry()
   {
      itemStore.createEntry(createRandomItem());

      // Reset search filter.
      searchFilter.set('');
   }
</script>

<section>
   {#if canEdit}
      <button disabled={$itemStore.length >= 25} on:click={createEntry}>Add Item</button>
      <button on:click={clearEntries}>Remove All</button>
   {/if}
   <TJSInput {input}/>
   <span>Total: {$dataReducer.length} / 25</span>
</section>

<style lang=scss>
   section {
      --tjs-input-width: 12rem;
      --tjs-input-text-align: center;

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
