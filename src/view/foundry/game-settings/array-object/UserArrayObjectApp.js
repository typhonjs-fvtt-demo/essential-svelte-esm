import { SvelteApp }       from '#runtime/svelte/application';
import { deepMerge }       from '#runtime/util/object';

import ArrayObjectAppShell from './common/ArrayObjectAppShell.svelte';

import { ItemArrayStores } from "#itemArrayStores";

export class UserArrayObjectApp extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(SvelteApp.defaultOptions, {
         id: 'tjs-items-user-setting-esm',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         minimizable: true,
         width: 800,
         height: 'auto',

         title: 'EssentialESM.apps.foundry.settings.user.title',

         svelte: {
            class: ArrayObjectAppShell,
            target: document.body,
            context: {
               canEdit: ItemArrayStores.canEdit('user'),
               itemStore: ItemArrayStores.get('user')
            },
            props: {
               description: 'User testing'
            }
         }
      });
   }
}
