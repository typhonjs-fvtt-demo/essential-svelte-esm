import { FVTTSidebarControl } from '#standard/application/control/sidebar';

import SidebarCustomTab       from './SidebarCustomTab.svelte';
import SidebarCustomTabIcon   from './SidebarCustomTabIcon.svelte';

import { sessionConstants }   from '#constants';

export *                      from './SidebarCustomTabApp.js';

/**
 * Custom sidebar tabs must be loaded in the Foundry `init` hook. Below the loading is gated on a session storage
 * value that is set in `SidebarCustomTabApp`.
 */
Hooks.on('init', () =>
{
   const addTabEnabled = globalThis.sessionStorage.getItem(sessionConstants.sidebarCustomTab);
   const replaceTabEnabled = globalThis.sessionStorage.getItem(sessionConstants.sidebarReplaceTab);
   const removeTabEnabled = globalThis.sessionStorage.getItem(sessionConstants.sidebarRemoveTab);

   if (addTabEnabled === 'true')
   {
      FVTTSidebarControl.add({
         id: 'custom-tab',
         beforeId: 'chat',
         icon: 'fas fa-crosshairs-simple',
         tooltip: 'Custom Tab',
         title: 'Custom Tab',
         svelte: {
            class: SidebarCustomTab,
            props: {
               message: '<p>This is a basic demo of mounting a Svelte component as a custom sidebar tab / popout.</p>' +
                '<p>FVTTSidebarControl also allows you to replace or remove existing tabs.</p>'
            }
         }
      });
   }

   if (replaceTabEnabled === 'true')
   {
      FVTTSidebarControl.replace({
         id: 'combat',
         tooltip: 'Custom Combat',
         title: 'Custom Combat',

         // icon: 'fas fa-swords', // Instead of a basic Font Awesome icon...
         // You can mount a custom Svelte component as the sidebar button / tab which can be interactive.
         icon: {
            class: SidebarCustomTabIcon
         },
         svelte: {
            class: SidebarCustomTab,
            props: {
               message: '<p>This is a basic demo of mounting a Svelte component as a custom replacement sidebar tab / popout.</p>' +
                '<p>FVTTSidebarControl also allows you to add or remove existing tabs.</p>'
            }
         },

         // When replacing a tab, there are many aspects that are hardcoded across the core sidebar UI apps.
         // These functions are specific to the combat app. You must implement all methods accessed across the core
         // platform for the given tab you are replacing. In the case of the combat tab, here are two common functions.
         mergeAppImpl: {
            _isTokenVisible: () => true,
            hoverCombatant: () => void 0
         }
      });
   }

   // Remove the `journal` tab. Note: removing tabs is not recommended but is possible.
   if (removeTabEnabled === 'true')
   {
      FVTTSidebarControl.remove({ id: 'journal' });
   }
});
