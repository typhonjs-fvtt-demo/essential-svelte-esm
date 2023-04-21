import { SvelteApplication }  from '#runtime/svelte/application';

import BasicDocAppShell       from './BasicDocAppShell.svelte';

export default class BasicDocumentApp extends SvelteApplication
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