export class CompareCurrency
{
   /**
    * Parse <number> <currency unit>
    *
    * @type {RegExp}
    */
   static #currencyMatch = /^(\d+(?:\.\d+)?)\s*(cp|sp|gp|pp)$/i;

   /**
    * Value of unit denominations in copper.
    *
    * @type {{cp: number, sp: number, gp: number, pp: number}}
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

      const [, numStr, unitRaw] = match;
      const amount = parseFloat(numStr);
      const unit = unitRaw.toLowerCase();

      return amount * this.#convertRate[unit];
   }
}
