<script>
   import {
      getContext,
      setContext }               from 'svelte';

   import ItemRow                from '../common/ItemRow.svelte';

   /**
    * Set the table cell tag for reuse of components from `../common` across grid / table layouts.
    */
   setContext('tableTags', { cell: 'td', row: 'tr' });

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { canEdit, itemStore } = getContext('#external').itemContext;

   const dataReducer = itemStore.dataReducer;
</script>

{#if $dataReducer.length > 0}
   <table>
      <thead>
      <tr>
         <th>#</th>
         <th>Name</th>
         <th>Category</th>
         {#if canEdit}
            <th><!-- Empty --></th>
         {/if}
      </tr>
      </thead>
      <tbody>
      {#each [...$dataReducer] as item, i (item.id)}
         <ItemRow {item} {i} />
      {/each}
      </tbody>
   </table>
{/if}

<style lang=scss>
   table {
      // Adjust Foundry core styles removing `margin` and `overflow` to allow sticky header.
      margin: 0;
      overflow: unset;

      --table-col-min-width: 2rem;
      --table-cols-width: 50%;

      :global(td) {
         padding: var(--table-cell-padding);
      }

      :global(td:nth-child(1)), :global(td:nth-child(4)) {
         width: var(--table-col-min-width);
      }

      :global(td:nth-child(2)), :global(td:nth-child(3)) {
         width: var(--table-cols-width);
      }

      th {
         padding: var(--table-cell-padding);
         color: var(--table-header-color);
         filter: drop-shadow(2px 2px 1px black);
      }

      th:nth-child(1), th:nth-child(4) {
         width: var(--table-col-min-width);
      }

      th:nth-child(2), th:nth-child(3) {
         width: var(--table-cols-width);
      }
   }

   thead {
      position: sticky;
      z-index: 2;

      // Helps for sub-pixel alignment when sticky.
      top: -0.5px;
      border: 0;

      // Sticky requires an explicit background.
      background: var(--table-header-background);

      filter: drop-shadow(-3px 0px 3px black);
   }
</style>
