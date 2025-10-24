<script>
   import { getContext } from 'svelte';

   /** @type {UserItemArrayStore} */
   const itemStore = getContext('#external').itemStore;
</script>

<section>
   <button disabled={$itemStore.length >= 25} on:click={() => itemStore.createEntry({ title: `Item-${itemStore.length + 1}` })}>Add Item</button>
   <button on:click={() => itemStore.clearEntries()}>Remove All</button>
   <span>Total Items: {$itemStore.length} / 25</span>
</section>

<style lang=scss>
   section {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem;
      gap: 0.5rem;

      height: fit-content;

      border-bottom: 1px solid var(--color-warm-1)
   }
</style>
