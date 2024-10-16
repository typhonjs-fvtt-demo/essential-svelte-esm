import { SvelteApplication }  from '#runtime/svelte/application';

import BoxLayer               from './BoxLayer.svelte';

export class PositionBoxApplication extends SvelteApplication
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
         id: 'position-box',
         classes: ['tjs-essential-svelte-esm'],
         title: 'Position (Box)',
         width: 860,
         height: 800,
         resizable: true,
         minimizable: true,

         svelte: {
            class: BoxLayer,
            target: document.body
         }
      });
   }
}
