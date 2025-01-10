import { SvelteApp } from '#runtime/svelte/application';

import TinyMCEShell  from './TinyMCEShell.svelte';

export class TinyMCEApp extends SvelteApp
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
