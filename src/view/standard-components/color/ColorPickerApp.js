import { SvelteApp }       from '#runtime/svelte/application';
import { deepMerge }       from '#runtime/util/object';

import ColorPickerAppShell from './ColorPickerAppShell.svelte';

export class ColorPickerApp extends SvelteApp
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
         id: 'trl-color-picker-esm',
         title: 'TJSColordPicker',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 750,
         height: 860,
         minWidth: 750,
         minHeight: 860,

         svelte: {
            class: ColorPickerAppShell,
            target: document.body
         }
      });
   }
}
