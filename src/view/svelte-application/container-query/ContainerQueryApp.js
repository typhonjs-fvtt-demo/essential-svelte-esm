import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ContainerQueryAppShell from './ContainerQueryAppShell.svelte';

export class ContainerQueryApp extends SvelteApp
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
         id: 'tjs-container-query-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 500,
         height: 300,
         title: 'EssentialESM.apps.svelte-app.container-query.title',

         svelte: {
            class: ContainerQueryAppShell,
            target: document.body
         }
      });
   }
}
