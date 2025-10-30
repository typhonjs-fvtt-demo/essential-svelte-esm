/**
 * Defines the main constants for module name and label.
 *
 * @type {{moduleId: string, moduleLabel: string}}
 */
const constants = {
   moduleId: 'essential-svelte-esm',
   moduleLabel: `Essential Svelte (ESM)`
};

/**
 * @type {ESSettingConstants} Defines the Foundry game setting keys.
 */
const settings = {
   appStateUser: 'appStateUser',
   appStateMenuUser: 'appStateMenuUser',
   sideSlideLayer: 'sideSlideLayer',
   userItemsArray: 'userItemsArray',
   worldItemsArray: 'worldItemsArray'
};

/**
 * @type {ESSessionConstants} Defines all the module session storage static constants.
 */
const sessionConstants = {
   menusAppState: `${constants.moduleId}.menus-app-state`,
   menusUIState: `${constants.moduleId}.menus-ui-state`,
   arrayObject: `${constants.moduleId}.arrayobject-`,
   themeDarkMode: `${constants.moduleId}.theme.dark`,
   sidebarTabs: `${constants.moduleId}.sidebar-tabs`
};


export { constants, sessionConstants, settings };

/**
 * @typedef {object} ESSessionConstants
 *
 * @property {string} arrayObject Stores all state in /src/view/foundry/game-settings/array-object demo.
 *
 * @property {string} menusAppState Stores the app state in /src/view/standard-components/menu demo.
 *
 * @property {string} menusUIState Stores the UI state in /src/view/standard-components/menu demo.
 *
 * @property {string} themeDarkMode Indicates whether dark mode is enabled.
 *
 * @property {string} sidebarTabs Stores sidebar tab state for `src/view/foundry/sidebar/custom-tab` demo.
 */

/**
 * @typedef {object} ESSettingConstants
 *
 * @property {string} appStateUser Stores the current app state in /src/view/svelte-application/app-state demo to
 * `user` setting.
 *
 * @property {string} appStateMenuUser Stores the main menu app state in /src/view/MenuApplication to a `user` setting.
 * `user` setting.
 *
 * @property {string} sideSlideLayer Stores the props persisted to Foundry settings as an object.
 *
 * @property {string} userItemsArray Stores the item entries persisted to a Foundry `user` scope setting as an array.
 *
 * @property {string} worldItemsArray Stores the item entries persisted to a Foundry `world` scope setting as an array.
 */
