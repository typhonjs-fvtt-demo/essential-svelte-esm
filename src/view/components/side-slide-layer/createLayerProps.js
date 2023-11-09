import {
   CurrentTargetPanel,
   DummyPanel } from './panels';

/**
 * @returns {object} The props for TJSSideSlideLayer
 */
export function createLayerProps()
{
   return {
      side: 'right',
      top: '40px',
      zIndex: 10,
      // duration: 1000,
      // stayOpen: true,

      styles: {
         /* Applies the color used for the sidebar */
         '--tjs-side-slide-layer-item-border-color-hover': 'var(--color-border-highlight-alt)',

         /* Make the item icons / font larger */
         // '--tjs-side-slide-layer-item-diameter': '50px',
         // '--tjs-side-slide-layer-item-font-size': '20px'
      },

      items: [
         {
            condition: () => game.user.isGM,
            icon: 'fas fa-crosshairs-simple',
            svelte: { class: CurrentTargetPanel },
            title: 'Current Targets'
         },
         {
            icon: 'fas fa-face-sad-cry',
            svelte: { class: DummyPanel },
            title: 'Dummy Panel'
         }
      ]
   };
}
