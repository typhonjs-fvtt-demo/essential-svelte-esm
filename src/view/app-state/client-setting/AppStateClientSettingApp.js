import { SvelteApplication }  from '#runtime/svelte/application';
import { TJSGameSettings }    from '#runtime/svelte/store/fvtt/settings';

import ClientSettingAppShell  from './ClientSettingAppShell.svelte';

import { constants }          from '../../../constants.js';

export default class AppStateClientSettingApp extends SvelteApplication
{
   // Note: In this trivial example we create a TJSGameSettings instance here, but normally you want to create a single
   // instance that is shared across your module / package.
   #gameSettings = new TJSGameSettings(constants.moduleId);

   constructor(options)
   {
      super(options);

      // Register a client game setting.
      this.#gameSettings.register({
         namespace: constants.moduleId,
         key: 'app-state',
         options: {
            scope: 'client',
            config: false,
            default: {},
            type: Object
         }
      });

      try
      {
         // Attempt to parse client game setting and set application state.
         this.state.set(game.settings.get('essential-svelte-esm', 'app-state'));
      }
      catch (err) { /**/ }
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'app-state-client-setting',
         classes: ['tjs-essential-svelte-esm'],
         title: 'App State (Reload / Client Setting)',
         resizable: true,
         width: 500,
         height: 175,

         svelte: {
            class: ClientSettingAppShell,
            target: document.body,

            /**
             * You can provide a function and the `this` context is the application when invoked.
             *
             * @this {AppStateClientSettingApp}
             *
             * @returns {object} Props for Svelte component.
             */
            props: function()
            {
               // Creates a store
               return { settingStore: this.#gameSettings.getStore('app-state') };
            }
         }
      });
   }
}