import MenuApplication from './view/MenuApplication.js';

import './chatmessage.js';    // Loads the hooks specific to the chat message demo.

/**
 * Launches and positions the main `essential-svelte-esm` menu app to the left of the sidebar.
 */
Hooks.once('ready', () =>
{
   const sidebarRect = document.querySelector('#sidebar').getBoundingClientRect();
   new MenuApplication({ left: sidebarRect.x - 235, top: sidebarRect.y }).render(true, { focus: true });
});