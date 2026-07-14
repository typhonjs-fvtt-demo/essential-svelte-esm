import { SvelteApp }                from '#runtime/svelte/application';
import { deepMerge }                from '#runtime/util/object';

import TJSDataFieldAppShell  from './TJSDataFieldAppShell.svelte';

export class TJSDataFieldApp extends SvelteApp
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
         id: 'trl-data-field-esm',
         title: 'TJSDataField - Reactive DataFields',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         width: 900,
         height: 'auto',
         minWidth: 530,

         svelte: {
            class: TJSDataFieldAppShell,
            target: document.body
         }
      });
   }
}
