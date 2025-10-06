import { writable }        from 'svelte/store';

import {
   SvelteApp,
   TJSDialog }             from '#runtime/svelte/application';

import { deepMerge }       from '#runtime/util/object';

import PositionAppShell    from './PositionAppShell.svelte';
import DialogContent       from './dialog/DialogContent.svelte';

export class PositionApplication extends SvelteApp
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
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'trl-app-position-esm',
         classes: ['tjs-essential-svelte-esm'],
         title: 'App Position / Animation',
         resizable: true,
         minimizable: true,
         width: 475,
         height: 260,
         popOutModuleDisable: true,    // Disable `PopOut!` module.

         svelte: {
            class: PositionAppShell,
            target: document.body,
            intro: true
         }
      });
   }

   get storeDebug() { return this.#storeDebug; }

   get dialog() { return this.#dialog; }

   /** @inheritDoc */
   async close(options)
   {
      this.#dialog?.close();
      return super.close(options);
   }

   onSvelteMount()
   {
      // Offset dialog from current position.
      const top = this.position.top + this.position.height + 10;

      /**
       * Note: With Svelte 4.2.20 it appears to mount another app / Svelte component from here must be scheduled on the
       * next macrotask otherwise _sometimes_ the dialog component is mounted / visual just prior to when final
       * positioning is updated. This is a special case.
       */
      setTimeout(() =>
      {
         this.#dialog = new TJSDialog({
            // Note: set `alwaysOnTop` to `true` to make the dialog appear over other app windows.
            alwaysOnTop: true,
            title: 'Adjust Position Dialog',
            content: {
               class: DialogContent,
               props: { application: this }
            }
         }, {
            classes: ['tjs-essential-svelte-esm'],
            headerButtonNoClose: true,
            width: 550,
            top
         }).render(true, { focus: true });
      }, 0);
   }
}
