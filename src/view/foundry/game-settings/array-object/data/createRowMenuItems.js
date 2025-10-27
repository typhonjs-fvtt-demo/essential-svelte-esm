import {
   ClipboardAccess,
   CrossWindow } from '#runtime/util/browser';

/**
 * Creates the context menu items to display for a table row.
 *
 * @param {import('#arrayObjectData').ItemContext} itemContext - Item entries context.
 *
 * @param {import('#arrayObjectData').ItemEntryStore} item - An item entry store.
 *
 * @param {HTMLElement} elementContent - App shell element content.
 *
 * @returns {import('#standard/component/menu').TJSMenuData.Items[]} Menu items.
 */
export function createRowMenuItems(itemContext, item, elementContent)
{
   /** @type {import('#standard/component/menu').TJSMenuData.Items[]} */
   const items = [];

   if (itemContext.canEdit)
   {
      items.push({
         label: 'Delete',
         onPress: () =>
         {
            itemContext.itemStore.deleteEntry(item.id);

            // Focus main app content after deletion.
            elementContent?.focus();
         }
      });

      if (itemContext.itemStore.length < itemContext.maxItems)
      {
         items.push({
            label: 'Duplicate',
            onPress: () => { itemContext.itemStore.duplicateEntry(item.id); }
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
