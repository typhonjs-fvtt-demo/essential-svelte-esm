import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import HelloFoundryAppShell   from './HelloFoundryAppShell.svelte';

export class HelloFoundryApplication extends SvelteApp
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
         id: 'hello-foundry-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 500,
         height: 'auto',
         title: 'Essential Svelte (ESM) - Hello Foundry',

         svelte: {
            class: HelloFoundryAppShell,
            target: document.body,
            intro: true,
            props: {
               message: 'Foundry'   // A prop passed to HelloFoundryAppShell for the initial message displayed.
            }
         }
      });
   }
}
