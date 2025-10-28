import {
   ClipboardAccess,
   CrossWindow } from '#runtime/util/browser';

export class MenuItems
{
   #itemContext;

   /**
    * @param {import('#arrayObjectContext').ItemContext} itemContext -
    */
   constructor(itemContext)
   {
      this.#itemContext = itemContext;
   }

   /**
    * Creates the context menu items to display for a table row.
    *
    * @param {import('#arrayObjectContext').ItemEntryStore} item - An item entry store.
    *
    * @returns {import('#standard/component/menu').TJSMenuData.Items[]} Menu items.
    */
   createRow(item)
   {
      /** @type {import('#standard/component/menu').TJSMenuData.Items[]} */
      const items = [];

      if (this.#itemContext.canEdit)
      {
         items.push({
            label: 'Delete',
            onPress: () =>
            {
               this.#itemContext.itemStore.deleteEntry(item.id);

               this.#itemContext.application?.elementContent?.focus();
            }
         });

         if (this.#itemContext.itemStore.length < this.#itemContext.maxItems)
         {
            items.push({
               label: 'Duplicate',
               onPress: () => { this.#itemContext.itemStore.duplicateEntry(item.id); }
            });
         }

         items.push({ separator: 'hr' });
      }

      items.push({
         label: 'Copy JSON',
         onPress: ({ event }) =>
         {
            // An example where cross-realm / window handling is important. To copy data to the clipboard when popped
            // out you must provide the current active window which is done via `CrossWindow.getWindow(event)`.
            ClipboardAccess.writeText(JSON.stringify(item.toJSON() ?? ''), CrossWindow.getWindow(event));
         }
      });

      return items;
   }
}
