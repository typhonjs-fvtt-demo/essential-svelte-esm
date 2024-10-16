import { SvelteApplication }  from '#runtime/svelte/application';

import CarouselAppShell       from './CarouselAppShell.svelte';

export class PositionCarouselApp extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'position-carousel',
         classes: ['tjs-essential-svelte-esm'],
         title: 'Position (Carousel)',
         width: 775,
         height: 420,
         resizable: false,
         minimizable: true,

         svelte: {
            class: CarouselAppShell,
            target: document.body
         }
      });
   }
}
