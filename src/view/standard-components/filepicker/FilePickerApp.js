import { SvelteApplication }  from '#runtime/svelte/application';

import FilePickerAppShell    from './FilePickerAppShell.svelte';

export class FilePickerApp extends SvelteApplication
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
         id: 'file-picker-esm',
         title: 'FilePicker components',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 500,
         height: 'auto',
         top: 900,

         svelte: {
            class: FilePickerAppShell,
            target: document.body,
         }
      });
   }
}
