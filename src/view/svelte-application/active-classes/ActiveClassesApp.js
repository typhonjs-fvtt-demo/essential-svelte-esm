import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ActiveClassesAppShell  from './ActiveClassesAppShell.svelte';

export class ActiveClassesApp extends SvelteApp
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
         id: 'tjs-active-classes-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         minimizable: true,
         width: 800,
         height: 'auto',

         title: 'EssentialESM.apps.svelte-app.active-classes.title',

         svelte: {
            class: ActiveClassesAppShell,
            target: document.body
         }
      });
   }
}
