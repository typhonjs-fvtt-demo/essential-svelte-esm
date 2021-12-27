import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import ZIndexAppShell         from './ZIndexAppShell.svelte';

export default class ZIndexApplication extends SvelteApplication
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
         id: 'z-index-esm',
         resizable: true,
         minimizable: true,
         width: 500,
         height: 225,
         title: 'Template Svelte (ESM) - Z-Index',

         svelte: {
            class: ZIndexAppShell,
            target: document.body,
            intro: true,
            props: {
               message: 'Foundry'
            }
         }
      });
   }

   onSvelteMount()
   {
   }
}