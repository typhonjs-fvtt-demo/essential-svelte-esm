<script>
   import {
      getContext,
      setContext }               from 'svelte';

   import ItemRow                from '../common/ItemRow.svelte';

   /**
    * Set the table cell tag for reuse of components from `../common` across grid / table layouts.
    */
   setContext('tableTags', { cell: 'div', row: 'section' });

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { itemStore } = getContext('#external').itemContext;

   const dataReducer = itemStore.dataReducer;
</script>

{#if $dataReducer.length > 0}
   <main class:can-edit={itemStore.canEdit}>
      <section class="grid-row header">
         <div class=grid-cell>#</div>
         <div class=grid-cell>Name</div>
         <div class=grid-cell>Category</div>
         {#if itemStore.canEdit}
            <div class=grid-cell><!-- Empty --></div>
         {/if}
      </section>
       {#each [...$dataReducer] as item, i (item.id)}
          <ItemRow {item} {i} />
       {/each}
   </main>
{/if}

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
      color: var(--table-header-color);
      filter: drop-shadow(-3px 0px 3px black);

      > div {
         font-weight: bold;
         filter: drop-shadow(2px 2px 1px black);
      }
   }
</style>
