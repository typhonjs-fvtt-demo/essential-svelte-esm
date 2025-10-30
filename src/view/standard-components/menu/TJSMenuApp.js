import { SvelteApp }          from '#runtime/svelte/application';
import { propertyStore }      from '#runtime/svelte/store/writable-derived';
import { deepMerge }          from '#runtime/util/object';

import { TJSContextMenu }     from '#standard/application/menu';

import { createMenuItems }    from './createMenuItems.js';
import TJSMenuAppShell        from './TJSMenuAppShell.svelte';

import { sessionConstants }   from '#constants';

/**
 * @augments {SvelteApp<import('./types').Options>}
 */
export class TJSMenuApp extends SvelteApp
{
   /**
    * Defines the additional external context / derived WebStorage stores passed to the app shell / Svelte.
    *
    * @type {Partial<import('./types').External>}
    */
   #context;

   constructor()
   {
      super();

      try
      {
         // Attempt to parse session storage item and set to application state.
         this.state.set(JSON.parse(sessionStorage.getItem(sessionConstants.menusAppState)));
      }
      catch { /**/ }

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

      const uiState = this.reactive.sessionStorage.getStore(sessionConstants.menusUIState, {
         fontScale: 200,
         scrollContainer: {
            keyFocus: false,
            keyPropagate: false,
            scrollTop: 0
         }
      });

      this.#context = {
         stores: {
            fontScale: propertyStore(uiState, 'fontScale'),
            scrollContainer: {
               keyFocus: propertyStore(uiState, ['scrollContainer', 'keyFocus']),
               keyPropagate: propertyStore(uiState, ['scrollContainer', 'keyPropagate']),
               scrollTop: propertyStore(uiState, ['scrollContainer', 'scrollTop'])
            }
         }
      };
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
         id: 'tjs-menu-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 550,
         height: 375,
         minHeight: 375,

         title: 'EssentialESM.apps.components.menus.title',

         svelte: {
            class: TJSMenuAppShell,
            target: document.body,

            /**
             * @this {TJSMenuApp}
             *
             * @returns {object} Menu store context.
             */
            context: function() { return this.#context; }
         }
      });
   }

   /**
    * Adds a header button to launch `TJSContextMenu`.
    *
    * @returns {SvelteApp.HeaderButton[]} The app header buttons.
    * @override
    */
   _getHeaderButtons()
   {
      const buttons = super._getHeaderButtons();

      buttons.unshift({
         icon: 'fas fa-ellipsis-v',
         label: 'TJSContextMenu',
         tooltipDirection: 'UP',
         onPress: ({ event }) =>
         {
            TJSContextMenu.create({
               event,

               /**
                * Note: A useful positioning aid to anchor the context menu to the event target element. This usually is
                * the bottom / left of the element, but it will be adjusted when the menu opens to the left or up.
                */
               anchorToEventTarget: true,

               /**
                * Note: When not passing the `application` reference to `createMenuItems` the `always on top` item isn't
                * added. Try modifying the code removing `{ application }`.
                */
               items: createMenuItems({ application: this })
            });
         }
      });

      return buttons;
   }
}
