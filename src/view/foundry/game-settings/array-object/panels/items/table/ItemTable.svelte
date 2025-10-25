<script>
   import { getContext }         from 'svelte';

   import { TJSScrollContainer } from '#standard/component/container';

   import ItemRow                from './ItemRow.svelte';

   /** @type {import('#arrayObjectData').ItemContext} */
   const { itemStore } = getContext('#external').itemContext;

   const dataReducer = itemStore.dataReducer;
</script>

{#if $dataReducer.length > 0}
<section>
   <TJSScrollContainer>
      <table>
         <thead>
         <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
         </tr>
         </thead>
         <tbody>
         {#each [...$dataReducer] as item, i (item.id)}
            <ItemRow {item} {i} />
         {/each}
         </tbody>
      </table>
   </TJSScrollContainer>
</section>
{/if}

<style lang=scss>
   section {
      --tjs-scroll-container-max-height: 300px;
      --tjs-scroll-container-scrollbar-gutter: auto;

      --input-height: 1.3rem;
   }

   table {
      --table-col1-width: 3rem;
      --table-cols-width: 50%;
      --table-col-padding: 0.5rem 0.5rem;

      // Adjust Foundry core styles removing `margin` and `overflow` to allow sticky header.
      margin: 0;
      overflow: unset;

      th {
         padding: var(--table-col-padding);
      }

      th:nth-child(1) {
         width: var(--table-col1-width);
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
