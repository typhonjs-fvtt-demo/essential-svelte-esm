import { TJSGameSettingsWithUI } from '#standard/store/fvtt/settings';

import { constants }             from '#constants';

import CustomPanel               from './settings/CustomPanel.svelte';
import CustomSummaryEnd          from './settings/CustomSummaryEnd.svelte';

/**
 * Provides a local instance of TJSGameSettingsWithUI just for this local demo. TJSGameSettingsWithUI extends
 * `TJSGameSettings` with the ability to display a UI for game settings in the application itself allowing you
 * to provide easy setting options directly from your app instead of in the default Foundry settings panel / app.
 *
 * To achieve this note the `configApp` property is set to `true` and the internal Foundry settings options for `config`
 * is set to false. You may always opt to show certain settings both in app and the default Foundry game settings panel.
 *
 * The demo setup below only shows settings inside the demo app and not in the Foundry game settings panel.
 *
 * Note: Unlike the Foundry game settings panel changes in the in-app TRL settings are reactive.
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
      // Sanity exit if setting stores already registered.
      if (this.size > 0) { return; }

      const namespace = this.namespace;

      /**
       * Constants for setting scope type.
       *
       * @type {{ user: 'user', world: 'world' }}
       */
      const scope = {
         user: 'user',
         world: 'world'
      };

      /**
       * @type {TJSGameSettingsWithUI.Options.GameSetting[]}
       */
      const settings = [];

      //

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
         readonly: true,
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
            default: 0,
            units: 'ms'
         }
      });

      settings.push({
         namespace,
         key: 'test5',
         configApp: true,
         options: {
            name: 'Test 5 (require reload)',
            hint: 'When this setting is changed the user is prompted to reload.',
            scope: scope.user,
            config: false,
            requiresReload: true, // Confirm w/ user to reload on exiting settings edit.
            type: String,
            choices: {
               on: 'On',
               off: 'Off',
            },
            default: 'on'
         }
      });

      // You can separate settings into custom collapsible folders. In this case the following are all Foundry data
      // fields.

      settings.push({
         namespace,
         key: 'test1-data-field',
         configApp: true,
         folder: 'Foundry Data Fields',
         options: {
            name: 'Test 1 data field',
            hint: 'A `NumberField`',
            scope: scope.user,
            config: true,
            type: new foundry.data.fields.NumberField({ min: 0, max: 1000, step: 1 }),
            default: 1,
            units: 'ms'
         }
      });

      settings.push({
         namespace,
         key: 'testA-data-field',
         configApp: true,
         folder: 'Foundry Data Fields',
         options: {
            name: 'Test A data field',
            hint: 'A `StringField`',
            scope: scope.user,
            config: false,
            type: new foundry.data.fields.StringField(),
            default: 'Some Text',
         }
      });

      settings.push({
         namespace,
         key: 'test1-data-field2',
         configApp: true,
         folder: 'Foundry Data Fields',
         options: {
            name: 'Test 2 data field',
            hint: 'A `ColorField`',
            scope: scope.user,
            config: true,
            type: new foundry.data.fields.ColorField({ initial: '#ff0000' }),
            default: '#ff0000'
         }
      });

      settings.push({
         namespace,
         key: 'test1-data-field3',
         configApp: true,
         folder: 'Foundry Data Fields',
         options: {
            name: 'Test 3 data field',
            hint: 'A `JavaScriptField`',
            scope: scope.user,
            config: false,
            type: new foundry.data.fields.JavaScriptField(),
            default: ''
         }
      });

      settings.push({
         namespace,
         key: 'test-data-field4',
         configApp: true,
         folder: 'Foundry Data Fields',
         options: {
            name: 'Test 4 data field',
            hint: 'A `HueField`',
            scope: scope.user,
            config: true,
            type: new foundry.data.fields.HueField()
         }
      });

      settings.push({
         namespace,
         key: 'test-data-field5',
         configApp: true,
         folder: 'Foundry Data Fields',
         options: {
            name: 'Test 5 data field',
            hint: 'A `SetField`',
            scope: scope.user,
            config: false,
            type: new foundry.data.fields.SetField(
               new foundry.data.fields.StringField({ choices: () => ({ a: 'a', b: 'b' }) }))
         }
      });

      // You can also add a custom section / Svelte component.

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

Hooks.once('ready', () => demoGameSettingsWithUI.initialize());
