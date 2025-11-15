import { SvelteApp }                from '#runtime/svelte/application';
import { deepMerge }                from '#runtime/util/object';

import { demoGameSettingsWithUI }   from './gameSettingsWithUI.js';

import GameSettingUIAppShell        from './GameSettingUIAppShell.svelte';

export class TJSGameSettingWithUIApp extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'tjs-game-settings-ui-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 800,
         height: 500,
         minWidth: 400,
         minHeight: 200,

         title: 'EssentialESM.apps.foundry.settings.with-ui.title',

         svelte: {
            class: GameSettingUIAppShell,
            target: document.body
         }
      });
   }

   /**
    * Specify the set of config buttons which should appear in the Application header. Buttons should be returned as an
    * Array of objects.
    *
    * Provides an explicit override of Application._getHeaderButtons to add
    *
    * @returns {SvelteApp.HeaderButton[]} The app header buttons.
    * @override
    */
   _getHeaderButtons()
   {
      const buttons = super._getHeaderButtons();

      const showSettings = demoGameSettingsWithUI.uiControl.showSettings;

      buttons.unshift({
         class: "settings",
         icon: showSettings ? 'fa-regular fa-square-list' : 'fa-regular fa-gear',
         label: showSettings ? 'Main Menu' : 'Settings',

         onPress: ({ button }) =>
         {
            const newShowSettings = demoGameSettingsWithUI.uiControl.swapShowSettings();

            button.icon = newShowSettings ? 'fa-regular fa-square-list' : 'fa-regular fa-gear';
            button.label = newShowSettings ? 'Main Menu' : 'Settings';
         }
      });

      return buttons;
   }
}
