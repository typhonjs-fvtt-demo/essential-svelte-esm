import MenuItem from './MenuItem.svelte';

/**
 * Creates the items for the overflow menu via `TJSMenu` component.
 *
 * Pass in additional state or access it globally to provide conditional menu items. In this case when the `application`
 * is passed into `createMenuItems` an extra menu item to control always on top state is added.
 *
 * @param {object} [options] - Conditional options for extra menu items.
 *
 * @param {import('#runtime/svelte/application').SvelteApp} [options.application] - Used to add additional
 *        `always on top` app state menu item.
 *
 * @param {boolean} [options.trailingHR] - When true and `application` defined add a trailing HR to separate demo
 *        slotted menu item in `MenuBar.svelte`.
 *
 * @returns {Iterable<import('#standard/component/menu').TJSMenuData.Items>} Overflow menu items.
 */
export function createMenuItems({ application, trailingHR = false } = {})
{
   /**
    * @type {import('#standard/component/menu').TJSMenuData.Items[]}
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
         onPress: () => console.log(`Item 4 pressed`)
      },

      // You can provide a custom Svelte component as a menu item.
      {
         svelte: {
            class: MenuItem,
            props: { message: 'Item 5 (Svelte Comp)' }
         },
         onPress: () => console.log(`Item 5 pressed`)
      }
   ];

   /**
    * Conditionally add control over the `alwaysOnTop` state only when the application reference is passed into
    * `createMenuItems`.
    */
   if (application)
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

   if (application && trailingHR)
   {
      items.push({ separator: 'hr' });
   }

   return items;
}
