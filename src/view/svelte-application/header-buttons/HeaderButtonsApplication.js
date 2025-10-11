import { SvelteApp }          from '#runtime/svelte/application';
import { ThemeObserver }      from '#runtime/util/dom/theme';
import { deepMerge }          from '#runtime/util/object';

import HeaderButtonsAppShell  from './HeaderButtonsAppShell.svelte';
import TestSCComponent        from './TestSCComponent.svelte';
import ProgressBar            from './ProgressBar.svelte';

import { sessionConstants }   from '#constants';

export class HeaderButtonsApplication extends SvelteApp
{
   constructor(options)
   {
      super(options);

      // Initialize the session storage state to the current platform theme dark state if not already set.
      const themeDarkMode = this.reactive.sessionStorage.getItem(sessionConstants.themeDarkMode,
       ThemeObserver.isTheme('dark'));

      // Set explicit app theme based on current session storage state.
      this.reactive.themeName = themeDarkMode ? 'dark' : 'light';
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
         id: 'header-buttons-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         title: 'Essential Svelte (ESM) - Header Buttons',
         headerIcon: 'icons/magic/air/air-burst-spiral-blue-gray.webp', // Supports common image formats and SVG.
         // headerIcon: 'fas fa-cogs',    // You may also use a Font Awesome icon.
         // headerIcon: 'modules/essential-svelte-esm/assets/svg/alien-icon.svg',   // You may also use SVG.
         width: 600,
         height: 200,

         // TRL supports programmatic setting of max / min height & width.
         maxHeight: 200,
         minHeight: 200,
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
    * - {string}     label - A tooltip to display when hovered.
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
      const themeDarkMode = storage.getItem(sessionConstants.themeDarkMode);

      buttons.unshift({
         class: 'theme-dark', // You can add a class
         icon: 'fas fa-moon',
         label: themeDarkMode ? 'Light Theme' : 'Dark Theme',     // Additional TRL option; sets tooltip.
         styles: themeDarkMode ? { color: 'lightblue' } : { color: 'white' }, // Additional TRL option; inline styles.
         // keepMinimized: true,                         // When true the header button remains when app is minimized.

         // The button data can be modified and reactive updates occur after the function completes.
         onPress: ({ button }) =>
         {
            const newThemeDarkMode = storage.swapItemBoolean(sessionConstants.themeDarkMode);

            // Reactive control over local app theme by theme name.
            this.reactive.themeName = newThemeDarkMode ? 'dark' : 'light';

            button.label = newThemeDarkMode ? 'Light Theme' : 'Dark Theme';
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

      // You can use an image for the icon.
      buttons.unshift({
         icon: 'icons/vtt.png',
         label: 'Image icon',
      });

      // You can use SVG for the icon.
      buttons.unshift({
         icon: 'modules/essential-svelte-esm/assets/svg/alien-icon.svg',
         label: 'SVG icon',
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
         label: 'Left aligned',
         alignLeft: true,
      });

      return buttons;
   }
}
