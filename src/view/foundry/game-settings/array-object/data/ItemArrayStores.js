import { DynReducerHelper }      from '#runtime/svelte/store/reducer';

import { UserItemArrayStore }    from './UserItemArrayStore.js';
import { WorldItemArrayStore }   from './WorldItemArrayStore.js';

import { settings }              from "#constants";

export class ItemArrayStores
{
   /**
    * @type {UserItemArrayStore}
    */
   static #userItemStore;

   /**
    * @type {WorldItemArrayStore}
    */
   static #worldItemStore;

   /**
    * @type {({
    *    user: DynReducerHelper.FilterFn.regexObjectQuery,
    *    world: DynReducerHelper.FilterFn.regexObjectQuery
    * })}
    */
   static #searchFilters = {};

   static initialize()
   {
      if (ItemArrayStores.#userItemStore === void 0)
      {
         ItemArrayStores.#userItemStore = new UserItemArrayStore(settings.userItemsArray);
         ItemArrayStores.#searchFilters.user = DynReducerHelper.filters.regexObjectQuery('name');
         ItemArrayStores.#userItemStore.dataReducer.filters.add(ItemArrayStores.#searchFilters.user);
      }

      if (ItemArrayStores.#worldItemStore === void 0)
      {
         ItemArrayStores.#worldItemStore = new WorldItemArrayStore(settings.worldItemsArray);
         ItemArrayStores.#searchFilters.world = DynReducerHelper.filters.regexObjectQuery('name');
         ItemArrayStores.#worldItemStore.dataReducer.filters.add(ItemArrayStores.#searchFilters.world);
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
    * Get the reducer search filter.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {DynReducerHelper.FilterFn.regexObjectQuery}  The associated search filter for the given scope.
    */
   static getSearchFilter(scope)
   {
      switch (scope)
      {
         case 'user':
            return ItemArrayStores.#searchFilters.user;
         case 'world':
            return ItemArrayStores.#searchFilters.world;
         default:
            throw new Error(`ItemArrayStores.getSearchFilter error; Unknown scope: ${scope}`);
      }
   }

   /**
    * Get the ItemArrayStore for the given game setting scope.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {ItemArrayObjectStore}  The associated item array object game settings store for the given scope.
    */
   static getStore(scope)
   {
      switch (scope)
      {
         case 'user':
            return ItemArrayStores.#userItemStore;
         case 'world':
            return ItemArrayStores.#worldItemStore;
         default:
            throw new Error(`ItemArrayStores.getStore error; Unknown scope: ${scope}`);
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
 * @property {string} category - Item category.
 *
 * @property {string} name - Item name.
 */
