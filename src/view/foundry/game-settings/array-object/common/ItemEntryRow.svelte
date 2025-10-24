<script>
   /** @type {number} */
   export let i = 0;

   /** @type {import('#itemArrayStores').ItemEntryData} */
   export let item = void 0;
</script>

<tr>
   <td>{i + 1}</td>
   <td>{item.name}</td>
   <td>{item.category}</td>
</tr>

<style lang=scss>
   td:nth-child(1) {
      width: var(--table-col1-width);
   }

   td:nth-child(2), td:nth-child(3) {
      width: var(--table-cols-width);
   }
</style>
