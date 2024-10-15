import { SvelteApplication }  from '#runtime/svelte/application';

import ColorPickerAppShell    from './ColorPickerAppShell.svelte';

export class ColorPickerApp extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
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
            target: document.body,
         }
      });
   }
}
