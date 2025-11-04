/**
 * Provides a static custom compare function via the `DynReducer.Data.Sort` interface which can be added to
 * the `DynReducerHelper.sort.objectByProp` sorting helper for the `cost` property of {@link ItemEntryStore}.
 *
 * `DynReducerHelper.sort.objectByProp` accepts compare functions, or instances of or static classes matching the
 * `DynReducer.Data.Sort` interface. It can be handy to create an instance or static class for the compare operation to
 * encapsulate additional calculations or data. In the case of the currency conversion the mock item costs are in the
 * D&D 5e currency of `cp`, `sp`, `gp`, `pp` for `copper`, `silver`, `gold`, and `platinum`.
 */
export class CompareCurrency
{
   /**
    * Parse <number> <currency unit>
    *
    * @type {RegExp}
    */
   static #currencyMatch = /^(?<number>\d+(?:\.\d+)?)\s*(?<unit>cp|sp|gp|pp)$/i;

   /**
    * Value of unit denominations in copper.
    *
    * @type {{ cp: number, sp: number, gp: number, pp: number }}
    */
   static #convertRate = { cp: 1, sp: 10, gp: 100, pp: 1000 };

   /**
    * Compare two currency strings.
    *
    * @param {string}   a - Currency value A
    *
    * @param {string}   b - Currency value B
    *
    * @returns {number} Sort order
    */
   static compare(a, b)
   {
      const va = this.#valueInCopper(a);
      const vb = this.#valueInCopper(b);

      if (isNaN(va) && isNaN(vb)) { return 0; }
      if (isNaN(va)) { return 1; }
      if (isNaN(vb)) { return -1; }

      return va - vb;
   }

   /**
    * Convert a currency string to value in copper.
    *
    * @param {string}   currency - A currency value.
    *
    * @returns {number} Value in copper.
    */
   static #valueInCopper(currency)
   {
      const match = currency?.trim?.().match(this.#currencyMatch);
      if (!match) { return NaN; }

      return parseFloat(match.groups.number) * this.#convertRate[match.groups.unit.toLowerCase()];
   }
}
