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
   sideSlideLayer: 'sideSlideLayer'
};

/**
 * @type {ESSessionConstants} Defines all the module session storage static constants.
 */
const sessionConstants = {
   appStateMenu: `${constants.moduleId}.menus-app-state`,
   menuScale: `${constants.moduleId}.menus-font-scale`,
   menuContainerFocus: `${constants.moduleId}.menus-container-focus`,
   menuKeyForward: `${constants.moduleId}.menus-key-forward`,
   themeDarkMode: `${constants.moduleId}.theme.dark`,
   scrollbarState: `${constants.moduleId}.scrollbar-state`,
   sidebarCustomTab: `${constants.moduleId}.sidebar.custom-tab`,
   sidebarReplaceTab: `${constants.moduleId}.sidebar.replace-tab`,
   sidebarRemoveTab: `${constants.moduleId}.sidebar.remove-tab`
};


export { constants, sessionConstants, settings };

/**
 * @typedef {object} ESSessionConstants
 *
 * @property {string} appStateMenu Stores the current app state in /src/view/standard-components/menu demo.
 *
 * @property {string} menuScale Stores the font scale state in `/src/view/standard-components/menu` demo.
 *
 * @property {string} menuContainerFocus Stores keyboard focus state in `/src/view/standard-components/menu` demo.
 *
 * @property {string} menuKeyPropagate Stores scroll key propagate state in `/src/view/standard-components/menu` demo.
 *
 * @property {string} themeDarkMode Indicates whether dark mode is enabled.
 *
 * @property {string} scrollbarState Serializes scrollbar height state in `/src/view/standard-components/menu` demo.
 *
 * @property {string} sidebarCustomTab Indicates whether to load a custom Svelte sidebar tab.
 *
 * @property {string} sidebarReplaceTab Indicates whether to replace combat tracker with Svelte sidebar tab.
 *
 * @property {string} sidebarRemoveTab Indicates whether to remove the chat sidebar tab.
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
 */
