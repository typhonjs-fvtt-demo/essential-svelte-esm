import {
   SvelteApplication,
   TJSDialog }                   from '@typhonjs-fvtt/runtime/svelte/application';

import { BrowserSupports }       from '@typhonjs-fvtt/runtime/svelte/util';

import MenuAppShell              from './MenuAppShell.svelte';

import AppStateClientSettingApp  from './app-state/client-setting/AppStateClientSettingApp.js';
import AppStateSessionApp        from './app-state/session-storage/AppStateSessionApp.js';
import ChatDialogContent         from './chatmessage/ChatDialogContent.svelte';
import ColorPickerApp            from './components/color/ColorPickerApp.js';
import ContentEditableApp        from './editor/content-editable/ContentEditableApp.js';
import BasicDocumentApp          from './document/basic/BasicDocumentApp.js';
import EmbeddedDocApplication    from "./document/embedded-collection/EmbeddedDocApplication.js";
import HeaderButtonsApplication  from './header-buttons/HeaderButtonsApplication.js';
import HelloFoundryApplication   from './hello/HelloFoundryApplication.js';
import PositionApplication       from './position/app-control/PositionApplication.js';
import PositionBasicOverlayApp   from './position/basic-overlay/PositionBasicOverlayApp.js';
import PositionBoxApplication    from './position/box/PositionBoxApplication.js';
import PositionCarouselApp       from './position/carousel/PositionCarouselApp.js';
import ProseMirrorApp            from './editor/prosemirror/ProseMirrorApp.js';
import TinyMCEApp                from './editor/tinymce/TinyMCEApp.js';

export default class MenuApplication extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      /** @type {{}[]} */
      const buttons = [
         { title: 'Hello Foundry', class: HelloFoundryApplication },
         { title: 'Header Buttons', class: HeaderButtonsApplication },
         { title: 'Reactive Document (Basic)', class: BasicDocumentApp },
         { title: 'Reactive Embedded Collections', class: EmbeddedDocApplication },
         { title: 'Chat Message', onPress: () => new TJSDialog(
             {
                title: 'Essential Svelte (ESM) - Chat Message',
                content: ChatDialogContent
             }, {
                id: 'essential-esm-chat-dialog',
                classes: ['tjs-essential-svelte-esm']
             })
         },
         { title: 'Position (Basic Overlay)', class: PositionBasicOverlayApp },
         { title: 'Position (App)', class: PositionApplication },
         { title: 'Position (Box)', class: PositionBoxApplication },
         { title: 'Position (Carousel)', class: PositionCarouselApp },
         { title: 'App State (Client Setting)', class: AppStateClientSettingApp },
         { title: 'App State (Session Storage)', class: AppStateSessionApp },
         { title: 'Content Editable', class: ContentEditableApp },
         { title: 'TinyMCE', class: TinyMCEApp }
      ];

      const isV10 = !foundry.utils.isNewerVersion(10, game.version ?? game?.data?.version);

      // Add ProseMirror editor demo if v10+
      if (isV10)
      {
         buttons.push({ title: 'ProseMirror', class: ProseMirrorApp });
      }

      // Add TJSColordPicker component demo if browser supports container queries.
      if (BrowserSupports.containerQueries)
      {
         buttons.push({ title: 'Color Picker', class: ColorPickerApp });
      }

      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'essential-svelte-esm',
         classes: ['tjs-essential-svelte-esm'],
         headerButtonNoClose: true,
         resizable: false,
         minimizable: true,
         popOut: false,
         width: 225,
         height: 'auto',
         positionOrtho: false,
         transformOrigin: null,
         title: 'EssentialESM.title',
         zIndex: 95,

         svelte: {
            class: MenuAppShell,
            target: document.body,
            intro: true,
            props: {
               buttons
            }
         }
      });
   }
}