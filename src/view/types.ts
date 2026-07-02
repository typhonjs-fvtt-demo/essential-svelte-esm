import type { SvelteApp }     from '#runtime/svelte/application';

import type { MenuApplication }    from './MenuApplication';
import type MenuAppShell   from './MenuAppShell.svelte';

/**
 * You may extend the `#external` default context with additional data. Accessed via `getContext('#external')` in
 * the app shell component.
 */
interface External extends SvelteApp.Context.External<MenuApplication> {
   demoApps: Map<string, SvelteApp>;
}

/** Extended options that you can define as well as explicit app shell type. */
interface Options extends SvelteApp.Options<MenuAppShell, External> {}

export { External, Options };
