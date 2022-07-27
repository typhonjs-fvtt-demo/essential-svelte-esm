import { AdapterFilters }  from './AdapterFilters.js';
import { AdapterSort }     from './AdapterSort.js';
import { Indexer }         from './Indexer.js';

/**
 * Provides a managed array with non-destructive reducing / filtering / sorting capabilities with subscription /
 * Svelte store support.
 *
 * @template T
 */
export class DynArrayReducer
{
   #items;

   #index;
   #indexAdapter;

   /**
    * @type {AdapterFilters<T>}
    */
   #filters;

   /**
    * @type {{filters: FilterFn<T>[]}}
    */
   #filtersAdapter;

   /**
    * @type {boolean}
    */
   #reversed = false;

   /**
    * @type {AdapterSort<T>}
    */
   #sort;

   /**
    * @type {{compareFn: CompareFn<T>}}
    */
   #sortAdapter;

   #subscriptions = [];

   /**
    * Initializes DynArrayReducer. Any iterable is supported for initial data. Take note that if `data` is an array it
    * will be used as the host array and not copied. All non-array iterables otherwise create a new array / copy.
    *
    * @param {Iterable<T>|DynData<T>}   [data=[]] - Data iterable to store if array or copy otherwise.
    */
   constructor(data = [])
   {
      let dataIterable = void 0;
      let filters = void 0;
      let sort = void 0;

      // Potentially working with DynData.
      if (!DynArrayReducer.#isIterable(data) && data !== null && typeof data === 'object')
      {
         if (!DynArrayReducer.#isIterable(data.data))
         {
            throw new TypeError(`DynArrayReducer error (DynData): 'data' attribute is not iterable.`);
         }

         dataIterable = data.data;

         if (data.filters !== void 0)
         {
            if (DynArrayReducer.#isIterable(data.filters))
            {
               filters = data.filters;
            }
            else
            {
               throw new TypeError(`DynArrayReducer error (DynData): 'filters' attribute is not iterable.`);
            }
         }

         if (data.sort !== void 0)
         {
            if (typeof data.sort === 'function')
            {
               sort = data.sort;
            }
            else
            {
               throw new TypeError(`DynArrayReducer error (DynData): 'sort' attribute is not a function.`);
            }
         }
      }
      else
      {
         if (!DynArrayReducer.#isIterable(data)) { throw new TypeError(`DynArrayReducer error: 'data' is not iterable.`); }

         dataIterable = data;
      }

      // In the case of the main data being an array directly use the array otherwise create a copy.
      this.#items = Array.isArray(dataIterable) ? dataIterable : [...dataIterable];

      [this.#index, this.#indexAdapter] = new Indexer(this, this.#items, this.#notify.bind(this));

      [this.#filters, this.#filtersAdapter] = new AdapterFilters(this.#indexAdapter.publicAPI.update);
      [this.#sort, this.#sortAdapter] = new AdapterSort(this.#indexAdapter.publicAPI.update);

      this.#index.initAdapters(this.#filtersAdapter, this.#sortAdapter);

      // Add any filters and sort function defined by DynData.
      if (filters) { this.filters.add(...filters); }
      if (sort) { this.sort.set(sort); }
   }

   /**
    * Provides a utility method to determine if the given data is iterable / implements iterator protocol.
    *
    * @param {*}  data - Data to verify as iterable.
    *
    * @returns {boolean} Is data iterable.
    */
   static #isIterable(data)
   {
      return data !== null && data !== void 0 && typeof data === 'object' && typeof data[Symbol.iterator] === 'function';
   }

   /**
    * Returns the internal data of this instance. Be careful!
    *
    * Note: if an array is set as initial data then that array is used as the internal data. If any changes are
    * performed to the data externally do invoke {@link index.update} with `true` to recalculate the index and notify
    * all subscribers.
    *
    * @returns {T[]} The internal data.
    */
   get data() { return this.#items; }

   /**
    * @returns {AdapterFilters<T>} The filters adapter.
    */
   get filters() { return this.#filters; }

   /**
    * Returns the Indexer public API.
    *
    * @returns {IndexerAPI & Iterable<number>} Indexer API - is also iterable.
    */
   get index() { return this.#indexAdapter.publicAPI; }

   /**
    * Gets the main data / items length.
    *
    * @returns {number} Main data / items length.
    */
   get length() { return this.#items.length; }

   /**
    * Gets current reversed state.
    *
    * @returns {boolean} Reversed state.
    */
   get reversed() { return this.#reversed; }

   /**
    * @returns {AdapterSort<T>} The sort adapter.
    */
   get sort() { return this.#sort; }

   /**
    * Sets reversed state and notifies subscribers.
    *
    * @param {boolean} reversed - New reversed state.
    */
   set reversed(reversed)
   {
      if (typeof reversed !== 'boolean')
      {
         throw new TypeError(`DynArrayReducer.reversed error: 'reversed' is not a boolean.`);
      }

      this.#reversed = reversed;

      // Recalculate index and force an update to any subscribers.
      this.index.update(true);
   }

   /**
    * Removes internal data and pushes new data. This does not destroy any initial array set to internal data unless
    * `replace` is set to true.
    *
    * @param {T[] | Iterable<T>} data - New data to set to internal data.
    *
    * @param {boolean} [replace=false] - New data to set to internal data.
    */
   setData(data, replace = false)
   {
      if (!DynArrayReducer.#isIterable(data))
      {
         throw new TypeError(`DynArrayReducer.setData error: 'data' is not iterable.`);
      }

      if (typeof replace !== 'boolean')
      {
         throw new TypeError(`DynArrayReducer.setData error: 'replace' is not a boolean.`);
      }

      // Replace internal data with new array or create an array from an iterable.
      if (replace)
      {
         this.#items = Array.isArray(data) ? data : [...data];
      }
      else
      {
         // Remove all entries in internal data. This will not replace any initially set array.
         this.#items.length = 0;

         // Add all new data.
         this.#items.push(...data);
      }

      // Recalculate index and force an update to any subscribers.
      this.index.update(true);
   }

   /**
    *
    * @param {function(DynArrayReducer<T>): void} handler - Callback function that is invoked on update / changes.
    *                                                       Receives `this` reference.
    *
    * @returns {(function(): void)} Unsubscribe function.
    */
   subscribe(handler)
   {
      this.#subscriptions.push(handler); // add handler to the array of subscribers

      handler(this);                     // call handler with current value

      // Return unsubscribe function.
      return () =>
      {
         const index = this.#subscriptions.findIndex((sub) => sub === handler);
         if (index >= 0) { this.#subscriptions.splice(index, 1); }
      };
   }

   /**
    *
    */
   #notify()
   {
      // Subscriptions are stored locally as on the browser Babel is still used for private class fields / Babel
      // support until 2023. IE not doing this will require several extra method calls otherwise.
      const subscriptions = this.#subscriptions;
      for (let cntr = 0; cntr < subscriptions.length; cntr++) { subscriptions[cntr](this); }
   }

   /**
    * Provides an iterator for data stored in DynArrayReducer.
    *
    * @returns {Generator<*, T, *>} Generator / iterator of all data.
    * @yields {T}
    */
   *[Symbol.iterator]()
   {
      const items = this.#items;

      if (items.length === 0) { return; }

      if (this.#index.isActive())
      {
         for (const entry of this.index) { yield items[entry]; }
      }
      else
      {
         if (this.reversed)
         {
            for (let cntr = items.length; --cntr >= 0;) { yield items[cntr]; }
         }
         else
         {
            for (let cntr = 0; cntr < items.length; cntr++) { yield items[cntr]; }
         }
      }
   }
}
