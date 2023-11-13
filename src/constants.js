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
   appStateClient: 'appStateClient',
   sideSlideLayer: 'sideSlideLayer'
};

/**
 * @type {ESSessionConstants} Defines all the module session storage static constants.
 */
const sessionConstants = {
   appStateClient: `${constants.moduleId}.${settings.appStateClient}`,
   themeDarkMode: `${constants.moduleId}.theme.dark`
};


export { constants, sessionConstants, settings };

/**
 * @typedef {object} ESSessionConstants
 *
 * @property {string} appStateClient Stores the current app state in /src/view/app-state demo.
 *
 * @property {string} themeDarkMode Indicates whether dark mode is enabled.
 */

/**
 * @typedef {object} ESSettingConstants
 *
 * @property {string} appStateClient Stores the current app state in /src/view/app-state demo.
 *
 * @property {string} sideSlideLayer Stores the props persisted to Foundry settings as an object.
 */
