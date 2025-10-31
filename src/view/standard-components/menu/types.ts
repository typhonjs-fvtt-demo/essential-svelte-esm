import type { Writable }      from 'svelte/store';

import type { SvelteApp }     from '#runtime/svelte/application';

import type { TJSMenuApp }    from './TJSMenuApp';
import type TJSMenuAppShell   from './TJSMenuAppShell.svelte';

/**
 * You may extend the `#external` default context with additional data. Accessed via `getContext('#external')` in
 * the app shell component.
 */
interface External extends SvelteApp.Context.External<TJSMenuApp> {
   stores: {
      fontScale: Writable<number>;
      scrollContainer: {
         keyFocus: Writable<boolean>;
         keyPropagate: Writable<boolean>;
         scrollTop: Writable<number>;
      }
   }
}

/** Extended options that you can define as well as explicit app shell type. */
interface Options extends SvelteApp.Options<TJSMenuAppShell, External> {}

export { External, Options };
