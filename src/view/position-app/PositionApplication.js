import {
   SvelteApplication,
   TJSDialog }             from '@typhonjs-fvtt/runtime/svelte/application';

import PositionAppShell    from './PositionAppShell.svelte';
import DialogContent       from './DialogContent.svelte';

export default class PositionApplication extends SvelteApplication
{
   /** @type {Application} */
   #dialog;

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
      }, { headerButtonNoClose: true }).render(true, { focus: true });
   }
}