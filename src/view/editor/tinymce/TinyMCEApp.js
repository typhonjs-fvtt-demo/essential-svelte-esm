import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import TinyMCEShell           from './TinyMCEShell.svelte';

export default class TinyMCEApp extends SvelteApplication
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
         id: 'tjs-tiny-mce',
         classes: ['tjs-essential-svelte-esm'],
         title: 'TJSTinyMCE',
         resizable: true,
         width: 550,
         height: 300,

         svelte: {
            class: TinyMCEShell,
            target: document.body,
         }
      });
   }
}