import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import Overlay                from './Overlay.svelte';

export default class PositionBasicOverlayApp extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'position-basic-overlay',
         width: 300,
         height: 300,

         svelte: {
            class: Overlay,
            target: document.body,
         }
      });
   }
}