import { writable }        from 'svelte/store';

import { MathRandom }      from '#runtime/math/util';
import { TJSPosition }     from '#runtime/svelte/store/position';
import { propertyStore }   from '#runtime/svelte/store/writable-derived';
import { isObject }        from '#runtime/util/object';

import { AnimateControl }  from './AnimateControl.js';

/**
 * @import {
 *    Readable,
 *    Subscriber,
 *    Unsubscriber,
 *    Writable }           from 'svelte/store';
 *
 * @import { BoxData }     from '../types-local';
 */

/**
 * Provides the main box custom store implementation. Various property stores are available for general
 * box control. All animation capabilities are facilitated through {@link AnimationControl} where built-in
 * TJSPosition animation and GSAP animation are separated respectively in {@link PositionAnimation} and
 * {@link GsapAnimation}.
 *
 * @implements {Readable<Readonly<BoxData[]>>}
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
    * Stores the subscribers.
    *
    * @type {Subscriber<Readonly<BoxData[]>>[]}
    */
   #subscribers = [];

   /**
    * The box position validator attached to the app window bounds.
    *
    * @type {TJSPosition.API.System.Validator.ValidatorSystem}
    */
   #validator;

   constructor()
   {
      const propStore = writable(this.#propData);

      this.#propStores = Object.freeze({
         auto: propertyStore(propStore, 'auto'),
         debug: propertyStore(propStore, 'debug'),
         labels: propertyStore(propStore, 'labels'),
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
    * @returns {TJSPosition.API.System.Validator.ValidatorSystem} The box data validator.
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

      if (typeof width !== 'number' || typeof height !== 'number')
      {
         console.warn(`BoxStore warning: validator width or height not a number.`);
         return;
      }

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
      console.log(`!!! boxStore - restore - TO IMPLEMENT`);

      // if (isObject(this.#savedPCLExport))
      // {
      //    // Remove old box data without destroying the array.
      //    this.#boxData.length = 0;
      //
      //    for (const entry of this.#savedPCLExport.entries)
      //    {
      //       // Must add a new BoxData object with new unique ID and TJSPosition instance.
      //       this.#boxData.push({
      //          ...entry,
      //          id: this.#idCntr++,
      //          position: new TJSPosition({ ...entry.position, validator: this.#validator })
      //       });
      //    }
      //
      //    this.#updateSubscribers();
      // }
   }

   /**
    * Saves all box store positions and current state.
    */
   save()
   {
      console.log(`!!! boxStore - save - TO IMPLEMENT`);
   }

   /**
    * @param {Subscriber<Readonly<BoxData[]>>} handler - Callback function that is invoked on
    *        update / changes. Receives a readonly copy of the box data.
    *
    * @returns {Unsubscriber} Unsubscribe function.
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
 * @typedef {object} BoxStores Defines the general property box stores.
 *
 * @property {Writable<boolean>} auto Use auto width / height boxes.
 *
 * @property {Writable<boolean>} debug Use debug boxes.
 *
 * @property {Writable<boolean>} labels Show labels for debug boxes.
 *
 * @property {Writable<boolean>} pclEnabled Enable position control layer.
 *
 * @property {Writable<boolean>} validatorEnabled Enable app window validation.
 */
