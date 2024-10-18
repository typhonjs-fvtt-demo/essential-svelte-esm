import { SvelteApplication }     from '#runtime/svelte/application';

import SidebarCustomTabAppShell  from './SidebarCustomTabAppShell.svelte';

export class SidebarCustomTabApp extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
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
