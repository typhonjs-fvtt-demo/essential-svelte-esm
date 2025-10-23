import { UserArrayObjectStore }  from '#runtime/svelte/store/fvtt/settings/user';

import { ItemEntryStore }        from '../common/ItemEntryStore';

import { constants }             from '#constants';
import { gameSettings }          from '#gameSettings';

/**
 * Provides a simplified wrapper around configuring `UserArrayObjectStore`. You can of course directly
 * configure `UserArrayObjectStore`, but when setting up multiple instances of such a store for a more complex
 * use case it can be handy to create a simplified wrapper that associates constants and the `TJSGameSettings` instance.
 *
 * @augments UserArrayObjectStore<ItemEntryStore>
 */
export class UserItemArrayStore extends UserArrayObjectStore
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
