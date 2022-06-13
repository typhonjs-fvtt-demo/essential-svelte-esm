import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import SessionAppShell        from './SessionAppShell.svelte';

export default class PositionSessionApp extends SvelteApplication
{
   constructor(options)
   {
      super(options);

      try
      {
         // Attempt to parse session storage item and set to Position.
         this.position = JSON.parse(sessionStorage.getItem('essential-svelte-esm.position'));
      }
      catch (err) { /**/ }
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'position-session-storage',
         title: 'Position (Reload / Session Storage)',
         width: 'auto',
         height: 'auto',

         svelte: {
            class: SessionAppShell,
            target: document.body,
         }
      });
   }
}