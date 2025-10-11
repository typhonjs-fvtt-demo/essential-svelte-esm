import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import { TJSContextMenu }     from '#standard/application/menu';

import TJSMenuAppShell        from './TJSMenuAppShell.svelte';

import { sessionConstants }   from "#constants";
import { createMenuItems } from "./createMenuItems.js";

export class TJSMenuApp extends SvelteApp
{
   constructor()
   {
      super();

      try
      {
         // Attempt to parse session storage item and set to application state.
         this.state.set(JSON.parse(sessionStorage.getItem(sessionConstants.appStateMenu)));
      }
      catch { /**/ }
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
            target: document.body
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
