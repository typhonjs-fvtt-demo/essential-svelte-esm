import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import ProseMirrorShell       from './ProseMirrorShell.svelte';

export default class ProseMirrorApp extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'tjs-prose-mirror',
         title: 'TJSProseMirror',
         resizable: true,
         width: 550,
         height: 300,

         svelte: {
            class: ProseMirrorShell,
            target: document.body,
         }
      });
   }
}