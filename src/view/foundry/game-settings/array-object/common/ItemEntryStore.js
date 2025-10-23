import { ObjectEntryStore } from '#runtime/svelte/store/reducer/array-object';

/**
 * @augments ObjectEntryStore<ItemEntryData>
 */
export class ItemEntryStore extends ObjectEntryStore
{
   /**
    * @param {ItemEntryData}   data -
    */
   set(data)
   {
      this._data.title = data?.title ?? 'Unknown';
      this._updateSubscribers();
   }

   /**
    * @returns {string} Item title.
    */
   get title()
   {
      return this._data.title ?? '';
   }

   /**
    * @param {string} title - Item title.
    */
   set title(title)
   {
      this._data.title = title;
      this._updateSubscribers();
   }
}

/**
 * @typedef {object} ItemEntryData
 * 
 * @property {string} id - Entry UUIDv4
 * 
 * @property {string} title - Item title.
 */