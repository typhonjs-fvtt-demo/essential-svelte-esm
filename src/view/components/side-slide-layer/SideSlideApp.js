import { SvelteApplication }  from '#runtime/svelte/application';

import { TJSSideSlideLayer }  from '#standard/component';

import SideSlideAppShell      from './SideSlideAppShell.svelte';

import { createLayerProps }   from './createLayerProps.js';

export default class SideSlideApp extends SvelteApplication
{
   #sidebarSlideLayer;

   /**
    * @param {import('#runtime/svelte/application').SvelteApplicationOptions} options - App options.
    */
   constructor(options)
   {
      super(options);

      // Mounts an instance of TJSSideSlideLayer to the `#ui-middle` div of the Foundry UI to "dock" it next to the
      // Foundry sidebar. This component will stay active after this app has been closed.
      this.#sidebarSlideLayer = new TJSSideSlideLayer({
         target: document.querySelector('#ui-middle'),
         props: createLayerProps()
      });
   }

   /**
    * @returns {TJSSideSlideLayer} The side slide layer attached to the Foundry sidebar.
    */
   get sidebarSlideLayer()
   {
      return this.#sidebarSlideLayer;
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-side-slide-layer-esm',
         title: 'Side Slide Layer',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 500,
         height: 450,

         svelte: {
            class: SideSlideAppShell,
            target: document.body,
         }
      });
   }
}
