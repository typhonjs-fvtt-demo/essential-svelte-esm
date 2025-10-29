import { get, writable }            from 'svelte/store';

import { GameSettingArrayObject }   from '#runtime/svelte/store/fvtt/settings/array-object';
import { DynReducerHelper }         from '#runtime/svelte/store/reducer';

import { ItemGenerator }            from './ItemGenerator.js';

import { constants }                from '#constants';
import { gameSettings }             from '#gameSettings';

/**
 * Provides additional functionality on top of `GameSettingArrayObject` such as sorting logic and encapsulation of
 * all data related to controlling the item entries store instance.
 *
 * @augments {GameSettingArrayObject<ItemEntryStore>}
 */
export class ItemArrayObjectStore extends GameSettingArrayObject
{
   /**
    * @type {'name' | 'category' | undefined}
    */
   #sortByProp;

   /**
    * @type {Readonly<{
    *    searchFilter: DynReducerHelper.FilterFn.regexObjectQuery;
    *    sortBy: import('svelte/store').Writable<{ prop: string, state: 'none' | 'asc' | 'desc' }>
    * }>}
    */
   #stores = Object.freeze({
      searchFilter: DynReducerHelper.filters.regexObjectQuery(['name', 'category']),
      sortBy: writable({ prop: '', state: 'none' })
   });

   /**
    * @param {object} options - Setting options.
    *
    * @param {string} options.key - Game setting key.
    *
    * @param {'user' | 'world'} options.scope - Game setting scope.
    */
   constructor({ key, scope })
   {
      super({
         gameSettings,
         namespace: constants.moduleId,
         key,
         scope,
         StoreClass: ItemEntryStore,
         dataReducer: true
      });

      // @ts-expect-error - This is OK despite type differences.
      this.dataReducer.filters.add(this.#stores.searchFilter);

      // Add an inline sort function referencing `this.#sortByProp` which is managed by `toggleSortBy`.
      // There are other dynamic ways to configure sorting, but since the sort by logic is encapsulated locally
      // this is efficient.
      this.dataReducer.sort.set((a, b) =>
      {
         return this.#sortByProp && a?.[this.#sortByProp] && b?.[this.#sortByProp] ?
          a[this.#sortByProp].localeCompare(b[this.#sortByProp]) : 0;
      });
   }

   /**
    * @returns {Readonly<{
    *    searchFilter: DynReducerHelper.FilterFn.regexObjectQuery;
    *    sortBy: import('svelte/store').Writable<{ prop: string, state: 'none' | 'asc' | 'desc' }>
    * }>} Associated item stores.
    */
   get stores()
   {
      return this.#stores;
   }

   /**
    * Just a convenience method to not embed the `ItemGenerator` reference in the UI / Svelte components.
    */
   addItem()
   {
      this.createEntry(ItemGenerator.createRandom());
   }

   /**
    * The sorting control logic is encapsulated here. When a header column for `name` or `category` is clicked in
    * `ItemSortBy.svelte`
    *
    * @param {'name' | 'category'} prop - Item property to toggle sort by state.
    */
   toggleSortBy(prop)
   {
      // Usually you should avoid using `get()` with a store, but this is OK / not a performance pathway.
      const currentSortBy = get(this.#stores.sortBy);

      /**
       * Determine current state. If the `prop` being toggled is the current `sortBy` prop then use the stored state.
       * Otherwise, this is a new property to toggle and start from `none`.
       *
       * @type {string}
       */
      const current = currentSortBy?.prop === prop ? currentSortBy?.state : 'none';

      let newState;

      switch (current)
      {
         case 'none':
            newState = 'desc';
            break;

         case 'asc':
            newState = 'none';
            break;

         case 'desc':
            newState = 'asc';
            break;

         default:
            newState = 'none';
            break;
      }

      this.#sortByProp = newState !== 'none' ? prop : void 0;

      // Update the current sorting mode.
      this.#stores.sortBy.set({ prop, state: newState });

      // Forces an index update / sorting is triggered.
      this.dataReducer.reversed = newState === 'asc';
   }
}

/**
 * Extends `FVTTObjectEntryStore` which is conveniently exported as `EntryStore`. `FVTTObjectEntryStore` provides a base
 * implementation where only the `set` method and specific data accessors need to be defined. See
 * {@link ItemEntryStore.category} and {@link ItemEntryStore.name}. Calling the protected method
 * `this._updateSubscribers()` will notify ArrayObjectStore to serialize the data to the Foundry DB.
 *
 * This provides the store implementation for serialized {@link ItemEntryData} with accessors
 * for the item properties that update the underlying subscribers.
 *
 * @see https://typhonjs-fvtt-lib.github.io/api-docs/classes/_runtime_svelte_store_fvtt_settings_array-object.FVTTObjectEntryStore.html
 * @see https://typhonjs-fvtt-lib.github.io/api-docs/classes/_runtime_svelte_store_reducer_array-object.ObjectEntryStore.html
 *
 * @augments GameSettingArrayObject.EntryStore<ItemEntryData>
 */
export class ItemEntryStore extends GameSettingArrayObject.EntryStore
{
   /**
    * You must define the `set` method.
    *
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
    * @returns {Readonly<string[]>} All supported item categories.
    */
   get categories()
   {
      return ItemGenerator.categories;
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
