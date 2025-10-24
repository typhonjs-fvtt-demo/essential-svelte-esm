import { ObjectEntryStore } from '#runtime/svelte/store/reducer/array-object';

/**
 * @augments ObjectEntryStore<import('#itemArrayStores').ItemEntryData>
 */
export class ItemEntryStore extends ObjectEntryStore
{
   /**
    * @param {import('#itemArrayStores').ItemEntryData}   data -
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
