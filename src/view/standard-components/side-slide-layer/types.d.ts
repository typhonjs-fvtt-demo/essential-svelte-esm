import type { Writable }      from 'svelte/store';

import type { SvelteApp }     from '#runtime/svelte/application';

import type { SideSlideApp }  from './SideSlideApp';
import type SideSlideAppShell from './SideSlideAppShell.svelte';

/**
 * You may extend the `#external` default context with additional data. Accessed via `getContext('#external')` in
 * the app shell component.
 */
interface External extends SvelteApp.Context.External<SideSlideApp> {
   inputs: Record<string, Record<string, any>>

   stores: {
      allowLocking: Writable<boolean>
      clickToOpen: Writable<boolean>;
      duration: Writable<number>;
      easingIn: Writable<string>;
      easingOut: Writable<string>;
      side: Writable<string>;
      top: Writable<number>;
   }
}

/** Extended options that you can define as well as explicit app shell type. */
interface Options extends SvelteApp.Options<SideSlideAppShell, External> {}

export { External, Options };
