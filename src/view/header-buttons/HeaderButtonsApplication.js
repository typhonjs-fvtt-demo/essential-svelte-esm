import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';
import { SessionStorage }     from '@typhonjs-fvtt/runtime/svelte/store';

import HeaderButtonsAppShell  from './HeaderButtonsAppShell.svelte';
import TestSCComponent        from './TestSCComponent.svelte';
import ProgressBar            from './ProgressBar.svelte';

import { sessionConstants }   from '../../constants.js';

const storage = new SessionStorage();

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
    * @see https://foundryvtt.com/api/Application.html#options
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

      const themeDarkMode = storage.getItem(sessionConstants.themeDarkMode);

      buttons.unshift({
         class: 'theme-dark',
         icon: 'fas fa-moon',
         title: themeDarkMode ? 'Dark Mode enable' : 'Dark Node disable',
         styles: themeDarkMode ? { color: 'white' } : { color: 'lightblue' },

         onclick: function()
         {
            const newThemeDarkMode = storage.swapItemBoolean(sessionConstants.themeDarkMode);

            this.title = newThemeDarkMode ? 'Dark Mode enable' : 'Dark Node disable';
            this.styles = newThemeDarkMode ? { color: 'white' } : { color: 'lightblue' };
         }
      });

      buttons.unshift(TestSCComponent);

      buttons.unshift(ProgressBar);

      return buttons;
   }
}