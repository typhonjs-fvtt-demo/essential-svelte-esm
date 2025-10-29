<script>
   import { getContext }         from 'svelte';
   import { writable }           from 'svelte/store';

   import { TJSInput }           from '#standard/component/form';

   /** @type {import('#arrayObjectContext').ItemContext} */
   const {
      itemStore,
      maxItems } = getContext('#external').itemContext;

   /**
    * Retrieve the associated `DynArrayReducer` from `GameSettingArrayObject`.
    */
   const dataReducer = itemStore.dataReducer;

   /**
    * This is a store so needs to be defined locally.
    */
   const { searchFilter } = itemStore.stores;

   /**
    * The TJSInput data configuration connecting to `searchFilter` which is associated with `itemStore` for
    * filtering item entries.
    */
   const input = {
      store: searchFilter,
      placeholder: 'Search',
      type: 'search',

      // When false, the TJSInput text color turns red. This is handled in a reactive statement below.
      storeIsValid: writable(true)
   }

   /**
    * Stores the current item count from data reducer.
    */
   let itemCount = '';

   // Update `itemCount` and `input.storeIsValid` if there are valid search results or not.
   $:
   {
      const reducerLength = $dataReducer.length;
      const searchFilterLength = $searchFilter.length;

      // Set the search filter input to invalid (red) if the data reducer is active, but with no results.
      input.storeIsValid.set(!(searchFilterLength > 0 && reducerLength === 0));

      // When the data reducer is active and length doesn't match the item store length surround the count with `()`.
      itemCount = searchFilterLength > 0 ? `(${reducerLength})` : `${reducerLength}`;
   }
</script>

<section>
   {#if itemStore.canUserEdit}
      <button disabled={$itemStore.length >= maxItems} on:click={() => itemStore.addItem()}>Add Item</button>
      <button on:click={() => itemStore.clearEntries()}>Remove All</button>
   {/if}
   <TJSInput {input}/>
   <span>Total: {itemCount} / {maxItems}</span>
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
      width: 6rem;
   }
</style>
