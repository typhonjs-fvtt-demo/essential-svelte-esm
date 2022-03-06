import { SvelteApplication }     from '@typhonjs-fvtt/runtime/svelte/application';

import MenuAppShell              from './MenuAppShell.svelte';

import HelloFoundryApplication   from './hello/HelloFoundryApplication.js';
import PositionApplication       from './position/PositionApplication.js';

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
         id: 'essential-svelte-esm',
         headerButtonNoClose: true,
         resizable: false,
         minimizable: true,
         popOut: false,
         width: 200,
         height: 'auto',
         title: 'EssentialESM.title',

         svelte: {
            class: MenuAppShell,
            target: document.body,
            intro: true,
            props: {
               buttons: [
                  { title: 'Hello Foundry', class: HelloFoundryApplication },
                  { title: 'Position', class: PositionApplication }
               ]
            }
         }
      });
   }
}