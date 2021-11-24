import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import BasicAppShell          from './BasicAppShell.svelte';

export default class BasicApplication extends SvelteApplication
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
         id: 'template-svelte-esm',
         resizable: true,
         minimizable: true,
         width: 500,
         height: 320,
         title: 'Template Svelte (ESM)',

         svelte: {
            class: BasicAppShell,
            target: document.body,
            intro: true,
            props: {
               message: 'Foundry'
            }
         }
      });
   }
}