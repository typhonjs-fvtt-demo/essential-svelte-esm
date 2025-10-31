import { SvelteApp }          from '#runtime/svelte/application';
import { deepMerge }          from '#runtime/util/object';

import { TJSSideSlideLayer }  from '#standard/component/layer/side-slide';

import SideSlideAppShell      from './SideSlideAppShell.svelte';

import { createLayerProps }   from './createLayerProps.js';
import { SideSlideContext }   from './SideSlideContext.js';

import {
   constants,
   settings }                 from '#constants';

import { gameSettings }       from '#gameSettings';

export class SideSlideApp extends SvelteApp
{
   #context;

   /**
    * Stores the TJSSideSlideLayer instance that is mounted to `#ui-middle`.
    */
   #sidebarSlideLayer;

   /**
    */
   constructor()
   {
      super();

      this.#context = new SideSlideContext();

      // Mounts an instance of TJSSideSlideLayer to the `#ui-middle` div of the Foundry UI to "dock" it next to the
      // Foundry sidebar. This component will stay active after this app has been closed.
      this.#sidebarSlideLayer = new TJSSideSlideLayer({
         target: document.querySelector('#ui-right #sidebar menu'),
         props: createLayerProps({ relative: true, sideAbs: false, tooltips: false })
      });

      // Associate and update the shared world object storing all TJSSideSlideLayer props to the sidebar mounted
      // component. This is accomplished to subscribing to the world object store, but to avoid using `get` from
      // `svelte/store` the configuration object is retrieved from the Foundry settings API on changes.
      const worldObject = gameSettings.getStore(settings.sideSlideLayer);
      worldObject.subscribe(() => this.#sidebarSlideLayer.$set(
       game.settings.get(constants.moduleId, settings.sideSlideLayer)));
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
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'trl-side-slide-layer-esm',
         title: 'EssentialESM.apps.components.side-slide-layer.title',
         classes: ['tjs-essential-svelte-esm'],
         resizable: false,
         width: 500,
         height: 'auto',

         svelte: {
            class: SideSlideAppShell,
            target: document.body,

            /**
             * @this {SideSlideApp}
             *
             * @returns {object} SideSlide context.
             */
            context: function() { return this.#context; }
         }
      });
   }
}
