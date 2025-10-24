<script>
   import { getContext } from 'svelte';

   /** @type {import('#itemArrayStores').ItemArrayObjectStore} */
   const itemStore = getContext('#external').itemStore;

   /** @type {boolean} */
   const canEdit = getContext('#external').canEdit;
</script>

<section>
   {#if canEdit}
      <button disabled={$itemStore.length >= 25} on:click={() => itemStore.createEntry({ title: `Item-${itemStore.length + 1}` })}>Add Item</button>
      <button on:click={() => itemStore.clearEntries()}>Remove All</button>
   {/if}
   <span>Total Items: {$itemStore.length} / 25</span>
</section>

<style lang=scss>
   section {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem;
      gap: 0.5rem;

      height: 40px;

      border-bottom: 1px solid var(--color-warm-1)
   }
</style>
