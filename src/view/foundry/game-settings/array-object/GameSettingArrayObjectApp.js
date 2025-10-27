import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import ArrayObjectAppShell    from './ArrayObjectAppShell.svelte';

import { ItemConfiguration }  from '#arrayObjectData';

/**
 * This demo app show best practices in being completely data defined. The `scope` option is passed into the constructor
 * indicating which setting mode `user` or `world` is utilized in the backing `GameSettingArrayObject` data.
 *
 * @see ItemConfiguration
 */
export class GameSettingArrayObjectApp extends SvelteApp
{
   #scope;

   constructor(options = {})
   {
      super(options);

      if (options.scope !== 'user' && options.scope !== 'world')
      {
         throw new TypeError(`GameSettingArrayObjectApp ctor error: 'scope' must 'user' or 'world'.`);
      }

      this.#scope = options.scope;
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
             * @returns {{ itemContext: import('#arrayObjectData').ItemContext }} Item entries context.
             */
            context: function()
            {
               return ItemConfiguration.getContext(this.#scope);
            }
         }
      });
   }
}
