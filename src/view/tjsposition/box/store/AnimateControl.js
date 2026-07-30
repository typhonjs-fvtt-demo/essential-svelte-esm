import { writable }           from 'svelte/store';

import { propertyStore }      from '#runtime/svelte/store/writable-derived';

import { GsapAnimation }      from './GsapAnimation.js';
import { PositionAnimation }  from './PositionAnimation.js';

/**
 * @import { Writable }             from 'svelte/store';
 *
 * @import { GsapEasingReference }  from '#runtime/svelte/animate/gsap';
 * @import { TJSPosition }          from '#runtime/svelte/store/position';
 *
 * @import { BoxData }              from '../types-local';
 */

/**
 * Provides separation of animation store data and built-in TJSPosition animation and GSAP animation.
 */
export class AnimateControl
{
   /** @type {AnimateData} */
   #animData = {
      duration: 1,
      ease: 'linear',
      stagger: false
   };

   /** @type {GsapAnimation} */
   #gsap;

   /** @type {PositionAnimation} */
   #position;

   /** @type {Readonly<AnimateStores>} */
   #stores;

   /**
    * @param {BoxData[]} boxData -
    *
    * @param {TJSPosition.API.System.Validator.ValidatorSystem} validator -
    */
   constructor(boxData, validator)
   {
      const dataStore = writable(this.#animData);

      this.#stores = Object.freeze({
         duration: propertyStore(dataStore, 'duration'),
         ease: propertyStore(dataStore, 'ease'),
         stagger: propertyStore(dataStore, 'stagger')
      });

      this.#gsap = new GsapAnimation(boxData, validator, this.#animData);
      this.#position = new PositionAnimation(boxData, validator, this.#animData);
   }

   /**
    * @returns {GsapAnimation} GSAP animation control.
    */
   get gsap()
   {
      return this.#gsap;
   }

   /**
    * @returns {PositionAnimation} TJSPosition animation control.
    */
   get position()
   {
      return this.#position;
   }

   /**
    * @returns {Readonly<AnimateStores>} Animation control stores.
    */
   get stores()
   {
      return this.#stores;
   }
}

/**
 * @typedef {object} AnimateData Defines the internal animation control state.
 *
 * @property {number} duration Animation duration.
 *
 * @property {GsapEasingReference} ease Easing function name.
 *
 * @property {boolean} stagger Stagger animations.
 */

/**
 * @typedef {object} AnimateStores Defines the general property box stores.
 *
 * @property {Writable<AnimateData['duration']>} duration Animation duration.
 *
 * @property {Writable<AnimateData['ease']>} ease Easing function name.
 *
 * @property {Writable<AnimateData['stagger']>} stagger Stagger animations.
 */
