import { SvelteApp }                from '#runtime/svelte/application';
import { deepMerge }                from '#runtime/util/object';

import BasicDataFieldInputAppShell  from './BasicDataFieldInputAppShell.svelte';

export class BasicDataFieldInputApp extends SvelteApp
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
         id: 'trl-basic-data-field-input-esm',
         title: 'Basic Data Field Input',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 900,
         height: 'auto',
         minWidth: 900,

         svelte: {
            class: BasicDataFieldInputAppShell,
            target: document.body
         }
      });
   }
}
