import { SvelteApp }    from '#runtime/svelte/application';

import BasicDocAppShell from './BasicDocAppShell.svelte';

export class BasicDocumentApp extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'tjs-document-basic',
         classes: ['tjs-essential-svelte-esm'],
         title: 'Reactive Document (basic)',
         resizable: true,
         width: 500,
         height: 'auto',

         svelte: {
            class: BasicDocAppShell,
            target: document.body,
         }
      });
   }
}
