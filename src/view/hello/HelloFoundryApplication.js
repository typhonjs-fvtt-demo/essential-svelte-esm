import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

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
         positionOrtho: false,
         transformOrigin: null,

         svelte: {
            class: HelloFoundryAppShell,
            target: document.body,
            intro: true,
            props: {
               message: 'Foundry'
            }
         }
      });
   }
}