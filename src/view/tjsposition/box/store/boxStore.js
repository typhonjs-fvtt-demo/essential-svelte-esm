import { writable }        from 'svelte/store';

import { MathRandom }      from '#runtime/math/util';
import { TJSPosition }     from '#runtime/svelte/store/position';
import { propertyStore }   from '#runtime/svelte/store/writable-derived';
import { isObject }        from '#runtime/util/object';

import { AnimateControl }  from './AnimateControl.js';

/**
 * Provides the main box custom store implementation. Various property stores are available for general
 * box control. All animation capabilities are facilitated through {@link AnimationControl} where built-in
 * TJSPosition animation and GSAP animation are separated respectively in {@link PositionAnimation} and
 * {@link GsapAnimation}.
 */
class BoxStore
{
   /**
    * @type {AnimateControl}
    */
   #animateControl;

   /**
    * Stores all the active box data.
    *
    * @type {BoxData[]}
    */
   #boxData = [];

   #propData = {
      auto: false,
      debug: false,
      labels: false,
      pclEnabled: false,
      validatorEnabled: true
   };

   #propStores;

   /**
    * Provides a running ID for new box data creation.
    *
    * @type {number}
    */
   #idCntr = 0;

   /**
    *
    */
   #savedComponentData;

   /**
    * Stores the subscribers.
    *
    * @type {import('svelte/store').Subscriber<Readonly<BoxData[]>>[]}
    */
   #subscribers = [];

   /**
    * The box position validator attached to the app window bounds.
    *
    * @type {import('#runtime/svelte/store/position').System.Validator.ValidatorSystem}
    */
   #validator;

   constructor()
   {
      const propStore = writable(this.#propData);

      this.#propStores = Object.freeze({
         auto: propertyStore(propStore, 'auto'),
         debug: propertyStore(propStore, 'debug'),
         labels: propertyStore(propStore, 'labels'),
         pclEnabled: propertyStore(propStore, 'pclEnabled'),
         validatorEnabled: propertyStore(propStore, 'validatorEnabled')
      });

      this.#validator = new TJSPosition.Validators.TransformBounds({ constrain: false });

      this.#animateControl = new AnimateControl(this.#boxData, this.#validator);
   }

   /**
    * @returns {AnimateControl} The animation controller.
    */
   get animate()
   {
      return this.#animateControl;
   }

   /**
    * @returns {Readonly<BoxStores>} All general property stores.
    */
   get stores()
   {
      return this.#propStores;
   }

   /**
    * @returns {import('#runtime/svelte/store/position').System.Validator.ValidatorSystem} The box data validator.
    */
   get validator()
   {
      return this.#validator;
   }

   /**
    * Adds the given count of boxes.
    *
    * @param {number}   count - Amount of boxes to add.
    */
   add(count = 1)
   {
      const width = this.#validator.width;
      const height = this.#validator.height;

      for (let cntr = count; --cntr >= 0;)
      {
         const bounds = MathRandom.getInt(90, 140);

         const position = new TJSPosition({
            top: MathRandom.getInt(0, height),
            left: MathRandom.getInt(0, width),
            width: bounds,
            height: bounds,
            validator: this.#validator
         });

         this.#boxData.push({
            id: this.#idCntr++,
            position,
            color: this.#getRandomColor(),
            initialBounds: { width: bounds, height: bounds }
         });
      }

      this.#updateSubscribers();
   }

   /**
    * Removes all boxes.
    */
   removeAll()
   {
      this.#boxData.length = 0;

      this.#updateSubscribers();
   }

   /**
    * Removes random boxes.
    *
    * @param {number}   count - Amount of boxes to remove.
    */
   removeRandom(count = 1)
   {
      for (; --count >= 0;)
      {
         const index = MathRandom.getInt(0, this.#boxData.length - 1);
         this.#boxData.splice(index, 1);
      }

      this.#updateSubscribers();
   }

   /**
    * Restores all saved box store positions.
    */
   restore()
   {
      if (isObject(this.#savedComponentData))
      {
         this.#boxData.length = 0;

         for (const component of this.#savedComponentData.components)
         {
            // Must add a new TJSPosition and a new unique ID.
            const position = new TJSPosition({ ...component.position, validator: this.#validator });
            this.#boxData.push({ ...component, id: this.#idCntr++, position });
         }

         this.#updateSubscribers();
      }
   }

   /**
    * Saves all box store positions from position control layer.
    *
    * @param {object[]} componentData - Exported component data from position control layer.
    */
   save(componentData)
   {
      this.#savedComponentData = componentData;
   }

   /**
    * @param {import('svelte/store').Subscriber<Readonly<BoxData[]>>} handler - Callback function that is invoked on
    *        update / changes. Receives a readonly copy of the box data.
    *
    * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
    */
   subscribe(handler)
   {
      this.#subscribers.push(handler);

      handler(this.#boxData);

      // Return unsubscribe function.
      return () =>
      {
         const index = this.#subscribers.findIndex((sub) => sub === handler);
         if (index >= 0) { this.#subscribers.splice(index, 1); }
      };
   }

   // Internal implementation ----------------------------------------------------------------------------------------

   /**
    * @returns {string} A random color for a box.
    */
   #getRandomColor()
   {
      return `rgba(${MathRandom.getInt(100, 255)}, ${MathRandom.getInt(100, 255)}, ${
       MathRandom.getInt(100, 255)}, 0.5)`;
   }

   #updateSubscribers()
   {
      for (let cntr = 0; cntr < this.#subscribers.length; cntr++)
      {
         this.#subscribers[cntr](this.#boxData);
      }
   }
}

/**
 * The main BoxStore instance.
 *
 * @type {BoxStore}
 */
export const boxStore = new BoxStore();

/**
 * @typedef {object} BoxData Defines the data stored in `boxStore`.
 *
 * @property {number} id A unique ID for each box required by TJSPositionControlLayer.
 *
 * @property {import('#runtime/svelte/store/position').TJSPosition} position The associated position store.
 *
 * @property {string} color The CSS color string for the box.
 *
 * @property {{ width: number, height: number }} initialBounds The initial bounds of the box.
 */

/**
 * @typedef {object} BoxStores Defines the general property box stores.
 *
 * @property {import('svelte/store').Writable<boolean>} auto Use auto width / height boxes.
 *
 * @property {import('svelte/store').Writable<boolean>} debug Use debug boxes.
 *
 * @property {import('svelte/store').Writable<boolean>} labels Show labels for debug boxes.
 *
 * @property {import('svelte/store').Writable<boolean>} pclEnabled Enable position control layer.
 *
 * @property {import('svelte/store').Writable<boolean>} validatorEnabled Enable app window validation.
 */
