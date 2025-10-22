import { UserArrayObjectStore }  from '#runtime/svelte/store/fvtt/settings/user';

import { ItemEntryStore }        from './ItemEntryStore';

import { constants }             from '#constants';
import { gameSettings }          from '#gameSettings';

/**
 * @augments UserArrayObjectStore<ItemEntryStore>
 */
export class UserItemArrayStore extends UserArrayObjectStore
{
   /**
    * @param {string} key -
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
