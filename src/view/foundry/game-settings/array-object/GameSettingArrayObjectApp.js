import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ArrayObjectAppShell    from './ArrayObjectAppShell.svelte';

import { ItemContext }        from '#arrayObjectContext';

/**
 * This demo app show best practices in being completely data defined. The `settingScope` app option is passed through
 * SvelteApp options indicating which setting mode `user` or `world` is utilized in the backing
 * `GameSettingArrayObject` data configured in `ItemContext`.
 *
 * @see ItemContext
 */
export class GameSettingArrayObjectApp extends SvelteApp
{
   /**
    * Defines the context passed to Svelte components.
    *
    * @type {ItemContext}
    */
   #context;

   /**
    * @param {SvelteApp.Options} options - SvelteApp options.
    */
   constructor(options)
   {
      super(options);

      this.#context = new ItemContext(this);
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
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         minimizable: true,
         width: 900,
         height: 'auto',

         svelte: {
            class: ArrayObjectAppShell,
            target: document.body,

            /**
             * @this {GameSettingArrayObjectApp}
             *
             * @returns {object} Item entries context.
             */
            context: function() { return { itemContext: this.#context }; }
         }
      });
   }
}
