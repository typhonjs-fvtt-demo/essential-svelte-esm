import { writable }        from 'svelte/store';

import { easingList }      from '#runtime/svelte/easing';
import { propertyStore }   from '#runtime/svelte/store/writable-derived';

import { rippleFocus }     from '#standard/action/animate/composable';

import { gameSettings }    from '#gameSettings';

import {
   constants,
   settings }              from '#constants';

/**
 * So, what is all of this below?
 *
 * This demo registers a world setting as an object defining the props to `TJSSideSlideLayer`. Individual derived
 * property stores are created from the world setting store to interactively change prop values. These derived stores
 * must be created in the application scope and not internally to the Svelte component or the loading process. While
 * it is safe to access individual world setting stores from `gameSettings.getStore` inside Svelte components it
 * is not safe to derive stores from a world scoped setting inside Svelte as the derived stores are associated with an
 * external source. If you do that the derived stores repeatedly get created each time the main app is rendered and are
 * retained.
 *
 * The solution is to create the derived `propertyStore` reference in the app scope as done below and associate
 * the stores via a `context` passed into the Svelte component / app shell.
 */
export class SideSlideContext
{
   constructor()
   {
      /**
       * Register a world game setting w/ TJSGameSettings. This makes a world object store available to store
       * TJSSideSlideLayer props. See `#createStores` where further `propertyStores` are created for individual
       * properties.
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
               allowLocking: true,  // Allow locking panels.
               clickToOpen: false,  // Click to open panel.
               duration: 200,       // Time in milliseconds to slide out.
               easingIn: 'linear',  // The name of a Svelte easing function.
               easingOut: 'linear', // The name of a Svelte easing function.
               top: 0,              // Numbers are treated as pixels unless `topUnit` defined.
            },
            type: Object
         }
      });

      /** @type {import('./types').External['stores']} */
      this.stores = this.#createStores();

      /** @type {import('./types').External['inputs']} */
      this.inputs = this.#createInputs(this.stores);

      Object.seal(this);
   }

   /**
    * Creates the `input` prop data for all TJSInput components used in the modification UI.
    *
    * @param {import('./types').External['stores']} stores -
    *
    * @returns {import('./types').External['inputs']} The `input` prop data for `TJSInput`.
    */
   #createInputs(stores)
   {
      // The stores are persisted to a world game setting which is only accessible to GM level users. All UI inputs will be
      // disabled for non-GM users.
      const enabled = globalThis.game.user.isGM;

      const efx = rippleFocus();

      return {
         allowLocking: {
            type: 'checkbox',
            label: 'Allow locking:',
            store: stores.allowLocking,
            enabled
         },

         clickToOpen: {
            type: 'checkbox',
            label: 'Click to open:',
            store: stores.clickToOpen,
            enabled
         },

         duration: {
            efxNumber: efx,
            type: 'range-number',
            label: 'Duration (ms):',
            min: 200,
            max: 1000,
            readonly: true,
            store: stores.duration,
            enabled
         },

         easingIn: {
            efx,
            type: 'select',
            label: 'Easing In:',
            options: easingList.map((key) => ({ value: key, label: key })),
            store: stores.easingIn,
            enabled
         },

         easingOut: {
            efx,
            type: 'select',
            label: 'Easing Out:',
            options: easingList.map((key) => ({ value: key, label: key })),
            store: stores.easingOut,
            enabled
         },

         side: {
            efx,
            type: 'select',
            label: 'Side:',
            options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }],
            store: stores.side,
            enabled
         },

         top: {
            efxNumber: efx,
            type: 'range-number',
            label: 'Top (vertical position):',
            min: 0,
            max: 215,
            readonly: true,
            store: stores.top,
            enabled
         }
      };
   }

   /**
    * @returns {import('./types').External['stores']} The property stores that are persisted to Foundry game settings.
    */
   #createStores()
   {
      // Retrieves the single world object storing all prop parameters for the side slide layer.
      const worldObject = gameSettings.getStore(settings.sideSlideLayer);

      return {
         // These properties are serialized in the world object setting store and shared between `SideSlideAppShell.svelte`
         // and the separate instance of `TJSSideSlideLayer` mounted to the Foundry sidebar.
         allowLocking: propertyStore(worldObject, 'allowLocking'),
         clickToOpen: propertyStore(worldObject, 'clickToOpen'),
         duration: propertyStore(worldObject, 'duration'),
         easingIn: propertyStore(worldObject, 'easingIn'),
         easingOut: propertyStore(worldObject, 'easingOut'),
         top: propertyStore(worldObject, 'top'),

         // Not persisted to the world object store. Used in `SideSlideAppShell.svelte` to swap sides in the app only.
         side: writable('right')
      };
   }
}
