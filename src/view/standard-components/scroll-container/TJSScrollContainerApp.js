import { SvelteApp }                from '#runtime/svelte/application';
import { deepMerge }                from '#runtime/util/object';

import TJSScrollContainerAppShell   from './TJSScrollContainerAppShell.svelte';

export class TJSScrollContainerApp extends SvelteApp
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
         id: 'tjs-scroll-container-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 400,
         height: 300,

         title: 'EssentialESM.apps.components.scroll-container.title',

         svelte: {
            class: TJSScrollContainerAppShell,
            target: document.body
         }
      });
   }
}
