<script>
   import ItemEntryControls   from './ItemEntryControls.svelte';
   import ItemGrid            from './grid/ItemGrid.svelte';
   import ItemTable           from './table/ItemTable.svelte';

   // Temporary testing ----
   import { getContext } from 'svelte';

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { scope } = getContext('#external').itemContext;
   // Temporary testing ----
</script>


<section>
   <ItemEntryControls />

   {#if scope === 'user'}
      <ItemGrid />
   {:else}
      <ItemTable />
   {/if}
</section>

<style lang=scss>
   section {
      // Adjust all TRL / Foundry form input element heights.
      --input-height: 1.3rem;

      // Adjust Foundry table defaults.
      --table-cell-padding: 0.25rem 0.25rem;
      --table-header-background: var(--color-warm-2);

      // Smaller TJSIconButton diameter.
      --tjs-icon-button-diameter: 1.5rem;

      // Set to Foundry table background.
      --tjs-scroll-container-background: var(--table-background-color);

      // Adjust scroll container defaults.
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
