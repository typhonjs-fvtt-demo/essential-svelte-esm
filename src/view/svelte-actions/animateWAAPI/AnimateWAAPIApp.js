import { SvelteApplication }  from '#runtime/svelte/application';

import AnimateWAAPIAppShell   from './AnimateWAAPIAppShell.svelte';

export class AnimateWAAPIApp extends SvelteApplication
{
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-actions-animate-waapi',
         classes: ['tjs-essential-svelte-esm'],
         title: 'EssentialESM.apps.actions.animate-waapi.title',
         height: 'auto',
         width: '400px',

         svelte: {
            class: AnimateWAAPIAppShell,
            target: document.body
         }
      });
   }
}
