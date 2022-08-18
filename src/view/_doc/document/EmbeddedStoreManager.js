import { DynMapReducer }   from '@typhonjs-fvtt/runtime/svelte/store';
import { hasPrototype }    from '@typhonjs-fvtt/runtime/svelte/util';

/**
 */
export class EmbeddedStoreManager
{
   /** @type {Map<string, EmbeddedCollectionData>} */
   #name = new Map();

   /**
    * @type {foundry.abstract.Document[]}
    */
   #document;

   /**
    * @param {foundry.abstract.Document[]} document - The associated document holder.
    */
   constructor(document)
   {
      this.#document = document;

      this.handleDocChange();
   }

   /**
    * @template T
    *
    * @param {string} embeddedName -
    *
    * @param {import('@typhonjs-fvtt/runtime/svelte/store').OptionsDynMapCreate<string, T>} options -
    *
    * @returns {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, T>} DynMapReducer instance
    */
   create(embeddedName, options)
   {
      /** @type {foundry.abstract.Document} */
      const doc = this.#document[0];

      if (!doc) { throw new Error(`EmbeddedStoreManager.create error: No valid document.`); }

      const collection = doc.getEmbeddedCollection(embeddedName);

      if (!collection) { throw new Error(`EmbeddedStoreManager.create error: No valid embedded collection.`); }

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

      /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DataOptions<T>} */
      let rest = {};

      /** @type {import('@typhonjs-fvtt/runtime/svelte/store').IDynMapReducerCtor<string, T>} */
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

      if (!hasPrototype(ctor, DynMapReducer))
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
    * @returns {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, T>} DynMapReducer instance.
    */
   get(embeddedName, storeName)
   {
      if (!this.#name.has(embeddedName)) { return void 0; }

      return this.#name.get(embeddedName).stores.get(storeName);
   }

   handleDocChange()
   {
      const doc = this.#document[0];

      if (doc instanceof foundry.abstract.Document)
      {
         const embeddedKeys = new Set(Object.keys(doc.constructor.metadata.embedded) ?? []);

         console.log(`! ESM - handleDocChange - 0 - embeddedKeys:`, embeddedKeys);
      }
      else // Reset all embedded reducer stores to null data.
      {

      }
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
 * @property {Map<string, import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, T>>} stores -
 */
