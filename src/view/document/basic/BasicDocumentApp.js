import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import BasicDocAppShell       from './BasicDocAppShell.svelte';

export default class BasicDocumentApp extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'tjs-document-basic',
         title: 'Basic Reactive Document',
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