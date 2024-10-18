import {
   SvelteApplication,
   TJSDialog }                from '#runtime/svelte/application';

import MenuAppShell           from './MenuAppShell.svelte';

import {
   ChatDialogContent,
   SidebarCustomTabApp }      from './foundry/sidebar';

import {
   ColorPickerApp,
   FilePickerApp,
   SideSlideApp }             from './standard-components';

import {
   ContentEditableApp,
   ProseMirrorApp,
   TinyMCEApp }               from './standard-components/editor';

import {
   ContentResizeApp,
   TinykeysApp }              from './svelte-actions';

import {
   AppStateClientSettingApp,
   AppStateSessionApp,
   HeaderButtonsApplication,
   HelloFoundryApplication }  from './svelte-application';

import {
   BasicDocumentApp,
   EmbeddedDocApplication }   from './tjsdocument';

import {
   PositionApplication,
   PositionBasicOverlayApp,
   PositionBoxApplication,
   PositionCarouselApp }      from './tjsposition';

export class MenuApplication extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'essential-svelte-esm',
         classes: ['tjs-essential-svelte-esm'],
         headerButtonNoClose: true,
         resizable: false,
         popOut: false,
         width: 275,
         height: 'auto',
         positionOrtho: false,
         transformOrigin: null,
         title: 'EssentialESM.apps.menu.title',
         zIndex: 95,

         svelte: {
            class: MenuAppShell,
            target: document.body,
            intro: true,
            props: {
               sections: this.#createSections()
            }
         }
      });
   }

   /**
    * @returns {{}[]} Section / entry data for demo menu display.
    */
   static #createSections()
   {
      const sections = [
         {
            title: 'SvelteApplication',
            entries: [
               { title: 'Hello Foundry', class: HelloFoundryApplication },
               { title: 'Header Buttons', class: HeaderButtonsApplication },
               { title: 'App State (Client Setting)', class: AppStateClientSettingApp },
               { title: 'App State (Session Storage)', class: AppStateSessionApp },
            ]
         },
         {
            title: 'TJSDocument',
            entries: [
               { title: 'Reactive Document (Basic)', class: BasicDocumentApp },
               { title: 'Reactive Embedded Collections', class: EmbeddedDocApplication },
            ]
         },
         {
            title: 'TJSPosition',
            entries: [
               { title: 'Empty App / Basic Overlay', class: PositionBasicOverlayApp },
               { title: 'App Control / Animation', class: PositionApplication },
               { title: 'Box Demo / Element Control', class: PositionBoxApplication },
               { title: '3D Carousel', class: PositionCarouselApp }
            ]
         },
         {
            title: 'Standard Components',
            entries: [
               { title: 'Color Picker', class: ColorPickerApp },
               { title: 'File Picker Buttons', class: FilePickerApp },
               { title: 'Side Slide Layer', class: SideSlideApp },
            ]
         },
         {
            title: 'Standard Components (Editor)',
            entries: [
               { title: 'Content Editable', class: ContentEditableApp },
               { title: 'TinyMCE', class: TinyMCEApp },
               { title: 'ProseMirror', class: ProseMirrorApp },
            ]
         },
         {
            title: 'Svelte Actions',
            entries: [
               { title: '`useTinykeys` / Tinykeys', class: TinykeysApp },
               { title: '`resizeObserver` / Content Min Resize', class: ContentResizeApp }
            ]
         },
         {
            title: 'Foundry (Sidebar)',
            entries: [
               { title: 'Chat Message', onPress: () => new TJSDialog(
                   {
                      title: 'Essential Svelte (ESM) - Chat Message',
                      content: ChatDialogContent
                   }, {
                      id: 'essential-esm-chat-dialog',
                      classes: ['tjs-essential-svelte-esm']
                   })
               },
               { title: 'Custom Sidebar Tab', class: SidebarCustomTabApp }
            ]
         }
      ];

      return sections;
   }
}
