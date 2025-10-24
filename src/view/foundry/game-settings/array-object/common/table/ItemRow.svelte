<script>
   import { getContext }      from 'svelte';

   import {
      ClipboardAccess,
      CrossWindow }           from '#runtime/util/browser';

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
      const items = []

      if (canEdit)
      {
         items.push({
            label: 'Delete',
            onPress: () =>
            {
               itemStore.deleteEntry(item.id);

               // Focus main app content after deletion.
               $elementContent?.focus();
            }
         });

         if (itemStore.length < 25)
         {
            items.push({
               label: 'Duplicate',
               onPress: () => itemStore.duplicateEntry(item.id)
            });
         }

         items.push({ separator: 'hr' })
      }

      items.push({
         label: 'Copy JSON',
         onPress: ({ event }) =>
         {
            ClipboardAccess.writeText(JSON.stringify(item.toJSON() ?? ''), CrossWindow.getWindow(event));
         }
      });

      if (items.length)
      {
         TJSContextMenu.create({
            event,
            items
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
