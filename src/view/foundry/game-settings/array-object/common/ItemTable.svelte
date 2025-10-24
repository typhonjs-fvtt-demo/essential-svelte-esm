<script>
   import { getContext }         from 'svelte';

   import { TJSScrollContainer } from '#standard/component/container';

   import ItemEntryRow           from './ItemEntryRow.svelte';

   /** @type {import('#runtime/svelte/store/reducer/array-object').CrudArrayObjectStore} */
   const itemStore = getContext('#external').itemStore;
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
         </tr>
         </thead>
         <tbody>
         {#each [...$dataReducer] as item, i (item.id)}
            <ItemEntryRow {item} {i} />
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
   }

   table {
      --table-col1-width: 3rem;
      --table-col2-width: fit-content(200px);

      // Adjust Foundry core styles removing `margin` and `overflow` to allow sticky header.
      margin: 0;
      overflow: unset;

      th:nth-child(1) {
         width: var(--table-col1-width);
      }

      th:nth-child(2) {
         width: var(--table-col2-width);
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
