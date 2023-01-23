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
         resizable: false,
         minimizable: true,
         width: 500,
         height: 'auto',
         title: 'Essential Svelte (ESM) - Header Buttons',
         headerIcon: 'icons/magic/air/air-burst-spiral-blue-gray.webp',

         svelte: {
            class: HeaderButtonsAppShell,
            target: document.body
         }
      });
   }

   /**
    * Specify the set of config buttons which should appear in the Application header. Buttons should be returned as an
    * Array of objects.
    *
    * Provides an explicit override of Application._getHeaderButtons to add
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

         onclick: function()
         {
            const newThemeDarkMode = storage.swapItemBoolean(sessionConstants.themeDarkMode);

            this.title = newThemeDarkMode ? 'Dark Node disable' : 'Dark Mode enable';
            this.styles = newThemeDarkMode ? { color: 'lightblue' } : { color: 'white' };
         }
      });

      buttons.unshift(TestSCComponent);

      buttons.unshift(ProgressBar);

      return buttons;
   }
}