import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import ContentEditableShell   from './ContentEditableShell.svelte';

export default class ContentEditableApp extends SvelteApplication
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
         id: 'tjs-content-edit',
         title: 'TJSContentEdit',
         resizable: true,
         width: 550,
         height: 300,

         svelte: {
            class: ContentEditableShell,
            target: document.body,
         }
      });
   }
}