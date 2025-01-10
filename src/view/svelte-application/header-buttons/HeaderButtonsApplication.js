import { SvelteApplication }  from '#runtime/svelte/application';

import HeaderButtonsAppShell  from './HeaderButtonsAppShell.svelte';
import TestSCComponent        from './TestSCComponent.svelte';
import ProgressBar            from './ProgressBar.svelte';

import { sessionConstants }   from '#constants';

export class HeaderButtonsApplication extends SvelteApplication
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
         id: 'header-buttons-esm',
         classes: ['tjs-essential-svelte-esm'],
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
    * You may also pass an object containing a 'svelte' property which is a TJSSvelte.Config.Embed / Svelte
    * configuration object to load a Svelte component in the app header.
    *
    * @returns {SvelteApp.HeaderButton[]} The app header buttons.
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
         title: themeDarkMode ? 'Dark Node disable' : 'Dark Mode enable',     // Additional TRL option; sets hover title.
         styles: themeDarkMode ? { color: 'lightblue' } : { color: 'white' }, // Additional TRL option; inline styles.
         // keepMinimized: true,                         // When true the header button remains when app is minimized.

         // The button data can be modified and reactive updates occur after the function completes.
         onPress: ({ button }) =>
         {
            const newThemeDarkMode = storage.swapItemBoolean(sessionConstants.themeDarkMode);

            button.title = newThemeDarkMode ? 'Dark Node disable' : 'Dark Mode enable';
            button.styles = newThemeDarkMode ? { color: 'lightblue' } : { color: 'white' };
         }

         /**
          * There are several additional button data options available in TRL.
          */
         // keyCode: 'Space',                   // You can provide an alternate key code for button key press.
         // onContextMenu: ({ button, event })  // You can define `onContextMenu` for right click / contextmenu key press.
         // {
         //    console.log(`HeaderButtons - onContextMenu`);
         // },
      });

      // You can set the `svelte` attribute to a TJSSvelte.Config.Embed object to load a Svelte component.
      buttons.unshift({
         svelte: {
            class: TestSCComponent,
            props: {
               // Changes the label text in TestSCComponent demonstrating passing in props.
               // If you comment it out 'Demo' or the default label is shown.
               label: 'SC'
            }
         }
      });

      buttons.unshift({
         svelte: {
            class: ProgressBar
         }
      });

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
