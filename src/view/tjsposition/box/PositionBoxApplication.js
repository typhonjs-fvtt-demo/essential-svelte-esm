import { SvelteApp } from '#runtime/svelte/application';

import BoxLayer      from './BoxLayer.svelte';

export class PositionBoxApplication extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
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
