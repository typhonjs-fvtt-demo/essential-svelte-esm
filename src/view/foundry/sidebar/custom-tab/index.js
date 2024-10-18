import { FVTTSidebarControl } from '#standard/application/control/sidebar';

import SidebarCustomTab       from './SidebarCustomTab.svelte';

import { sessionConstants }   from '#constants';

export *                      from './SidebarCustomTabApp.js';

/**
 * Custom sidebar tabs must be loaded in the Foundry `init` hook. Below the loading is gated on a session storage
 * value that is set in `SidebarCustomTabApp`.
 */
Hooks.on('init', () =>
{
   const sidebarTabEnabled = globalThis.sessionStorage.getItem(sessionConstants.sidebarCustomTab);

   if (sidebarTabEnabled === 'true')
   {
      FVTTSidebarControl.add({
         id: 'custom-tab',
         beforeId: 'chat',
         icon: 'fas fa-crosshairs-simple',
         tooltip: 'Custom Tab',
         title: 'Custom Tab',
         svelte: {
            class: SidebarCustomTab
         }
      });
   }
});
