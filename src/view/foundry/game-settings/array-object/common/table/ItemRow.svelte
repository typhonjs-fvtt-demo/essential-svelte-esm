<script>
   import { getContext }      from 'svelte';

   import { TJSContextMenu }  from '#standard/application/menu';

   import ItemCategory        from './ItemCategory.svelte';
   import ItemName            from './ItemName.svelte';

   /** @type {number} */
   export let i = 0;

   /** @type {import('#itemArrayStores').ItemEntryData} */
   export let item = void 0;

   /** @type {import('#itemArrayStores').ItemArrayObjectStore} */
   const itemStore = getContext('#external').itemStore;

   /** @type {boolean} */
   const canEdit = getContext('#external').canEdit;

   /** @type {import('svelte/store').Readable<HTMLElement>} */
   const elementContent = getContext('#internal').stores.elementContent;

   /**
    * @param {MouseEvent} event -
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
                  onPress: () =>
                  {
                     itemStore.deleteEntry(item.id);

                     // Focus main app content after deletion.
                     $elementContent?.focus();
                  }
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
   <ItemName {item} />
   <ItemCategory {item} />
</tr>

<style lang=scss>
   td {
      padding: var(--table-col-padding);
   }

   td:nth-child(1) {
      width: var(--table-col1-width);
   }

   td:nth-child(2), td:nth-child(3) {
      width: var(--table-cols-width);
   }
</style>
