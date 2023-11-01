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
         pickerOptions: {
            id: `${idPrepend}test-fp`,
            store: writable(''), // You may assign a writable store to receive result changes.
            top: 100
         }
      },

      // TJSFileButton (modal)
      {
         pickerOptions: {
            id: `${idPrepend}test-fp2`,
            modal: true,
            modalOptions: {
               // background: 'red',
               closeOnInput: true
            },
            top: 100
         }
      },

      // TJSFileButton (standard) w/ customization
      {
         label: 'Pick File',
         icon: 'fas fa-wrench',
         title: 'A custom title',
         onContextMenu: ({ event }) => TJSContextMenu.create({ event, items: [{ label: 'A demo menu item' }] }),
         pickerOptions: {
            id: `${idPrepend}test-fp3`,
            top: 100
         }
      },

      // TJSFileIconButton (standard)
      {
         icon: 'fas fa-file',
         efx: ripple(),
         pickerOptions: {
            id: `${idPrepend}test-fp4`,
            top: 100
         }
      },

      // TJSFileIconButton (modal)
      {
         icon: 'fas fa-file',
         efx: ripple(),
         pickerOptions: {
            id: `${idPrepend}test-fp5`,
            modal: true,
            modalOptions: {
               closeOnInput: true
            },
            top: 100
         }
      },

      // TJSFileSlotButton (standard)
      {
         efx: ripple({ duration: 200 }),
         pickerOptions: {
            id: `${idPrepend}test-fp6`,
            modalOptions: {
               closeOnInput: true   // closes on glasspane click when launched from a modal app / dialog.
            },
            top: 100
         }
      },
   ];
}