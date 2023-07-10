import MenuApplication from './view/MenuApplication.js';

// You only need to include this if you would like to use the TRL TinyMCE oEmbed plugin for video embeds.
import '#runtime/tinymce';

import './chatmessage.js';    // Loads the hooks specific to the chat message demo.

import '../styles/init.scss'; // Import any styles as this includes them in the build.

/**
 * Launches and positions the main `essential-svelte-esm` menu app to the left of the sidebar.
 */
Hooks.once('ready', () =>
{
   const sidebarRect = document.querySelector('#sidebar').getBoundingClientRect();
   new MenuApplication({ left: sidebarRect.x - 235, top: sidebarRect.y }).render(true, { focus: true });
});