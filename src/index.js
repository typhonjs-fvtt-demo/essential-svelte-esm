import { MenuApplication } from './view/MenuApplication.js';

import '../styles/init.scss'; // Import any styles as this includes them in the build.

/**
 * Launches and positions the main `essential-svelte-esm` menu app to the left of the sidebar.
 */
Hooks.once('ready', () =>
{
   const sidebarRect = document.querySelector('#sidebar').getBoundingClientRect();
   new MenuApplication({ left: sidebarRect.x - 285, top: sidebarRect.y }).render(true, { focus: true });
});
