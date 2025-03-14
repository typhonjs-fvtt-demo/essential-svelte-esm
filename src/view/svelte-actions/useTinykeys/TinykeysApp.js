import { SvelteApp }    from '#runtime/svelte/application';
import { deepMerge }    from '#runtime/util/object';

import TinykeysAppShell from './TinykeysAppShell.svelte';

export class TinykeysApp extends SvelteApp
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
         id: 'trl-actions-tinykeys',
         classes: ['tjs-essential-svelte-esm'],
         title: 'EssentialESM.apps.actions.use-tinykeys.title',
         height: '230px',
         width: '400px',

         svelte: {
            class: TinykeysAppShell,
            target: document.body
         }
      });
   }
}
