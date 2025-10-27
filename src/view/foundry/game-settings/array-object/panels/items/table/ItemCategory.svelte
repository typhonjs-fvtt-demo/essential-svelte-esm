<script>
   /**
    * Defines a table cell that can be edited via a `select` element. Note `item` is `ItemEntryStore` and to
    * reactively update the data simply setting the new data to `item.category` will trigger serialization to the
    * Foundry DB.
    *
    * @componentDescription
    */

   import { getContext } from 'svelte';

   /** @type {import('#arrayObjectData').ItemEntryStore} */
   export let item = void 0;

   /** @type {import('#arrayObjectData').ItemContext} */
   const { canEdit, itemGenerator } = getContext('#external').itemContext;

   /**
    * @param {Event & { currentTarget: HTMLSelectElement, target: HTMLSelectElement }} event -
    */
   function onChange(event)
   {
      item.category = event.target.value;
   }
</script>

{#if canEdit}
   <td>
      <select on:change={onChange}>
         {#each itemGenerator.categories as category}
            <option selected={item.category === category}>{category}</option>
         {/each}
      </select>
   </td>
{:else}
   <td>{item.category}</td>
{/if}


<style lang=scss>
   td {
      padding: var(--table-col-padding);
   }
</style>
