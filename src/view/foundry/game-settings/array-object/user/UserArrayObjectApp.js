import { SvelteApp }             from '#runtime/svelte/application';
import { deepMerge }             from '#runtime/util/object';

import UserArrayObjectAppShell   from './UserArrayObjectAppShell.svelte';
import { UserItemArrayStore }    from './UserItemArrayStore.js';

import { settings }              from '#constants';

export class UserArrayObjectApp extends SvelteApp
{
   /**
    * @type {UserItemArrayStore}
    */
   #itemStore;

   /**
    * @param {SvelteApp.Options} options -
    */
   constructor(options)
   {
      super(options);

      this.#itemStore = new UserItemArrayStore('test_delete');
   }

   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(SvelteApp.defaultOptions, {
         id: 'tjs-items-user-setting-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         minimizable: true,
         width: 800,
         height: 'auto',

         title: 'EssentialESM.apps.foundry.settings.user.title',

         svelte: {
            class: UserArrayObjectAppShell,
            target: document.body,

            /**
             * @this {UserArrayObjectApp}
             *
             * @returns {object} App shell props.
             */
            context: function()
            {
               return { itemStore: this.#itemStore };
            }
         }
      });
   }
}
