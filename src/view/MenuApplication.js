import {
   SvelteApplication,
   TJSDialog }                   from '@typhonjs-fvtt/runtime/svelte/application';

import MenuAppShell              from './MenuAppShell.svelte';

import AppStateClientSettingApp  from './app-state/client-setting/AppStateClientSettingApp.js';
import AppStateSessionApp        from './app-state/session-storage/AppStateSessionApp.js';
import ChatDialogContent         from './chatmessage/ChatDialogContent.svelte';
import BasicDocumentApp          from './document/basic/BasicDocumentApp.js';
import EmbeddedDocApplication    from "./document/embedded-collection/EmbeddedDocApplication.js";
import HeaderButtonsApplication  from './header-buttons/HeaderButtonsApplication.js';
import HelloFoundryApplication   from './hello/HelloFoundryApplication.js';
import PositionApplication       from './position/app-control/PositionApplication.js';
import PositionBasicOverlayApp   from './position/basic-overlay/PositionBasicOverlayApp.js';
import PositionBoxApplication    from './position/box/PositionBoxApplication.js';
import PositionCarouselApp       from './position/carousel/PositionCarouselApp.js';

export default class MenuApplication extends SvelteApplication
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
         id: 'essential-svelte-esm',
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
               buttons: [
                  { title: 'Hello Foundry', class: HelloFoundryApplication },
                  { title: 'Header Buttons', class: HeaderButtonsApplication },
                  { title: 'Reactive Document (Basic)', class: BasicDocumentApp },
                  { title: 'Reactive Embedded Collections', class: EmbeddedDocApplication },
                  { title: 'Chat Message', onclick: () => new TJSDialog(
                     {
                        title: 'Essential Svelte (ESM) - Chat Message',
                        content: ChatDialogContent
                     }, { id: 'essential-esm-chat-dialog' })
                  },
                  { title: 'Position (Basic Overlay)', class: PositionBasicOverlayApp },
                  { title: 'Position (App)', class: PositionApplication },
                  { title: 'Position (Box)', class: PositionBoxApplication },
                  { title: 'Position (Carousel)', class: PositionCarouselApp },
                  { title: 'App State (Client Setting)', class: AppStateClientSettingApp },
                  { title: 'App State (Session Storage)', class: AppStateSessionApp }
               ]
            }
         }
      });
   }
}