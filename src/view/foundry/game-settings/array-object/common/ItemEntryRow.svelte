<script>
   import { getContext }      from 'svelte';

   import { TJSContextMenu }  from '#standard/application/menu';

   /** @type {number} */
   export let i = 0;

   /** @type {import('#itemArrayStores').ItemEntryData} */
   export let item = void 0;

   /** @type {import('#itemArrayStores').ItemArrayObjectStore} */
   const itemStore = getContext('#external').itemStore;

   /** @type {boolean} */
   const canEdit = getContext('#external').canEdit;

   /**
    * @param {KeyboardEvent | PointerEvent} event -
    */
   function onContextMenu(event)
   {
      if (canEdit)
      {
         TJSContextMenu.create({
            event,
            items: [
               {
                  label: 'Delete',
                  onPress: () => itemStore.deleteEntry(item.id)
               }
            ]
         });

         event.preventDefault();
         event.stopPropagation();
      }
   }
</script>

<tr on:contextmenu={onContextMenu}>
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
