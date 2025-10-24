<script>
   /** @type {number} */
   export let i = 0;

   /** @type {import('../ItemEntryStore').ItemEntryData} */
   export let item = void 0;
</script>

<tr>
   <td>{i + 1}</td>
   <td>{item.title}</td>
</tr>

<style lang=scss>
   td:nth-child(1) {
      width: var(--table-col1-width);
   }

   td:nth-child(2) {
      width: var(--table-col2-width);
   }
</style>
