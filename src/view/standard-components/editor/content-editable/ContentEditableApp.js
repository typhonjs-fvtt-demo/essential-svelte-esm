import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ContentEditableShell   from './ContentEditableShell.svelte';

export class ContentEditableApp extends SvelteApp
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
         id: 'tjs-content-edit',
         classes: ['tjs-essential-svelte-esm'],
         title: 'TJSContentEdit',
         resizable: true,
         width: 550,
         height: 300,

         svelte: {
            class: ContentEditableShell,
            target: document.body
         }
      });
   }
}
