<script>
   import ItemEntryControls   from './ItemEntryControls.svelte';
   import ItemTable           from './ItemTable.svelte';
</script>

<section>
   <ItemEntryControls />
   <ItemTable />
</section>

<style lang=scss>
   section {
      display: flex;
      flex-direction: column;

      border: 2px solid var(--color-warm-2);
      border-radius: 0.5rem;

      width: 400px;
      overflow: hidden;
   }
</style>
