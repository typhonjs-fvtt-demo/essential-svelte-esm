import { SvelteApp }             from '#runtime/svelte/application';

import { deepMerge }             from '#runtime/util/object';

import { SidebarContext }        from './SidebarContext.js';
import SidebarCustomTabAppShell  from './SidebarCustomTabAppShell.svelte';

/** 
 * @import { Options }           from './types';
 */

/**
 * @augments {SvelteApp<Options>}
 */
export class SidebarCustomTabApp extends SvelteApp
{
   /**
    * Defines the additional external context / derived WebStorage stores passed to the app shell / Svelte.
    *
    * @type {SidebarContext}
    */
   #context;

   /**
    * @param {SvelteApp.Options} options - SvelteApp options.
    */
   constructor(options)
   {
      super(options);

      this.#context = new SidebarContext(this);
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
         id: 'trl-sidebar-custom-section-esm',
         title: 'Custom Sidebar Tab',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 400,
         height: 'auto',

         svelte: {
            class: SidebarCustomTabAppShell,
            target: document.body,

            /**
             * @this {SidebarCustomTabApp}
             *
             * @returns {object} Tab store context.
             */
            context: function() { return this.#context; }
         }
      });
   }
}
