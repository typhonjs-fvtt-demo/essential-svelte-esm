import { SvelteApp }       from '#runtime/svelte/application';
import { deepMerge }       from '#runtime/util/object';

import EmbeddedDocAppShell from './EmbeddedDocAppShell.svelte';

export class EmbeddedDocApplication extends SvelteApp
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
         id: 'trl-reactive-embedded-collection',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         minimizable: true,
         width: 'auto',
         height: 'auto',
         title: 'Reactive Embedded Collections',

         svelte: {
            class: EmbeddedDocAppShell,
            target: document.body
         }
      });
   }
}
