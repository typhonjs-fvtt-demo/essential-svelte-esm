import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';
import { SessionStorage }     from '@typhonjs-fvtt/runtime/svelte/store';

import SessionAppShell        from './SessionAppShell.svelte';

export default class AppStateSessionApp extends SvelteApplication
{
   // Note: In this trivial example we create a SessionStorage instance here, but normally you want to create a single
   // instance that is shared across your module / package.
   #sessionStorage = new SessionStorage();

   constructor(options)
   {
      super(options);

      try
      {
         // Attempt to parse session storage item and set to application state.
         this.state.set(JSON.parse(sessionStorage.getItem('essential-svelte-esm.app-state')));
      }
      catch (err) { /**/ }
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'app-state-session-storage',
         title: 'App State (Reload / Session Storage)',
         resizable: true,

         svelte: {
            class: SessionAppShell,
            target: document.body,

            // You can provide a function and this context is the application when invoked.
            props: function()
            {
               // Creates a store from SessionStorage.
               return { storageStore: this.#sessionStorage.getStore('essential-svelte-esm.app-state') };
            }
         }
      });
   }
}