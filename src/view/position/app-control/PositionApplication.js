import { writable }        from 'svelte/store';

import {
   SvelteApplication,
   TJSDialog }             from '@typhonjs-fvtt/runtime/svelte/application';

import PositionAppShell    from './PositionAppShell.svelte';
import DialogContent       from './dialog/DialogContent.svelte';

export default class PositionApplication extends SvelteApplication
{
   /** @type {Application} */
   #dialog;

   /**
    * Provides a store to enable / disable debug mode which overlays the transform bounding box.
    *
    * @type {Writable<boolean>}
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
         id: 'position-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: true,
         minimizable: true,
         width: 450,
         height: 250,
         title: 'Essential Svelte (ESM) - Position',

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
      this.#dialog = new TJSDialog({
         title: 'Adjust Position',
         content: {
            class: DialogContent,
            props: { application: this }
         }
      }, {
         classes: ['tjs-essential-svelte-esm'],
         headerButtonNoClose: true,
         width: 500
      }).render(true, { focus: true });
   }
}