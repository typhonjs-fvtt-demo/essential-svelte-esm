<script>
   /**
    * Defines a table cell that can be edited via a `select` element. Note `item` is `ItemEntryStore` and to
    * reactively update the data simply setting the new data to `item.category` will trigger serialization to the
    * Foundry DB.
    *
    * @componentDescription
    */

   import { getContext } from 'svelte';

   /** @type {import('#arrayObjectContext').ItemEntryStore} */
   export let item;

   /**
    * The dynamic table cell tag allowing reuse of this component across grid / table element layouts.
    *
    * @type {import('#arrayObjectContext').TableTags}
    */
   const { cell } = getContext('tableTags');

   /**
    * @param {Event & { currentTarget: HTMLSelectElement, target: HTMLSelectElement }} event -
    */
   function onChange(event)
   {
      item.category = event.target.value;
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
