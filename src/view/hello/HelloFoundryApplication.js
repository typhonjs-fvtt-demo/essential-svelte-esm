import { SvelteApplication }  from '#runtime/svelte/application';

import HelloFoundryAppShell   from './HelloFoundryAppShell.svelte';

export default class HelloFoundryApplication extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'hello-foundry-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 500,
         height: 320,
         title: 'Essential Svelte (ESM) - Hello Foundry',

         // Note: Setting the following options disables the optimized position system and removes the default transform
         // origin allowing the Svelte transition assigned in `HelloFoundryAppShell.svelte` to control the intro / outro
         // transitions of the app window. This is only useful to enable the Svelte transition system.
         positionOrtho: false,
         transformOrigin: null,

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