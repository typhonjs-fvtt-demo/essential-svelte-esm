import { writable }           from 'svelte/store';

import { propertyStore }      from '#runtime/svelte/store/writable-derived';

import { GsapAnimation }      from './GsapAnimation.js';
import { PositionAnimation }  from './PositionAnimation.js';

/**
 * Provides separation of animation store data and built-in TJSPosition animation and GSAP animation.
 */
export class AnimateControl
{
   #animData = {
      duration: 1,
      ease: 'linear',
      stagger: false
   };

   #gsap;

   #position;

   #stores;

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
 * @typedef {object} AnimateStores Defines the general property box stores.
 *
 * @property {import('svelte/store').Writable<number>} duration Animation duration.
 *
 * @property {import('svelte/store').Writable<string>} ease Easing function name.
 *
 * @property {import('svelte/store').Writable<boolean>} stagger Stagger animations.
 */
