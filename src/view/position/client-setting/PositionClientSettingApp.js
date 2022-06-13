import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import ClientSettingAppShell  from './ClientSettingAppShell.svelte';

import { TJSGameSettings }    from '@typhonjs-fvtt/runtime/svelte/store';

export default class PositionClientSettingApp extends SvelteApplication
{
   #gameSettings = new TJSGameSettings();

   constructor(options)
   {
      super(options);

      this.#gameSettings.register({
         moduleId: 'essential-svelte-esm',
         key: 'position',
         options: {
            scope: 'client',
            config: false,
            default: {},
            type: Object
         }
      });

      try
      {
         // Attempt to parse session storage item and set to Position.
         this.position = game.settings.get('essential-svelte-esm', 'position');
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
         title: 'Position (Reload / Client Setting)',
         width: 'auto',
         height: 'auto',

         svelte: {
            class: ClientSettingAppShell,
            target: document.body,

            // You can provide a function and this context is the application when invoked.
            props: function()
            {
               return { settingStore: this.#gameSettings.getStore('position') };
            }
         }
      });
   }
}