<script>
   import { getContext } from 'svelte';

   import { categories } from '../../data/randomItem.js';

   /** @type {import('#itemArrayStores').ItemEntryData} */
   export let item = void 0;

   /** @type {boolean} */
   const canEdit = getContext('#external').canEdit;

   function onChange(event)
   {
      item.category = event.target.value;
   }
</script>

{#if canEdit}
   <td>
      <select on:change={onChange}>
         {#each categories as category}
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
