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
         id: 'position-esm',
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
      }, { headerButtonNoClose: true, width: 500 }).render(true, { focus: true });
   }
}