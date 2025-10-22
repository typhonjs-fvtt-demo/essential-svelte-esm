import { MenuApplication } from './view/MenuApplication.js';

import '../styles/init.scss'; // Import any styles as this includes them in the build.

/**
 * Launches and the main `essential-svelte-esm` menu app.
 */
Hooks.once('ready', () => new MenuApplication().render(true, { focus: true }));
