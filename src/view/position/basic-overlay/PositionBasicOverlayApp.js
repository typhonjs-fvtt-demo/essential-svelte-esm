import { SvelteApplication }  from '#runtime/svelte/application';

import Overlay                from './Overlay.svelte';

export class PositionBasicOverlayApp extends SvelteApplication
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
         id: 'position-basic-overlay',
         classes: ['tjs-essential-svelte-esm'],
         width: 300,
         height: 300,
         // resizable: true, // Set to true for a resizable empty app shell.

         svelte: {
            class: Overlay,
            target: document.body,
         }
      });
   }
}
