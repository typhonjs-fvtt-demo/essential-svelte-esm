import { get }             from 'svelte/store';

import { ClipboardAccess } from '#runtime/util/browser';
import { CrossRealm }      from '#runtime/util/realm';

/** 
 * @import { SvelteApp }   from '#runtime/svelte/application';
 * 
 * @import { TJSMenuData } from '#standard/component/menu';
 * 
 * @import { 
 *    ItemContext,
 *    ItemEntryStore }     from '#arrayObjectContext';
 */

/**
 * Provides menu item data generation that is accessible from `ItemContext`.
 */
export class MenuItems
{
   /** @type {SvelteApp} */
   #application;

   /** @type {ItemContext} */
   #itemContext;

   /**
    * @param {SvelteApp} application -
    *
    * @param {ItemContext} itemContext -
    */
   constructor(application, itemContext)
   {
      this.#application = application;
      this.#itemContext = itemContext;
   }

   /**
    * Creates the context menu items to display for a table row.
    *
    * @param {ItemEntryStore} item - An item entry store.
    *
    * @returns {TJSMenuData.Items[]} Menu items.
    */
   contextRow(item)
   {
      /** @type {TJSMenuData.Items[]} */
      const items = [];

      if (item.canUserModify)
      {
         items.push({
            icon: 'fas fa-xmark',
            label: 'Delete',
            onPress: () =>
            {
               this.#itemContext.itemStore.deleteEntry(item.id);

               // Row / event target is being deleted, so focus the app content.
               this.#application?.elementContent?.focus();
            }
         });

         if (this.#itemContext.itemStore.length < this.#itemContext.maxItems)
         {
            items.push({
               icon: 'fas fa-clone',
               label: 'Duplicate',
               onPress: () => { this.#itemContext.itemStore.duplicateEntry(item.id); }
            });
         }

         items.push({ separator: 'hr' });
      }

      items.push({
         icon: 'fas fa-copy',
         label: 'Copy JSON',
         onPress: ({ event }) =>
         {
            // An example where cross-realm / window handling is important. To copy data to the clipboard when popped
            // out you must provide the current active window which is done via `CrossRealm.browser.getWindow(event)`.
            ClipboardAccess.writeText(JSON.stringify(item.toJSON()), CrossRealm.browser.getWindow(event));
         }
      });

      items.push({ separator: 'hr' });

      // Switches the main item entries layout between `ItemGrid` and `ItemTable`.

      const currentLayoutType = get(this.#itemContext.layoutType);

      items.push({
         icon: currentLayoutType === 'grid' ? 'fas fa-table' : 'fas fa-grid',
         label: currentLayoutType === 'grid' ? 'Table Layout' : 'Grid Layout',
         onPress: () =>
         {
            this.#itemContext.layoutType.set(currentLayoutType === 'grid' ? 'table' : 'grid');

            // Entire item entries table is being swapped out, so focus the app content.
            this.#application?.elementContent?.focus();
         }
      });

      return items;
   }
}
