import { DynMapReducer } from '@typhonjs-utils/dynamic-reducer';

/**
 */
export class EmbeddedStoreManager
{
   /** @type {Map<string, EmbeddedCollectionData>} */
   #name = new Map();

   #contextMap = new Map();

   /**
    *
    * @param {*}  target - Any target to test.
    *
    * @param {Function} Prototype -
    *
    * @returns {boolean} Target matches prototype.
    */
   hasPrototype(target, Prototype)
   {
      /* c8 ignore next */
      if (typeof target !== 'function') { return false; }

      if (target === Prototype) { return true; }

      // Walk parent prototype chain. Check for descriptor at each prototype level.
      for (let proto = Object.getPrototypeOf(target); proto; proto = Object.getPrototypeOf(proto))
      {
         if (proto === Prototype) { return true; }
      }

      return false;
   }

   /**
    * @template T
    *
    * @param {Map<string, T>}  collection -
    *
    * @param {string} embeddedName -
    *
    * @param {import('@typhonjs-utils/dynamic-reducer').OptionsDynMapCreate<string, T>} options -
    *
    * @returns {DynMapReducer<string, T>} DynMapReducer instance
    */
   create(collection, embeddedName, options)
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

      /** @type {string} */
      let name;

      /** @type {import('@typhonjs-utils/dynamic-reducer').DataOptions<T>} */
      let rest = {};

      /** @type {import('@typhonjs-utils/dynamic-reducer').IDynMapReducerCtor<string, T>} */
      let ctor;

      if (typeof options === 'string')
      {
         name = options;
         ctor = DynMapReducer;
      }
      else if (typeof options === 'function' && this.hasPrototype(options, DynMapReducer))
      {
         ctor = options;
      }
      else if (typeof options === 'object' && options !== null)
      {
         ({ name, ctor = DynMapReducer, ...rest } = options);
      }
      else
      {
         throw new TypeError(`EmbeddedStoreManager.create error: 'options' does not conform to allowed parameters.`);
      }

      if (!this.hasPrototype(ctor, DynMapReducer))
      {
         throw new TypeError(`EmbeddedStoreManager.create error: 'ctor' is not a 'DynMapReducer'.`);
      }

      name = name ?? ctor?.name;

      if (typeof name !== 'string') { throw new TypeError(`EmbeddedStoreManager.create error: 'name' is not a string.`); }

      if (embeddedData.stores.has(name))
      {
         return embeddedData.stores.get(name);
      }
      else
      {
         const store = new ctor({ data: collection, ...rest });
         embeddedData.stores.set(name, store);
         return store;
      }
   }

   /**
    * @template T
    *
    * @param {string} embeddedName -
    *
    * @param {string} storeName -
    *
    * @returns {DynMapReducer<string, T>} DynMapReducer instance.
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