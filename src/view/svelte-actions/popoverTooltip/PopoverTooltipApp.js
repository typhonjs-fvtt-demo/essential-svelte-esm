import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import PopoverTooltipAppShell from './PopoverTooltipAppShell.svelte';

export class PopoverTooltipApp extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'tjs-popover-tooltip-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         minimizable: true,
         width: 800,
         height: 'auto',

         // You may provide an explicit app theme override as an app option; `dark` or `light`.
         // themeName: 'light',

         title: 'EssentialESM.apps.actions.popover-tooltip.title',

         svelte: {
            class: PopoverTooltipAppShell,
            target: document.body
         }
      });
   }
}
