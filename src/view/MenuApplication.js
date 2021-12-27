import { SvelteApplication }     from '@typhonjs-fvtt/runtime/svelte/application';

import MenuAppShell              from './MenuAppShell.svelte';

import HelloFoundryApplication   from './hello/HelloFoundryApplication.js';
import ZIndexApplication         from './z-index/ZIndexApplication.js';

export default class MenuApplication extends SvelteApplication
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
         id: 'menu-app-esm',
         headerButtonNoClose: true,
         resizable: false,
         minimizable: true,
         popOut: false,
         width: 200,
         height: 'auto',
         title: 'Template Svelte (ESM)',

         svelte: {
            class: MenuAppShell,
            target: document.body,
            intro: true,
            props: {
               buttons: [
                  { title: 'Hello Foundry', class: HelloFoundryApplication },
                  { title: 'Z-Index', class: ZIndexApplication }
               ]
            }
         }
      });
   }
}