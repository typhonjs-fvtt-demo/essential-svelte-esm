import { UserItemArrayStore }    from './UserItemArrayStore.js';
import { WorldItemArrayStore }   from './WorldItemArrayStore.js';

import { settings }              from "#constants";

export class ItemArrayStores
{
   static #userItemStore;
   static #worldItemStore;

   static initialize()
   {
      if (ItemArrayStores.#userItemStore === void 0)
      {
         ItemArrayStores.#userItemStore = new UserItemArrayStore(settings.userItemsArray);
      }

      if (ItemArrayStores.#worldItemStore === void 0)
      {
         ItemArrayStores.#worldItemStore = new WorldItemArrayStore(settings.worldItemsArray);
      }
   }

   /**
    * Can the current user edit / modify the ItemArrayObjectStore for the given scope.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {boolean} Current user edit / modify state.
    */
   static canEdit(scope)
   {
      switch (scope)
      {
         case 'user':
            return true;
         case 'world':
            return globalThis.game.user.isGM;
         default:
            throw new Error(`ItemArrayStores.get canEdit; Unknown scope: ${scope}`);
      }
   }

   /**
    * Get the ItemArrayStore for the given game setting scope.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {ItemArrayObjectStore}  The associated item array object game settings store for the given scope.
    */
   static get(scope)
   {
      switch (scope)
      {
         case 'user':
            return ItemArrayStores.#userItemStore;
         case 'world':
            return ItemArrayStores.#worldItemStore;
         default:
            throw new Error(`ItemArrayStores.get error; Unknown scope: ${scope}`);
      }
   }
}

Hooks.once('ready', () => ItemArrayStores.initialize());

/**
 * @typedef {(import('#runtime/svelte/store/reducer/array-object').CrudArrayObjectStore<
 *    import('./ItemEntryStore').ItemEntryStore
 *  >)} ItemArrayObjectStore
 */

/**
 * @typedef {object} ItemEntryData
 *
 * @property {string} id - Entry UUIDv4
 *
 * @property {string} title - Item title.
 */
