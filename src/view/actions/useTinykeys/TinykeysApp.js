import { SvelteApplication }  from '#runtime/svelte/application';

import TinykeysAppShell       from './TinykeysAppShell.svelte';

export default class TinykeysApp extends SvelteApplication
{
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-actions-tinykeys',
         classes: ['tjs-essential-svelte-esm'],
         title: 'Tinykeys Demo',
         resizable: true,
         height: '200px',
         width: '300px',

         svelte: {
            class: TinykeysAppShell,
            target: document.body,
         }
      });
   }
}
