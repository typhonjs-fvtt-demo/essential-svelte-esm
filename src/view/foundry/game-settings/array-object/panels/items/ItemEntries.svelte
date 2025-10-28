<script>
   import ItemEntryControls   from './ItemEntryControls.svelte';
   import ItemTable           from './table/ItemTable.svelte';
</script>

<section>
   <ItemEntryControls />
   <ItemTable />
</section>

<style lang=scss>
   section {
      --input-height: 1.3rem;

      --table-col-min-width: 3rem;
      --table-cols-width: 50%;
      --table-col-padding: 0.5rem 0.5rem;

      --tjs-icon-button-diameter: 1.5rem;
      --tjs-scroll-container-max-height: 300px;
      --tjs-scroll-container-scrollbar-gutter: auto;

      display: flex;
      flex-direction: column;

      border: 2px solid var(--color-warm-2);
      border-radius: 0.5rem;

      width: 500px;
      overflow: hidden;
   }
</style>
