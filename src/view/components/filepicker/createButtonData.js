import { writable }              from 'svelte/store';

import { ripple }                from '#standard/action/animate/composable/ripple';
import { FVTTFilePickerControl } from '#standard/application/filepicker';
import { TJSContextMenu }        from '#standard/application/menu';

/**
 * Provides a convenience function to create the button data for the file picker button components to make the
 * example easier to read. This also gives an example of defining your UI / component data separately.
 *
 * In `pickerOptions` may include any Foundry {@link ApplicationOptions} options and {@link FilePickerOptions}.
 *
 * @param {string}   idPrepend - A unique string to prepend to picker CSS IDs. Creates unique IDs between normal app
 *        version and modal demo.
 *
 * @returns {import('#standard/component/fvtt/filepicker/button').TJSFileButton.Props[]} Button data.
 */
export function createButtonData(idPrepend)
{
   // Can create a single instance of the default ripple effect action.
   const rippleInstance = ripple();

   return [
      // TJSFileButton (standard)
      {
         disabled: !FVTTFilePickerControl.canBrowse,
         efx: rippleInstance,
         title: 'Pick File',
         pickerOptions: {
            id: `${idPrepend}tjs-file-picker-demo-0`,
            store: writable(''), // You may assign a writable store to receive result changes.

            // You may pass application options and any other Foundry ApplicationOptions / FilePickerOptions.
            // top: 100, // Example: display file picker at Y = 100.

            // /**
            //  * You can set a callback to receive URL string changes.
            //  *
            //  * @param {{ urlString: string }} filepath - Newly selected url string.
            //  */
            // onURLString: ({ urlString }) => { console.log(`!! urlString: ${urlString}`); },

            // /**
            //  * You may provide a validation function to test the selected result. Return false to
            //  * reject the URL selection. Post a Foundry UI notification, etc.
            //  * Note: the example below is always true.
            //  *
            //  * @param {{ urlString: string }} urlString - URL string to validate.
            //  *
            //  * @returns {Promise<boolean>} Is validated?
            //  */
            // onValidateURLString: async ({ urlString }) => typeof urlString === 'string'
         }
      },

      // TJSFileButton (modal)
      {
         disabled: !FVTTFilePickerControl.canBrowse,
         efx: rippleInstance,
         title: 'Pick File',
         pickerOptions: {
            id: `${idPrepend}tjs-file-picker-demo-1`,
            store: writable(''),
            modal: true
         }
      },

      // TJSFileButton (standard) w/ customization
      {
         label: 'Pick File',
         icon: 'fas fa-wrench',
         disabled: !FVTTFilePickerControl.canBrowse,
         efx: ripple({ contextmenu: true }),
         onContextMenu: ({ event }) => TJSContextMenu.create({ event, items: [{ label: 'A demo menu item' }] }),
         pickerOptions: {
            id: `${idPrepend}tjs-file-picker-demo-2`,
            store: writable('')
         }
      },

      // TJSFileIconButton (standard)
      {
         disabled: !FVTTFilePickerControl.canBrowse,
         efx: rippleInstance,
         pickerOptions: {
            id: `${idPrepend}tjs-file-picker-demo-3`,
            store: writable('')
         }
      },

      // TJSFileIconButton (modal)
      {
         disabled: !FVTTFilePickerControl.canBrowse,
         efx: rippleInstance,
         pickerOptions: {
            id: `${idPrepend}tjs-file-picker-demo-4`,
            store: writable(''),
            modal: true,
            modalOptions: {
               closeOnInput: true   // closes on glasspane click when launched from a modal app / dialog.
            }
         }
      },

      // TJSFileSlotButton (standard)
      {
         // Note that the inline `styles` removes the disabled filter when a user can't browse.
         // This is an example of how an actor / profile image can be constructed.
         disabled: !FVTTFilePickerControl.canBrowse,
         efx: ripple({ duration: 300 }),
         styles: !FVTTFilePickerControl.canBrowse ? { '--tjs-slot-button-filter-disabled': 'none' } : void 0,
         pickerOptions: {
            id: `${idPrepend}tjs-file-picker-demo-5`,
            store: writable(''),
            type: 'imagevideo'        // This button is slotted and only displays graphics.
         }
      }
   ];
}
