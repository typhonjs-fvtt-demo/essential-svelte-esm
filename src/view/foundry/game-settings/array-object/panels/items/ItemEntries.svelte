<script>
   import { getContext }         from 'svelte';

   import { TJSScrollContainer } from '#runtime/svelte/component/container';

   import ItemEntryControls      from './ItemEntryControls.svelte';
   import ItemGrid               from './grid/ItemGrid.svelte';
   import ItemTable              from './table/ItemTable.svelte';

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { layoutType, scrollTop } = getContext('#external').itemContext;
</script>

<section>
   <ItemEntryControls />

   <TJSScrollContainer {scrollTop}>
      <!-- Context option to swap between `grid` and `table` layout. I suggest using grid layouts instead of tables. -->
      {#if $layoutType === 'grid'}
         <ItemGrid />
      {:else}
         <ItemTable />
      {/if}
   </TJSScrollContainer>
</section>

<style lang=scss>
   section {
      // Adjust all TRL / Foundry form input element heights.
      --input-height: 1.3rem;

      // Adjust Foundry table defaults.
      --table-cell-padding: 0.25rem 0.25rem;
      --table-header-background: var(--color-warm-2);

      --table-header-color: var(--color-light-1);

      // Smaller TJSIconButton diameter.
      --tjs-icon-button-diameter: 1.5rem;

      // Set to Foundry table background.
      --tjs-scroll-container-background: var(--table-background-color);

      // Adjust scroll container defaults.
      --tjs-scroll-container-max-height: 300px;

      display: flex;
      flex-direction: column;

      border: 2px solid var(--color-warm-2);
      border-radius: 0.5rem;

      width: 500px;
      overflow: hidden;
   }
</style>
