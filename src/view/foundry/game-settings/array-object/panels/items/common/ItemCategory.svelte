<script>
   /**
    * Defines a table cell that can be edited via a `select` element. Note `item` is `ItemEntryStore` and to
    * reactively update the data simply setting the new data to `item.category` will trigger serialization to the
    * Foundry DB.
    *
    * @componentDescription
    */

   /** 
    * @import { ChangeEventHandler }   from 'svelte/elements';
    * 
    * @import { 
    *    ItemEntryStore,
    *    TableTags }                   from '#arrayObjectContext';
    */

   import { getContext } from 'svelte';

   /** @type {ItemEntryStore} */
   export let item;

   /**
    * The dynamic table cell tag allowing reuse of this component across grid / table element layouts.
    *
    * @type {TableTags}
    */
   const { cell } = getContext('tableTags');

   /**
    * @type {ChangeEventHandler<HTMLSelectElement>}
    */
   function onChange(event)
   {
      item.category = event.currentTarget?.value;
   }
</script>

{#if item.canUserModify}
   <svelte:element this={cell} class=grid-cell>
      <select on:change={onChange}>
         {#each item.categories as category}
            <option selected={$item.category === category}>{category}</option>
         {/each}
      </select>
   </svelte:element>
{:else}
   <svelte:element this={cell} class=grid-cell>{$item.category}</svelte:element>
{/if}
