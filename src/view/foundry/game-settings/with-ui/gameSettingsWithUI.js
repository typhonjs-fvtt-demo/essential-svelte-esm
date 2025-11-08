import { TJSIconButton }         from '#standard/component/button';

import { TJSGameSettingsWithUI } from '#standard/store/fvtt/settings';

import { constants }             from '#constants';

import CustomPanel               from './settings/CustomPanel.svelte';
import CustomSummaryEnd          from './settings/CustomSummaryEnd.svelte';

/**
 * Provides a local instance of TJSGameSettingsWithUI just for this local demo. TJSGameSettingsWithUI extends
 * `TJSGameSettings` with the ability to display a UI for game settings in the application itself allowing you
 * to provide easy setting options directly from your app instead of in the default Foundry settings panel / app.
 */
class DemoGameSettingsWithUI extends TJSGameSettingsWithUI
{
   constructor()
   {
      super(constants.moduleId);
   }

   /**
    * Usually you will invoke `initialize` in a Foundry ready hook.
    */
   initialize()
   {
      const namespace = this.namespace;

      /**
       * Constants for setting scope type.
       *
       * @type {{ user: string, world: string }}
       */
      const scope = {
         user: 'user',
         world: 'world'
      };

      /**
       * @type {TJSGameSettingsWithUI.Options.GameSetting[]}
       */
      const settings = [];

      settings.push({
         namespace,
         key: 'test1',
         configApp: true,
         options: {
            name: 'Test 1',
            hint: 'Test 1 Hint',
            scope: scope.user,
            config: false,
            type: String,
            choices: {
               on: 'On',
               off: 'Off',
            },
            default: 'on'
         }
      });

      settings.push({
         namespace,
         key: 'test2',
         configApp: true,
         options: {
            name: 'Test 2',
            hint: 'Test 2 Hint',
            scope: scope.world,
            config: false,
            type: Boolean,
            default: false
         }
      });

      settings.push({
         namespace,
         key: 'test3',
         configApp: true,
         options: {
            name: 'Test 3',
            hint: 'Test 3 Hint',
            scope: scope.world,
            config: false,
            type: String,
            default: '',
            filePicker: 'any'
         }
      });

      settings.push({
         namespace,
         key: 'test4',
         configApp: true,
         options: {
            name: 'Test 4',
            hint: 'Test 4 Hint',
            scope: scope.world,
            config: false,
            type: Number,
            default: 0
         }
      });

      settings.push({
         namespace,
         key: 'testA',
         configApp: true,
         folder: 'Test Folder',
         options: {
            name: 'Test A',
            hint: 'Test A Hint',
            scope: scope.world,
            config: false,
            type: Boolean,
            default: false
         }
      });

      settings.push({
         namespace,
         key: 'testB',
         configApp: true,
         folder: 'Test Folder',
         options: {
            name: 'Test B',
            hint: 'Test B Hint',
            scope: scope.world,
            config: false,
            type: Number,
            default: 0,
            range: { min: 0, max: 100 }
         }
      });

      settings.push({
         namespace,
         key: 'testC',
         configApp: true,
         folder: 'Test Folder',
         options: {
            name: 'Test C',
            hint: 'Test C Hint',
            scope: scope.world,
            config: false,
            type: String,
            default: '',
            filePicker: 'image'
         }
      });

      settings.push({
         namespace,
         key: 'testD',
         configApp: true,
         folder: 'Test Folder',
         options: {
            name: 'Test D',
            hint: 'Test D Hint',
            scope: scope.world,
            config: false,
            type: Number,
            default: 0
         }
      });

      this.uiControl.addSection({
         folder: {
            label: 'Custom Svelte Panel',
            summaryEnd: {
               class: CustomSummaryEnd,
               props: {
                  message: 'Custom summary end'
               }
            }
         },
         class: CustomPanel,
         props: {
            message: 'A custom panel'
         },
      });

      this.registerAll(settings);
   }
}

const demoGameSettingsWithUI = new DemoGameSettingsWithUI();

export { demoGameSettingsWithUI };

// Normally you can initialize settings on the `ready` hook.

// Hooks.once('ready', () => demoGameSettingsWithUI.initialize());
