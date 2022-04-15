import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import CarouselAppShell       from './CarouselAppShell.svelte';

export default class PositionBoxApplication extends SvelteApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {}) { super(options); }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'position-carousel',
         title: 'Position (Carousel)',
         width: 750,
         height: 400,
         resizable: false,
         minimizable: true,

         svelte: {
            class: CarouselAppShell,
            target: document.body
         }
      });
   }
}