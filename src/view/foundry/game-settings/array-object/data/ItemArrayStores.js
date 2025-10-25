import { GameSettingArrayObject }   from '#runtime/svelte/store/fvtt/settings/array-object';
import { DynReducerHelper }         from '#runtime/svelte/store/reducer';

import { constants, settings }      from "#constants";
import { gameSettings }             from '#gameSettings';

/**
 * It is best practice to configure and initialize data sources separately from your UI facing components.
 * `ItemArrayStores` automatically configures the reactive `GameSettingArrayObject` stores associated with reactive
 * game settings for both `user` and `world` scope demos.
 */
export class ItemArrayStores
{
   /**
    * @type {GameSettingArrayObject<ItemEntryStore>}
    */
   static #userItemStore;

   /**
    * @type {GameSettingArrayObject<ItemEntryStore>}
    */
   static #worldItemStore;

   /**
    * Provides search filters for both `name` and `category` properties.
    *
    * @type {({
    *    user: DynReducerHelper.FilterFn.regexObjectQuery,
    *    world: DynReducerHelper.FilterFn.regexObjectQuery
    * })}
    */
   static #searchFilters =
   {
      user: DynReducerHelper.filters.regexObjectQuery(['name', 'category']),
      world: DynReducerHelper.filters.regexObjectQuery(['name', 'category'])
   };

   static initialize()
   {
      if (ItemArrayStores.#userItemStore === void 0)
      {
         ItemArrayStores.#userItemStore = new GameSettingArrayObject({
            gameSettings,
            namespace: constants.moduleId,
            key: settings.userItemsArray,
            scope: 'user',
            StoreClass: ItemEntryStore,
            dataReducer: true
         });

         ItemArrayStores.#userItemStore.dataReducer.filters.add(ItemArrayStores.#searchFilters.user);
      }

      if (ItemArrayStores.#worldItemStore === void 0)
      {
         ItemArrayStores.#worldItemStore = new GameSettingArrayObject({
            gameSettings,
            namespace: constants.moduleId,
            key: settings.worldItemsArray,
            scope: 'world',
            StoreClass: ItemEntryStore,
            dataReducer: true
         });

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

/**
 * Extends `ObjectEntryStore` which is conveniently exported as `EntryStore`.
 *
 * This provides the store implementation for serialized {@link ItemEntryData} with accessors
 * for the item properties that update the underlying subscribers.
 *
 * @see https://typhonjs-fvtt-lib.github.io/api-docs/classes/_runtime_svelte_store_reducer_array-object.ObjectEntryStore.html
 *
 * @augments GameSettingArrayObject.EntryStore<ItemEntryData>
 */
class ItemEntryStore extends GameSettingArrayObject.EntryStore
{
   /**
    * @param {Partial<ItemEntryData>}   data - Item data to set.
    */
   set(data)
   {
      if (typeof data.name === 'string') { this._data.name = data.name; }
      if (typeof data.category === 'string') { this._data.category = data.category; }
   }

   /**
    * @returns {string} Item category.
    */
   get category()
   {
      return this._data.category ?? '';
   }

   /**
    * @param {string} category - Item category.
    */
   set category(category)
   {
      if (typeof category === 'string')
      {
         this._data.category = category;
         this._updateSubscribers();
      }
   }

   /**
    * @returns {string} Item name.
    */
   get name()
   {
      return this._data.name ?? '';
   }

   /**
    * @param {string} name - Item name.
    */
   set name(name)
   {
      if (typeof name === 'string')
      {
         this._data.name = name;
         this._updateSubscribers();
      }
   }
}

/**
 * Automatically initialize and register the item array object stores when Foundry is `ready`.
 */
Hooks.once('ready', () => ItemArrayStores.initialize());

/**
 * @typedef {GameSettingArrayObject<ItemEntryStore>} ItemArrayObjectStore Convenience type for item array object store.
 */

/**
 * @typedef {object} ItemEntryData
 *
 * @property {string} [id] - UUIDv4; automatically assigned.
 *
 * @property {string} category - Item category.
 *
 * @property {string} name - Item name.
 */
