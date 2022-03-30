/**
 * Defines the main constants for module name and label.
 *
 * @type {{moduleName: string, moduleLabel: string}}
 */
const constants = {
   moduleLabel: `Essential Svelte (ESM)`,
   moduleName: 'essential-svelte-esm'
};

/**
 * @type {ESSessionConstants} Defines all the module session storage static constants.
 */
const sessionConstants = {
   themeDarkMode: `${constants.moduleName}.theme.dark`
};

export { constants, sessionConstants };

/**
 * @typedef {object} ESSessionConstants
 *
 * @property {string} themeDarkMode - Indicates whether dark mode is enabled.
 */