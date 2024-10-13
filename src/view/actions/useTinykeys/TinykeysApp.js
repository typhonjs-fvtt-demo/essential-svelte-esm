import { SvelteApplication }  from '#runtime/svelte/application';

import TinykeysAppShell       from './TinykeysAppShell.svelte';

export default class TinykeysApp extends SvelteApplication
{
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-actions-tinykeys',
         classes: ['tjs-essential-svelte-esm'],
         title: 'EssentialESM.apps.use-tinykeys.title',
         height: '200px',
         width: '400px',

         svelte: {
            class: TinykeysAppShell,
            target: document.body
         }
      });
   }
}
