import { SvelteApplication }  from '#runtime/svelte/application';

import SideSlideAppShell      from './SideSlideAppShell.svelte';

export default class SideSlideApp extends SvelteApplication
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
         id: 'trl-side-slide-layer-esm',
         title: 'Side Slide Layer',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 500,
         height: 400,

         svelte: {
            class: SideSlideAppShell,
            target: document.body,
         }
      });
   }
}