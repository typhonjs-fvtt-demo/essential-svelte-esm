import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ContentResizeAppShell  from './ContentResizeAppShell.svelte';

export class ContentResizeApp extends SvelteApp
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
         title: 'EssentialESM.apps.actions.content-resize-observer.title',
         resizable: true,
         height: 'auto',

         svelte: {
            class: ContentResizeAppShell,
            target: document.body
         }
      });
   }
}
