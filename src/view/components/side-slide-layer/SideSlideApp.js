import { SvelteApplication }  from '#runtime/svelte/application';

import { TJSSideSlideLayer }  from '#standard/component/layer';

import SideSlideAppShell      from './SideSlideAppShell.svelte';

import { createLayerProps }   from './createLayerProps.js';

import {
   constants,
   settings }                 from '#constants';

import { gameSettings }       from '#gameSettings';

export default class SideSlideApp extends SvelteApplication
{
   /**
    * Stores the TJSSideSlideLayer instance that is mounted to `#ui-middle`.
    */
   #sidebarSlideLayer;

   /**
    * @param {import('#runtime/svelte/application').SvelteApplicationOptions} options - App options.
    */
   constructor(options)
   {
      super(options);

      /**
       * Register a world game setting w/ TJSGameSettings. This makes a world object store available to store
       * TJSSideSlideLayer props. See * {@link createUIData} / `createStores` where further `propertyStores` are
       * created for individual properties.
       *
       * The default values below are included so that the modification UI initializes with correct data for the first
       * time executed.
       */
      gameSettings.register({
         namespace: constants.moduleId,
         key: settings.sideSlideLayer,
         options: {
            scope: 'world',
            config: false,
            default: {
               top: 40,             // Numbers are treated as pixels unless `topUnit` defined / otherwise valid `top` CSS string.
               easingIn: 'linear',  // The name of a Svelte easing function.
               easingOut: 'linear', // The name of a Svelte easing function.
            },
            type: Object
         }
      });

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
         title: 'EssentialESM.apps.side-slide-layer.title',
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
