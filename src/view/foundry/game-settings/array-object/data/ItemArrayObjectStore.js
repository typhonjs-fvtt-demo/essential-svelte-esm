import { GameSettingArrayObject }   from '#runtime/svelte/store/fvtt/settings/array-object';
import { DynReducerHelper }         from '#runtime/svelte/store/reducer';

import { CompareCurrency }          from './CompareCurrency.js';
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
    * @type {Readonly<{
    *    searchFilter: DynReducerHelper.FilterFn.regexObjectQuery;
    *    sortBy: DynReducerHelper.Sort.ObjectByProp<ItemEntryStore>;
    * }>}
    */
   #stores;

   /**
    * @param {object} options - Setting options.
    *
    * @param {string} options.key - Game setting key.
    *
    * @param {'user' | 'world'} options.scope - Game setting scope.
    *
    * @param {import('svelte/store').Writable<unknown>} options.sortBy - Sort by property store associated w/
    *        sessionStorage storing any changes to sort ordering.
    */
   constructor({ key, scope, sortBy })
   {
      super({
         gameSettings,
         namespace: constants.moduleId,
         key,
         scope,
         StoreClass: ItemEntryStore,
         dataReducer: true
      });

      this.#stores = Object.freeze({
         // The searchFilter store is a function and a subscribable store used for the search input box. The text
         // entered into the search input will filter against the item properties `name`, `category`, and `cost`.
         searchFilter: DynReducerHelper.filters.regexObjectQuery(['name', 'category', 'cost']),

         // `DynReducerHelper.sort.objectByProp` provides an integrated sort / compare function implementation that
         // automatically performs comparisons for common data types, but allows custom comparison extension. The `cost`
         // property is assigned `CompareCurrency`.
         sortBy: DynReducerHelper.sort.objectByProp({
            store: sortBy,
            customCompareFnMap: {
               cost: CompareCurrency
            }
         })
      });

      this.dataReducer.filters.add(this.#stores.searchFilter);

      this.dataReducer.sort.set(this.#stores.sortBy);
   }

   /**
    * @returns {Readonly<{
    *    searchFilter: DynReducerHelper.FilterFn.regexObjectQuery;
    *    sortBy: DynReducerHelper.Sort.ObjectByProp<ItemEntryStore>;
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

   clearEntries()
   {
      super.clearEntries();
      this.#stores.sortBy.reset();
   }

  /**
   * Deletes a given entry store by ID from this array object store instance.
   *
   * @param {string} id - ID of entry to delete.
   *
   * @returns {boolean} Delete operation successful.
   */
   deleteEntry(id)
   {
      const result = super.deleteEntry(id);

      if (this.length === 0) { this.#stores.sortBy.reset(); }

      return result;
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
 * One particular implementation detail is that the `ItemPropInput` Svelte component will only be editable if there
 * is a setter accessor for the property specified below. In this demo `cost` only has a getter, so while it is
 * displayed by `ItemPropInput` it is automatically not editable because of the absence of a setter in the
 * `ItemEntryStore` data model.
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
      let update = false;

      if (typeof data.name === 'string' && this._data.name !== data.name)
      {
         this._data.name = data.name;
         update = true;
      }

      if (typeof data.category === 'string' && this._data.category !== data.category)
      {
         this._data.category = data.category;
         update = true;
      }

      if (typeof data.cost === 'string' && this._data.cost !== data.cost)
      {
         this._data.cost = data.cost;
         update = true;
      }

      if (update) { this._updateSubscribers(); }
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
      if (typeof category === 'string' && this._data.category !== category)
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
      if (typeof name === 'string' && this._data.name !== name)
      {
         this._data.name = name;
         this._updateSubscribers();
      }
   }

   /**
    * @returns {string} Item cost.
    */
   get cost()
   {
      return this._data.cost ?? '';
   }
}

/**
 * @typedef {object} ItemEntryData Defines the unique data for an item entry.
 *
 * @property {string} [id] - UUIDv4; automatically assigned.
 *
 * @property {string} category - Item category.
 *
 * @property {string} name - Item name.
 *
 * @property {string} cost - Item cost.
 */
