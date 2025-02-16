import { SvelteApp }             from '#runtime/svelte/application';
import { deepMerge }             from '#runtime/util/object';

import SidebarCustomTabAppShell  from './SidebarCustomTabAppShell.svelte';

export class SidebarCustomTabApp extends SvelteApp
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
         id: 'trl-sidebar-custom-section-esm',
         title: 'Custom Sidebar Tab',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 400,
         height: 'auto',

         svelte: {
            class: SidebarCustomTabAppShell,
            target: document.body
         }
      });
   }
}
