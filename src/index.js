import { MenuApplication } from './view/MenuApplication.js';

import '../styles/init.scss'; // Import any styles as this includes them in the build.

/**
 * Launches and the main `essential-svelte-esm` menu app.
 */
Hooks.once('ready', () => new MenuApplication().render(true, { focus: true }));

Hooks.once('ready', async () =>
{
   // const menu = game.settings.menus.get('core.uiConfigMenu');
   // const app = new menu.type({ window: { resizable: true } });
   // await app.render(true);
   // app.setPosition({ left: 834, top: 372 });
});

import { FoundryStyles } from '#runtime/svelte/application';

/**
 * Launches and positions the main `essential-svelte-esm` menu app to the left of the sidebar.
 */
Hooks.once('ready', async () =>
{
   {
      // const options = { camelCase: true };
      //
      // const propsApp = FoundryStyles.ext.get('.application', options);
      // const propsAppHeader = FoundryStyles.ext.get('.application .window-header', options);
      // const propsAppHeaderBtn = FoundryStyles.ext.get('.application .window-header button.header-control', options);
      //
      // const propsAppHandleLight = FoundryStyles.ext.get('.themed.theme-light.application .window-resize-handle', options);
      //
      // console.log(`!!! propsApp: \n`, JSON.stringify(propsApp, null, 2));
      // console.log(`!!! propsAppHeader: \n`, JSON.stringify(propsAppHeader, null, 2));
      // console.log(`!!! propsAppHeaderBtn: \n`, JSON.stringify(propsAppHeaderBtn, null, 2));
      // console.log(`!!! propsAppHandleLight: \n`, JSON.stringify(propsAppHandleLight, null, 2));

      // console.log(`!!! PROPS: \n`, JSON.stringify(Object.fromEntries(FoundryStyles.core.entries()), null, 2));

      // console.log(`!!! KEYS: \n`, JSON.stringify([...FoundryStyles.core.keys()].length, null, 2));
      // console.log(`!!! KEYS: \n`, JSON.stringify([...FoundryStyles.core.keys()], null, 2));
   }
});
