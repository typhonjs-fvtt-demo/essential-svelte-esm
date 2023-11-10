import {
   CurrentTargetPanel,
   DummyPanel } from './panels';

/**
 * @returns {object} The props for TJSSideSlideLayer
 */
export function createLayerProps()
{
   return {
      side: 'right',    // 'right' or 'left'
      top: '40px',      // Numbers are treated as pixels / otherwise valid `top` CSS string like '50%'.
      zIndex: 10,       // z-index to display the layer. This is above the canvas and below the app UI layer.

      // clickToOpen: true,
      // duration: 1000,
      // easingIn: linear, // A Svelte easing function.
      // easingOut: linear, // A Svelte easing function.

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
            icon: 'fas fa-crosshairs-simple',      // Font awesome icon.
            svelte: { class: CurrentTargetPanel }, // A Svelte configuration object for the panel.
            title: 'Current Targets'               // Optional title / tooltip.
         },
         {
            icon: 'fas fa-face-sad-cry',
            svelte: { class: DummyPanel },
            title: 'Dummy Panel'
         },
         {
            condition: () => game.user.isGM,
            icon: 'fas fa-file',
            svelte: { class: CurrentTargetPanel },
            title: 'Current Targets'
         }
      ]
   };
}
