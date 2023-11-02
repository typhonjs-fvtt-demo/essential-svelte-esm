import { writable }        from 'svelte/store';

import { ripple }          from '#runtime/svelte/action/animate';

import { TJSContextMenu }  from '#standard/application';

/**
 * Provides a convenience function to create the button data for the FilePickerButtonContent component to make the
 * example easier to read. This also gives an example of defining your UI / component data separately.
 *
 * @param {string}   idPrepend - A unique string to prepend to picker CSS IDs.
 *
 * @returns {[{}]} Button data.
 */
export function createButtonData(idPrepend)
{
   return [
      // TJSFileButton (standard)
      {
         efx: ripple(),
         title: 'Pick File',
         pickerOptions: {
            id: `${idPrepend}test-fp`,
            store: writable(''), // You may assign a writable store to receive result changes.
            top: 100,

            /**
             * You can set a callback to receive filepath changes.
             *
             * @param {{ filepath: string }} filepath - Newly selected filepath.
             */
            // onFilepath: ({ filepath }) => { console.log(`!! filepath: ${filepath}`); },

            /**
             * You may provide a validation function to test the selected result. Return false to
             * reject the filepath selection. Post a Foundry UI notification, etc.
             * Note: the example below is always true.
             *
             * @param {{ filepath: string }} filepath - Filepath to validate.
             *
             * @returns {boolean} Is validated?
             */
            // onValidate: ({ filepath }) => typeof filepath === 'string'
         }
      },

      // TJSFileButton (modal)
      {
         efx: ripple(),
         title: 'Pick File',
         pickerOptions: {
            id: `${idPrepend}test-fp2`,
            modal: true,
            top: 100
         }
      },

      // TJSFileButton (standard) w/ customization
      {
         label: 'Pick File',
         icon: 'fas fa-wrench',
         efx: ripple(),
         onContextMenu: ({ event }) => TJSContextMenu.create({ event, items: [{ label: 'A demo menu item' }] }),
         pickerOptions: {
            id: `${idPrepend}test-fp3`,
            top: 100
         }
      },

      // TJSFileIconButton (standard)
      {
         efx: ripple(),
         pickerOptions: {
            id: `${idPrepend}test-fp4`,
            top: 100
         }
      },

      // TJSFileIconButton (modal)
      {
         efx: ripple(),
         pickerOptions: {
            id: `${idPrepend}test-fp5`,
            modal: true,
            modalOptions: {
               closeOnInput: true   // closes on glasspane click when launched from a modal app / dialog.
            },
            top: 100
         }
      },

      // TJSFileSlotButton (standard)
      {
         efx: ripple({ duration: 300 }),
         pickerOptions: {
            id: `${idPrepend}test-fp6`,
            top: 100
         }
      }
   ];
}