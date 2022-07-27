import { DynMapReducer } from '../dyn-map-reducer/DynMapReducer.js';

/**
 */
export class EmbeddedStoreManager
{
   /** @type {Map<string, EmbeddedCollectionData>} */
   #name = new Map();

   #contextMap = new Map();

   /**
    * @template T
    *
    * @param {foundry.abstract.Collection<T>}  collection -
    *
    * @param {string} embeddedName -
    *
    * @param {string} storeName -
    *
    * @param {EmbeddedDynData<T>} dynData -
    *
    * @returns {DynMapReducer<T>} DynMapReducer instance
    */
   create(collection, embeddedName, storeName, dynData)
   {
      let embeddedData;

      if (!this.#name.has(embeddedName))
      {
         embeddedData = {
            collection,
            stores: new Map()
         };

         this.#name.set(embeddedName, embeddedData);
      }
      else
      {
         embeddedData = this.#name.get(embeddedName);
      }

      if (embeddedData.stores.has(storeName))
      {
         return embeddedData.stores.get(storeName);
      }
      else
      {
         const store = new DynMapReducer({ data: collection, ...dynData });
         embeddedData.stores.set(storeName, store);
         return store;
      }
   }

   /**
    * @param {string} embeddedName -
    *
    * @param {string} storeName -
    *
    * @returns {DynMapReducer|void} DynMapReducer instance.
    */
   get(embeddedName, storeName)
   {
      if (!this.#name.has(embeddedName)) { return void 0; }

      return this.#name.get(embeddedName).stores.get(storeName);
   }

   update(embeddedName)
   {
      if (!this.#name.has(embeddedName)) { return; }

      for (const store of this.#name.get(embeddedName).stores.values())
      {
         store.index.update(true);
      }
   }
}

/**
 * @typedef {object} EmbeddedCollectionData
 *
 * @property {foundry.abstract.Collection} collection -
 *
 * @property {Map<string, DynMapReducer>} stores -
 */

/**
 * @template T
 *
 * @typedef {object} EmbeddedDynData
 *
 * @property {Iterable<FilterFn<T>|FilterData<T>>} [filters] -
 *
 * @property {CompareFn<T>}                        [sort] -
 */