import { SvelteApp }             from '#runtime/svelte/application';

import SidebarCustomTabAppShell  from './SidebarCustomTabAppShell.svelte';

export class SidebarCustomTabApp extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-sidebar-custom-section-esm',
         title: 'Custom Sidebar Tab',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 400,
         height: 'auto',

         svelte: {
            class: SidebarCustomTabAppShell,
            target: document.body,
         }
      });
   }
}
