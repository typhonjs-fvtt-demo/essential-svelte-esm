import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import AnimateWAAPIAppShell   from './AnimateWAAPIAppShell.svelte';

export class AnimateWAAPIApp extends SvelteApp
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
         id: 'trl-actions-animate-waapi',
         classes: ['tjs-essential-svelte-esm'],
         title: 'EssentialESM.apps.actions.animate-waapi.title',
         height: 'auto',
         width: '400px',

         svelte: {
            class: AnimateWAAPIAppShell,
            target: document.body
         }
      });
   }
}
