import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import TJSMenuAppShell        from './TJSMenuAppShell.svelte';

import { sessionConstants }   from "#constants";

export class TJSMenuApp extends SvelteApp
{
   constructor()
   {
      super();

      try
      {
         // Attempt to parse session storage item and set to application state.
         this.state.set(JSON.parse(sessionStorage.getItem(sessionConstants.appStateMenu)));
      }
      catch { /**/ }
   }

   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'tjs-menu-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 500,
         height: 320,
         minHeight: 320,

         title: 'EssentialESM.apps.components.menus.title',

         svelte: {
            class: TJSMenuAppShell,
            target: document.body
         }
      });
   }
}
