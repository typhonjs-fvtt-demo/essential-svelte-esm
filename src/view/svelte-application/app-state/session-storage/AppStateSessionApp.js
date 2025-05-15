import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import SessionAppShell        from './SessionAppShell.svelte';

import { sessionConstants }   from '#constants';

export class AppStateSessionApp extends SvelteApp
{
   constructor()
   {
      super();

      try
      {
         // Attempt to parse session storage item and set to application state.
         this.state.set(JSON.parse(sessionStorage.getItem(sessionConstants.appStateClient)));
      }
      catch (err) { /**/ }
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
         id: 'app-state-session-storage',
         classes: ['tjs-essential-svelte-esm'],
         title: 'App State (Reload / Session Storage)',
         resizable: true,
         width: 500,
         height: 185,

         svelte: {
            class: SessionAppShell,
            target: document.body
         }
      });
   }
}
