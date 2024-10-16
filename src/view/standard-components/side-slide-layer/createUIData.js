import { writable }        from 'svelte/store';

import { easingList }      from '#runtime/svelte/easing';
import { propertyStore }   from '#runtime/svelte/store/writable-derived';

import { rippleFocus }     from '#standard/action/animate/composable/ripple';

import { settings }        from '#constants';
import { gameSettings }    from '#gameSettings';

/**
 * Creates the data for the side slide modification UI.
 *
 * @returns {({
 *    stores: Record<string, import('svelte/store').Writable>,
 *    inputs: Record<string, object>
 * })} The property stores that are persisted to Foundry game settings and input data for TJSIInput.
 */
export function createUIData()
{
   const stores = createStores();
   const inputs = createInputs(stores);

   return { stores, inputs };
}

/**
 * @returns {Record<string, import('svelte/store').Writable>} The property stores that are persisted to Foundry game
 *          settings.
 */
function createStores()
{
   // Retrieves the single world object storing all prop parameters for the side slide layer.
   const worldObject = gameSettings.getStore(settings.sideSlideLayer);

   return {
      allowLocking: propertyStore(worldObject, 'allowLocking'),
      clickToOpen: propertyStore(worldObject, 'clickToOpen'),
      duration: propertyStore(worldObject, 'duration'),
      easingIn: propertyStore(worldObject, 'easingIn'),
      easingOut: propertyStore(worldObject, 'easingOut'),
      side: writable('right'),   // Not persisted to the world object store.
      top: propertyStore(worldObject, 'top'),
      worldObject                // Include the world object store as this is applied to the Foundry sidebar instance.
   };
}

/**
 * Creates the `input` prop data for all TJSInput components used in the modification UI.
 *
 * @param {Record<string, import('svelte/store').Writable>} stores -
 *
 * @returns {Record<string, object>} The `input` prop data for `TJSInput`.
 */
function createInputs(stores)
{
   // The stores are persisted to a world game setting which is only accessible to GM level users. All UI inputs will be
   // disabled for non-GM users.
   const disabled = !game.user.isGM;

   const efx = rippleFocus();

   return {
      allowLocking: {
         type: 'checkbox',
         label: 'Allow locking:',
         store: stores.allowLocking,
         disabled
      },

      clickToOpen: {
         type: 'checkbox',
         label: 'Click to open:',
         store: stores.clickToOpen,
         disabled
      },

      duration: {
         efx,
         type: 'range',
         label: 'Duration:',
         min: 200,
         max: 1000,
         store: stores.duration,
         disabled
      },

      easingIn: {
         efx,
         type: 'select',
         label: 'Easing In:',
         options: easingList.map((key) => ({ value: key, label: key })),
         store: stores.easingIn,
         disabled
      },

      easingOut: {
         efx,
         type: 'select',
         label: 'Easing Out:',
         options: easingList.map((key) => ({ value: key, label: key })),
         store: stores.easingOut,
         disabled
      },

      side: {
         efx,
         type: 'select',
         label: 'Side:',
         options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }],
         store: stores.side,
         disabled
      },

      top: {
         efx,
         type: 'range',
         label: 'Top (vertical position):',
         min: 40,
         max: 250,
         store: stores.top,
         disabled
      }
   };
}
