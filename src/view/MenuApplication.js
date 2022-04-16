import {
   SvelteApplication,
   TJSDialog }                   from '@typhonjs-fvtt/runtime/svelte/application';

import MenuAppShell              from './MenuAppShell.svelte';

import ChatDialogContent         from './chatmessage/ChatDialogContent.svelte';
import HeaderButtonsApplication  from './header-buttons/HeaderButtonsApplication.js';
import HelloFoundryApplication   from './hello/HelloFoundryApplication.js';
import PositionApplication       from './position-app/PositionApplication.js';
import PositionBoxApplication    from './position-box/PositionBoxApplication.js';
import PositionCarouselApp       from './position-carousel/PositionCarouselApp.js';

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
         width: 200,
         height: 'auto',
         title: 'EssentialESM.title',

         svelte: {
            class: MenuAppShell,
            target: document.body,
            intro: true,
            props: {
               buttons: [
                  { title: 'Hello Foundry', class: HelloFoundryApplication },
                  { title: 'Header Buttons', class: HeaderButtonsApplication },
                  { title: 'Chat Message', onclick: () => new TJSDialog(
                     {
                        title: 'Essential Svelte (ESM) - Chat Message',
                        content: ChatDialogContent
                     }, { id: 'essential-esm-chat-dialog' })
                  },
                  { title: 'Position (App)', class: PositionApplication },
                  { title: 'Position (Box)', class: PositionBoxApplication },
                  { title: 'Position (Carousel)', class: PositionCarouselApp }
               ]
            }
         }
      });
   }
}