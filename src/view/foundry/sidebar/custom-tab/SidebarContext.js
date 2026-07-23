import { derived, get }       from 'svelte/store';

import { propertyStore }      from '#runtime/svelte/store/writable-derived';

import { sessionConstants }   from '#constants';

/**
 * @import { SidebarCustomTabApp } from './SidebarCustomTabApp';
 */

/**
 * So, what is all of this below? To keep the app UI state tidy by sharing one session storage object with
 * several derived stores using `propertyStore` from `writable-derived` these derived stores must be created in
 * the application scope and not internally to the Svelte component or the loading process. While it is safe to
 * access individual WebStorage stores from `application.reactive.sessionStorage` inside Svelte components it
 * is not safe to derive stores from an app scoped WebStorage store inside Svelte as the derived stores are
 * associated with an external source. If you do that the derived stores repeatedly get created each time the
 * main app is rendered and are retained.
 *
 * The solution is to create the derived `propertyStore` reference in the app scope as done below and associate
 * the stores via a `context` passed into the Svelte component / app shell.
 */
export class SidebarContext
{
   /**
    * @param {SidebarCustomTabApp}   application -
    */
   constructor(application)
   {
      const uiState = application.reactive.sessionStorage.getStore(sessionConstants.sidebarTabs, {
         tabAdd: false,
         tabRemove: false,
         tabReplace: false
      });

      const tabAdd = propertyStore(uiState, 'tabAdd');
      const tabRemove = propertyStore(uiState, 'tabRemove');
      const tabReplace = propertyStore(uiState, 'tabReplace');

      const initialState = [get(tabAdd), get(tabRemove), get(tabReplace)];
      let initialized = false;

      // Create a derived store which detects when any boolean state does not match initial state on load.
      const reloadRequired = derived(
         [tabAdd, tabRemove, tabReplace],
         ([$a, $b, $c], set) =>
         {
            if (!initialized)
            {
               initialized = true;
               set(false);
               return;
            }

            const current = [$a, $b, $c];

            const changed = current.some((v, i) => v !== initialState[i]);
            set(changed);
         },
         false
      );

      /**
       * @type {SidebarCustomTabApp.Context.External['stores']}
       */
      this.stores = {
         reloadRequired,
         tabAdd,
         tabRemove,
         tabReplace
      };

      Object.seal(this);
   }
}
