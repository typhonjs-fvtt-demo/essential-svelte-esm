import {
   SvelteApp,
   TJSDialog }                from '#runtime/svelte/application';

import { deepMerge }          from '#runtime/util/object';

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
   ProseMirrorApp }           from './standard-components/editor';

import {
   AnimateWAAPIApp,
   ContentResizeApp,
   PopoverTooltipApp,
   TinykeysApp }              from './svelte-actions';

import {
   ActiveClassesApp,
   AppStateClientSettingApp,
   AppStateSessionApp,
   ContainerQueryApp,
   ExplicitThemeApp,
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

export class MenuApplication extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'essential-svelte-esm',

         // In this demo `TJSApplicationShell` is used which provides a way to exclude your app from overt game system
         // styles, but alas some of the v13 core styles are hard to opt out / escape from as things go.

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
         themeName: 'dark',

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
            title: 'SvelteApp',
            entries: [
               { title: 'Hello Foundry', class: HelloFoundryApplication },
               { title: 'Explicit App Theme', class: ExplicitThemeApp },
               { title: 'Header Buttons', class: HeaderButtonsApplication },
               { title: 'Container Queries', class: ContainerQueryApp },
               { title: 'Reactive App Classes', class: ActiveClassesApp },
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
               { title: 'ProseMirror', class: ProseMirrorApp }
            ]
         },
         {
            title: 'Svelte Actions',
            entries: [
               { title: '`animateWAAPI` / WAAPI Animation', class: AnimateWAAPIApp },
               { title: '`popoverTooltip` / Tooltips', class: PopoverTooltipApp },
               { title: '`resizeObserver` / Content Min Resize', class: ContentResizeApp },
               { title: '`useTinykeys` / Tinykeys', class: TinykeysApp }
            ]
         },
         {
            title: 'Foundry (Sidebar)',
            entries: [
               { title: 'Chat Message', onPress: () => new TJSDialog(
                  {
                     title: 'Essential Svelte (ESM) - Chat Message',
                     content: { class: ChatDialogContent }
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
