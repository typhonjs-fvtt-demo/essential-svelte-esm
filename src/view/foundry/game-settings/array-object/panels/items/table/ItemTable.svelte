<script>
   import { getContext }         from 'svelte';

   import { TJSScrollContainer } from '#standard/component/container';

   import ItemRow                from './ItemRow.svelte';

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { canEdit, itemStore } = getContext('#external').itemContext;

   const dataReducer = itemStore.dataReducer;
</script>

{#if $dataReducer.length > 0}
<TJSScrollContainer>
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
</TJSScrollContainer>
{/if}

<style lang=scss>
   table {
      // Adjust Foundry core styles removing `margin` and `overflow` to allow sticky header.
      margin: 0;
      overflow: unset;

      th {
         padding: var(--table-col-padding);
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

      // Sticky requires an explicit background; use Foundry CSS var.
      background: var(--color-warm-2);

      box-shadow: inset 0 -1px 0 var(--color-warm-3);
   }
</style>
