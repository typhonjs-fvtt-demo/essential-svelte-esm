import { writable }        from 'svelte/store';

import {
   SvelteApplication,
   TJSDialog }             from '#runtime/svelte/application';

import PositionAppShell    from './PositionAppShell.svelte';
import DialogContent       from './dialog/DialogContent.svelte';

export class PositionApplication extends SvelteApplication
{
   /** @type {TJSDialog} */
   #dialog;

   /**
    * Provides a store to enable / disable debug mode which overlays the transform bounding box.
    *
    * @type {import('svelte/store').Writable<boolean>}
    */
   #storeDebug = writable(false);

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-app-position-esm',
         classes: ['tjs-essential-svelte-esm'],
         title: 'App Position / Animation',
         resizable: true,
         minimizable: true,
         width: 450,
         height: 225,

         svelte: {
            class: PositionAppShell,
            target: document.body,
            intro: true
         }
      });
   }

   get storeDebug() { return this.#storeDebug; }

   /** @inheritDoc */
   async close(options)
   {
      this.#dialog.close();
      return super.close(options);
   }

   onSvelteMount()
   {
      // Offset dialog from current position.
      const top = this.position.top + this.position.height + 10;

      this.#dialog = new TJSDialog({
         title: 'Adjust Position',
         content: {
            class: DialogContent,
            props: { application: this }
         }
      }, {
         classes: ['tjs-essential-svelte-esm'],
         headerButtonNoClose: true,
         width: 500,
         top
      }).render(true, { focus: true });
   }
}
