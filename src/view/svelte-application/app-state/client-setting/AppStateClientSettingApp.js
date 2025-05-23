import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ClientSettingAppShell  from './ClientSettingAppShell.svelte';

import {
   constants,
   settings }                 from '#constants';

import { gameSettings }       from '#gameSettings';

export class AppStateClientSettingApp extends SvelteApp
{
   constructor()
   {
      super();

      /**
       * Register a world game setting w/ TJSGameSettings. This makes a client setting / localstorage store available
       * to serialize the app state.
       */
      gameSettings.register({
         namespace: constants.moduleId,
         key: settings.appStateClient,
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
         this.state.set(game.settings.get(constants.moduleId, settings.appStateClient));
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
         id: 'app-state-client-setting',
         classes: ['tjs-essential-svelte-esm'],
         title: 'App State (Reload / Client Setting)',
         resizable: true,
         width: 500,
         height: 185,

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
               return { settingStore: gameSettings.getStore(settings.appStateClient) };
            }
         }
      });
   }
}
