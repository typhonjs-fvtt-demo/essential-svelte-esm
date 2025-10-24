import { ObjectEntryStore } from '#runtime/svelte/store/reducer/array-object';

/**
 * @augments ObjectEntryStore<import('#itemArrayStores').ItemEntryData>
 */
export class ItemEntryStore extends ObjectEntryStore
{
   /**
    * @param {Partial<import('#itemArrayStores').ItemEntryData>}   data -
    */
   set(data)
   {
      if (typeof data.name === 'string') { this._data.name = data.name; }
      if (typeof data.category === 'string') { this._data.category = data.name; }

      this._updateSubscribers();
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
