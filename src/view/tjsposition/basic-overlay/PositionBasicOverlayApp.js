import { SvelteApp } from '#runtime/svelte/application';
import { deepMerge } from '#runtime/util/object';

import Overlay       from './Overlay.svelte';

export class PositionBasicOverlayApp extends SvelteApp
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
         id: 'position-basic-overlay',
         classes: ['tjs-essential-svelte-esm', 'themed'], // Include `themed` for global dark / light theming.
         // classes: ['tjs-essential-svelte-esm'], // No theme applied.
         width: 300,
         height: 300,

         svelte: {
            class: Overlay,
            target: document.body
         }
      });
   }
}
