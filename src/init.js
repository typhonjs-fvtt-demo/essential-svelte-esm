import MenuApplication from './view/MenuApplication.js';
import MyChatMessage   from './view/chatmessage/MyChatMessage.svelte';

Hooks.once('ready', () =>
{
   const sidebarRect = document.querySelector('#sidebar').getBoundingClientRect();
   new MenuApplication({ left: sidebarRect.x - 210, top: sidebarRect.y }).render(true, { focus: true });
});

/**
 * Used by chat message demo to attach a Svelte component, MyChatMessage, to a chat message.
 */
Hooks.on('renderChatMessage', (message, html) =>
{
   const flagData = message.getFlag('essential-svelte-esm', 'data');

   if (typeof flagData === 'object')
   {
      new MyChatMessage({ target: html[0], props: flagData });
   }
});
