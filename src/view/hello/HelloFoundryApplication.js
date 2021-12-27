import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import HelloFoundryAppShell   from './HelloFoundryAppShell.svelte';

export default class HelloFoundryApplication extends SvelteApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {}) { super(options); }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'hello-foundry-esm',
         resizable: true,
         minimizable: true,
         width: 500,
         height: 320,
         title: 'Template Svelte (ESM) - Hello Foundry',

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