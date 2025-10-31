import type { Readable, Writable }     from 'svelte/store';

import type { SvelteApp }              from '#runtime/svelte/application';

import type { SidebarCustomTabApp }    from './SidebarCustomTabApp';
import type SidebarCustomTabAppShell   from './SidebarCustomTabAppShell.svelte';

/**
 * You may extend the `#external` default context with additional data. Accessed via `getContext('#external')` in
 * the app shell component.
 */
interface External extends SvelteApp.Context.External<SidebarCustomTabApp> {
   stores: {
      reloadRequired: Readable<boolean>
      tabAdd: Writable<boolean>;
      tabRemove: Writable<boolean>;
      tabReplace: Writable<boolean>;
   }
}

/** Extended options that you can define as well as explicit app shell type. */
interface Options extends SvelteApp.Options<SidebarCustomTabAppShell, External> {}

export { External, Options };
