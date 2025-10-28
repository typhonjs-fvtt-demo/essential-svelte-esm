<script>
   import { getContext }         from 'svelte';

   import { TJSScrollContainer } from '#standard/component/container';

   import ItemRow                from './ItemRow.svelte';

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { canEdit, itemStore } = getContext('#external').itemContext;

   const dataReducer = itemStore.dataReducer;
</script>


<TJSScrollContainer>
   {#if $dataReducer.length > 0}
      <main class:can-edit={canEdit}>
         <section class="grid-row header">
            <div class=grid-cell>#</div>
            <div class=grid-cell>Name</div>
            <div class=grid-cell>Category</div>
            {#if canEdit}
               <div class=grid-cell><!-- Empty --></div>
            {/if}
         </section>
          {#each [...$dataReducer] as item, i (item.id)}
             <ItemRow {item} {i} />
          {/each}
      </main>
   {/if}
</TJSScrollContainer>

<style lang=scss>
   main {
      --grid-template-columns:
         1.5rem
         1fr
         1fr;

      &.can-edit {
         --grid-template-columns:
            1.5rem
            1fr
            1fr
            2.5rem;
      }

      align-items: center;

      :global(.grid-cell) {
         align-content: center;
         height: 100%;
         padding: var(--table-cell-padding);
      }

      :global(.grid-row) {
         display: grid;
         grid-template-columns: var(--grid-template-columns);
      }

      // Due to ordering of rows swap even / odd of Foundry CSS vars to match table highlighting.
      :global(.grid-row:nth-child(odd)) {
         background: var(--table-row-color-even);
      }

      :global(.grid-row:nth-child(even)) {
         background: var(--table-row-color-odd);
      }
   }

   section.header {
      position: sticky;
      z-index: 2;

      // Helps for sub-pixel alignment when sticky.
      top: -0.5px;
      border: 0;

      // Sticky requires an explicit background.
      background: var(--table-header-background);

      > div {
         font-weight: bold;
      }
   }
</style>
