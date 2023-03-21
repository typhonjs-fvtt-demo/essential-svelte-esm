// import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';
//
// import ColorPickerAppShell    from './ColorPickerAppShell.svelte';
//
// export default class ColorPickerApp extends SvelteApplication
// {
//    /**
//     * Default Application options
//     *
//     * @returns {object} options - Application options.
//     * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
//     */
//    static get defaultOptions()
//    {
//       return foundry.utils.mergeObject(super.defaultOptions, {
//          title: 'TJSColordPicker',
//          resizable: true,
//          width: 500,
//          height: 300,
//
//          svelte: {
//             class: ColorPickerAppShell,
//             target: document.body,
//          }
//       });
//    }
// }