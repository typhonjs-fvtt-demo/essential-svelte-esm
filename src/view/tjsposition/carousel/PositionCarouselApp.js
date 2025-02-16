import { SvelteApp }    from '#runtime/svelte/application';
import { deepMerge }    from '#runtime/util/object';

import CarouselAppShell from './CarouselAppShell.svelte';

export class PositionCarouselApp extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
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
