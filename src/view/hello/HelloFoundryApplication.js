import { SvelteApplication }  from '#runtime/svelte/application';

import HelloFoundryAppShell   from './HelloFoundryAppShell.svelte';

export class HelloFoundryApplication extends SvelteApplication
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
