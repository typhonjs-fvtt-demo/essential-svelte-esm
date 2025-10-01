import MenuItem from './MenuItem.svelte';

/**
 * Creates the items for the overflow menu via `TJSMenu` component.
 *
 * Pass in additional state or access it globally to provide conditional menu items.
 *
 * @returns {Iterable<import('#standard/component/menu').TJSMenuData.Items>} Overflow menu items.
 */
export function createMenuItems() // eslint-disable-line no-unused-vars
{
   return [
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

      { separator: 'hr' },

      // You can provide a custom Svelte component as a menu item.
      {
         svelte: {
            class: MenuItem,
            props: { message: 'Item 5 (Svelte Comp)' }
         },
         onPress: () => console.log(`Item 5 pressed`)
      },
   ];
}
