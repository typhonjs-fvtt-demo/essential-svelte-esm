import { TJSDialog }       from '#runtime/svelte/application';

import MenuItem            from './MenuItem.svelte';

/** 
 * @import { SvelteApp }   from '#runtime/svelte/application';
 * 
 * @import { TJSMenuData } from '#standard/component/menu';
 */

/**
 * Creates the items for all menus via `TJSMenu` or `TJSContextMenu` components.
 *
 * Pass in additional state or access it globally to provide conditional menu items. In this case when the `application`
 * is passed into `createMenuItems` an extra menu item to control always on top state is added.
 *
 * @param {object} [options] - Conditional options for extra menu items.
 *
 * @param {SvelteApp} [options.application] - Used to add additional `always on top` app state menu item when
 *        `application` reference present.
 *
 * @param {boolean} [options.trailingHR] - When true and `application` defined add a trailing HR to separate demo
 *        slotted menu item in `MenuBar.svelte`. `TJSMenu` allows additional menu items to be defined by slots.
 *
 * @returns {Iterable<TJSMenuData.Items>} Menu items.
 */
export function createMenuItems({ application, trailingHR = false } = {})
{
   /**
    * @type {TJSMenuData.Items[]}
    */
   const items = [
      {
         label: 'Item 1 (Font)',
         icon: 'fas fa-code',
         onPress: () => console.log(`Item 1 pressed`)
      },

      {
         label: 'Item 2 (GM Only)',
         icon: 'fas fa-folder',
         condition: () => game.user.isGM,
         onPress: () => console.log(`Item 2 pressed`)
      },

      {
         label: 'Item 3 (SVG)',
         icon: `modules/essential-svelte-esm/assets/svg/alien-icon.svg`,
         onPress: () => console.log(`Item 3 pressed`)
      },

      {
         label: 'Item 4 (Image)',
         icon: `icons/magic/air/air-burst-spiral-blue-gray.webp`,

         // An async example that doesn't defer focus resolution as `console.log` has a `void` return value.
         onPress: async () => console.log(`Item 4 pressed`)
      },

      // You can provide a custom Svelte component as a menu item.
      {
         svelte: {
            class: MenuItem,
            props: { message: 'Item 5 (Svelte Comp)' }
         },
         onPress: () => console.log(`Item 5 pressed`)
      },

      /**
       * An example of focus chaining. This menu item launches a modal dialog and after it is closed the
       * originating component / element is focused. All TRL standard library callbacks receive the originating event
       * and `focusSource` which is an `A11yFocusSource` data object. `SvelteApp` can receive an `A11yFocusSource`
       * data object which will be the focus source when the app or in this case dialog closes.
       */
      {
         label: 'Focus Chaining',
         icon: `fas fa-window-restore`,
         onPress: async ({ focusSource }) =>
         {
            // Pass `focusSource` as the SvelteApp option.
            const result = await TJSDialog.prompt({
               modal: true,
               draggable: false,
               minimizable: false,
               label: 'Ok',
               title: 'Focus Chaining Example',
               content: 'Notice that the source button or element that created the menu ' +
                'becomes the active element / focused when the modal dialog is closed.',
               onOk: () => true
            }, { focusSource });

            console.log(`Modal dialog result: ${!!result}`);

            // While not explicitly necessary in most cases returning `true` indicates that focus continuation
            // resolution will be handled and the originating menu will skip applying automatic focus resolution.
            return true;
         }
      }
   ];

   /**
    * Conditionally add control over the `alwaysOnTop` state only when the application reference is passed into
    * `createMenuItems` and the app window is not detached / popped out.
    */
   if (application && !application.reactive.detached)
   {
      const alwaysOnTop = application.reactive.alwaysOnTop;

      items.push({ separator: 'hr' });

      // Change Font Awesome icon based on current state.
      items.push({
         label: 'Always On Top',
         icon: `fas fa-arrow-alt-circle-${alwaysOnTop ? 'down' : 'up'}`,
         onPress: () => application.reactive.alwaysOnTop = !alwaysOnTop
      });
   }

   if (trailingHR)
   {
      items.push({ separator: 'hr' });
   }

   return items;
}
