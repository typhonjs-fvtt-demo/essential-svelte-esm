import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import HeaderButtonsAppShell  from './HeaderButtonsAppShell.svelte';
import TestSCComponent        from './TestSCComponent.svelte';
import ProgressBar            from './ProgressBar.svelte';

import { sessionConstants }   from '../../constants.js';

export default class HeaderButtonsApplication extends SvelteApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {}) { super(options); }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'header-buttons-esm',
         resizable: true,
         minimizable: true,
         title: 'Essential Svelte (ESM) - Header Buttons',
         headerIcon: 'icons/magic/air/air-burst-spiral-blue-gray.webp',
         width: 600,
         height: 180,
         maxHeight: 180,
         minHeight: 180,
         minWidth: 385,

         svelte: {
            class: HeaderButtonsAppShell,
            target: document.body
         }
      });
   }

   /**
    * Specify the set of config buttons which should appear in the app header. Buttons should be returned as an
    * Array of objects.
    *
    * Provides an explicit override of Application._getHeaderButtons to add additional buttons.
    *
    * Additional properties for button data includes:
    * - {boolean}    alignLeft - When true the button is left aligned after the window title.
    * - {string}     keyCode - Defines the KeyboardEvent 'code' that activates the button; default: 'Enter'.
    * - {Function}   onContextMenu - Callback for right click / contextmenu keyboard event.
    * - {Function}   onPress - Callback for left click / 'Enter' key.
    * - {Record<string, string>} styles - Inline styles to apply to the button.
    * - {string}     title - A tooltip to display when hovered.
    *
    * @returns {ApplicationHeaderButton[]} The app header buttons.
    * @override
    */
   _getHeaderButtons()
   {
      const buttons = super._getHeaderButtons();

      const storage = this.reactive.sessionStorage;

      const themeDarkMode = storage.getItem(sessionConstants.themeDarkMode, true);

      buttons.unshift({
         class: 'theme-dark',
         icon: 'fas fa-moon',
         title: themeDarkMode ? 'Dark Node disable' : 'Dark Mode enable',
         styles: themeDarkMode ? { color: 'lightblue' } : { color: 'white' },
         // keyCode: 'Space', // You can provide an alternate key code for button key press.

         // You can define `onContextMenu` for right click / contextmenu key press.
         // onContextMenu: function()
         // {
         //    console.log(`HeaderButtons - onContextMenu`);
         // },

         // When using a normal function `this` is the button data and it can be modified.
         onPress: function()
         {
            const newThemeDarkMode = storage.swapItemBoolean(sessionConstants.themeDarkMode);

            this.title = newThemeDarkMode ? 'Dark Node disable' : 'Dark Mode enable';
            this.styles = newThemeDarkMode ? { color: 'lightblue' } : { color: 'white' };
         }
      });

      buttons.unshift(TestSCComponent);

      buttons.unshift(ProgressBar);

      // You can left-align a header buttons after the window title by setting `alignLeft` to true.
      buttons.unshift({
         class: 'test-left',
         icon: 'fas fa-check',
         title: 'Test',
         alignLeft: true,
      });

      return buttons;
   }
}