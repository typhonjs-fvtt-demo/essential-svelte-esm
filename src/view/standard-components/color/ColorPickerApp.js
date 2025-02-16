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
         resizable: true,
         width: 675,
         height: 800,
         minWidth: 675,
         minHeight: 800,

         svelte: {
            class: ColorPickerAppShell,
            target: document.body
         }
      });
   }
}
