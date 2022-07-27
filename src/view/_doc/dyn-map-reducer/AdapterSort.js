/**
 * @template T
 */
export class AdapterSort
{
   #sortAdapter;
   #indexUpdate;
   #unsubscribe;

   /**
    * @param {Function} indexUpdate - Function to update indexer.
    *
    * @returns {[AdapterSort<T>, {compareFn: CompareFn<T>}]} This and the internal sort adapter data.
    */
   constructor(indexUpdate)
   {
      this.#indexUpdate = indexUpdate;

      this.#sortAdapter = { compareFn: null };

      Object.seal(this);

      return [this, this.#sortAdapter];
   }

   /**
    * @param {CompareFn<T>|SortData<T>}  data -
    *
    * A callback function that compares two values. Return > 0 to sort b before a;
    * < 0 to sort a before b; or 0 to keep original order of a & b.
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters
    */
   set(data)
   {
      if (typeof this.#unsubscribe === 'function')
      {
         this.#unsubscribe();
         this.#unsubscribe = void 0;
      }

      let compareFn = void 0;
      let subscribeFn = void 0;

      switch (typeof data)
      {
         case 'function':
            compareFn = data;
            subscribeFn = data.subscribe;
            break;

         case 'object':
            // Early out if data is null / noop.
            if (data === null) { break; }

            if (typeof data.compare !== 'function')
            {
               throw new TypeError(`DynArrayReducer error: 'compare' attribute is not a function.`);
            }

            compareFn = data.compare;
            subscribeFn = data.compare.subscribe ?? data.subscribe;
            break;
      }

      if (typeof compareFn === 'function')
      {
         this.#sortAdapter.compareFn = compareFn;
      }
      else
      {
         const oldCompareFn = this.#sortAdapter.compareFn;
         this.#sortAdapter.compareFn = null;

         // Update index if the old compare function exists.
         if (typeof oldCompareFn === 'function') { this.#indexUpdate(); }
         return;
      }

      if (typeof subscribeFn === 'function')
      {
         this.#unsubscribe = subscribeFn(this.#indexUpdate);

         // Ensure that unsubscribe is a function.
         if (typeof this.#unsubscribe !== 'function')
         {
            throw new Error(
             `DynArrayReducer error: sort has 'subscribe' function, but no 'unsubscribe' function is returned.`);
         }
      }
      else
      {
         // A sort function with subscriber functionality are assumed to immediately invoke the `subscribe` callback.
         // Only manually update the index if there is no subscriber functionality.
         this.#indexUpdate();
      }
   }

   reset()
   {
      const oldCompareFn = this.#sortAdapter.compareFn;

      this.#sortAdapter.compareFn = null;

      if (typeof this.#unsubscribe === 'function')
      {
         this.#unsubscribe();
         this.#unsubscribe = void 0;
      }

      // Only update index if an old compare function is set.
      if (typeof oldCompareFn === 'function') { this.#indexUpdate(); }
   }
}
