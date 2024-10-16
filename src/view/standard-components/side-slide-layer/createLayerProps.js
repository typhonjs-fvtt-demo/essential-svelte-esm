import { DynamicIcon }  from './icons';

import {
   CurrentTargetPanel,
   DummyPanel }         from './panels';

import {
   constants,
   settings }           from '#constants';

/**
 * Creates the constant props assigned to TJSSideSlideLayer. Note the three values assigned as `default` for the
 * world object store defined in {@link SideSlideApp}.
 *
 * @returns {object} The props for TJSSideSlideLayer. The persisted prop data from game settings is also applied.
 */
export function createLayerProps()
{
   // Existing state stored as an object that is spread at the beginning of the returned object below.
   const existingState = game.settings.get(constants.moduleId, settings.sideSlideLayer) ?? {};

   return {
      side: 'right',       // 'right' or 'left'

      // allowLocking: false,
      // clickToOpen: true,
      // duration: 1000,
      // easingIn: 'linear',  // The name of a Svelte easing function.
      // easingOut: 'linear', // The name of a Svelte easing function.
      // top: 40,             // Numbers are treated as pixels unless `topUnit` defined / otherwise valid `top` CSS string.
      // topUnit: '%',        // You may provide the CSS unit type for the `top` prop.
      // zIndex: 10,          // z-index to display the layer. This is above the canvas and below the app UI layer.

      ...existingState,       // Overrides any props that are serialized to a world setting object.

      // The following is constant state that doesn't change.

      classes: ['tjs-essential-svelte-esm'], // Adds a class to target additional styles / CSS variables to main layer element.

      // Useful to set any inline styles / CSS variables.
      styles: {
         /* Applies the color used for the sidebar */
         '--tjs-side-slide-layer-item-border-color-hover': 'var(--color-border-highlight-alt)',

         /* Make the item icons / font larger */
         // '--tjs-side-slide-layer-item-diameter': '50px',
      },

      items: [
         {
            condition: () => game.user.isGM,       // You may provide a function whether to display the item.
            icon: 'fas fa-crosshairs-simple',      // Font awesome icon _or_ a Svelte configuration object.
            svelte: { class: CurrentTargetPanel }, // A Svelte configuration object for the panel.
            title: 'Current Targets'               // Optional title / tooltip.
         },
         {
            icon: { class: DynamicIcon },          // Loads a Svelte component as item icon.
            svelte: { class: DummyPanel },
            title: 'Dummy Panel'
         }
      ]
   };
}
