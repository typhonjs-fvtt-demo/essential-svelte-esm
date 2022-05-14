import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import PositionAppShell       from './PositionAppShell.svelte';

export default class PosDraggableApplication extends SvelteApplication
{
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
         id: 'position-app-draggable-esm',
         resizable: true,
         minimizable: true,
         width: 450,
         height: 'auto',
         title: 'Essential Svelte (ESM) - Position Draggable',

         svelte: {
            class: PositionAppShell,
            target: document.body,
            intro: true
         }
      });
   }
}