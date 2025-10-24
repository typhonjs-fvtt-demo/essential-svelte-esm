import { WorldArrayObjectStore }  from '#runtime/svelte/store/fvtt/settings/world';

import { ItemEntryStore }        from './ItemEntryStore.js';

import { constants }             from '#constants';
import { gameSettings }          from '#gameSettings';

/**
 * Provides a simplified wrapper around configuring `WorldArrayObjectStore`. You can of course directly
 * configure `WorldArrayObjectStore`, but when setting up multiple instances of such a store for a more complex
 * use case it can be handy to create a simplified wrapper that associates constants and the `TJSGameSettings` instance
 * taking just the actual setting key. If you have multiple categories or multiple object arrays to manage store each
 * under a unique setting key versus attempting to combine all categories in one large data structure.
 *
 * @augments WorldArrayObjectStore<ItemEntryStore>
 */
export class WorldItemArrayStore extends WorldArrayObjectStore
{
   /**
    * @param {string} key - Game setting key to associate with this instance.
    */
   constructor(key)
   {
      super({
         gameSettings,
         namespace: constants.moduleId,
         key,
         StoreClass: ItemEntryStore,
         dataReducer: true
      });
   }
}
