import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import UserSettingAppShell  from './UserSettingAppShell.svelte';

import {
   constants,
   settings }                 from '#constants';

import { gameSettings }       from '#gameSettings';

export class AppStateUserSettingApp extends SvelteApp
{
   constructor()
   {
      super();

      /**
       * Register a `user` game setting w/ TJSGameSettings; available since `v13` of Foundry. This makes a user setting
       * stored in the Foundry DB and associated w/ the current user to serialize the app state.
       */
      gameSettings.register({
         namespace: constants.moduleId,
         key: settings.appStateUser,
         options: {
            scope: 'user',
            config: false,
            default: {},
            type: Object
         }
      });

      try
      {
         // Attempt to parse user game setting and set application state.
         this.state.set(game.settings.get(constants.moduleId, settings.appStateUser));
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
         id: 'app-state-user-setting',
         classes: ['tjs-essential-svelte-esm'],
         title: 'App State (Reload / User Setting)',
         resizable: true,
         width: 500,
         height: 'auto',

         svelte: {
            class: UserSettingAppShell,
            target: document.body,

            /**
             * You can provide a function and the `this` context is the application when invoked.
             *
             * @this {AppStateUserSettingApp}
             *
             * @returns {object} Props for Svelte component.
             */
            props: function()
            {
               // Creates a store
               return { settingStore: gameSettings.getStore(settings.appStateUser) };
            }
         }
      });
   }
}
