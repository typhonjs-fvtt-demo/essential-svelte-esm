<script>
   import { getContext }            from 'svelte';
   import { quadIn }                from 'svelte/easing';

   import { ApplicationShell }      from '#runtime/svelte/component/application';
   import { Timing }                from '#runtime/util';

   import { TJSContextMenu }        from '#standard/application/menu';
   import { TJSScrollContainer }    from '#standard/component/container';

   import { createMenuItems }       from './createMenuItems.js';
   import MenuBar                   from './MenuBar.svelte';

   import { sessionConstants }      from '#constants';

   export let elementRoot = void 0;

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   // ----------------------------------------------------------------------------------------------------------------

   const storeContainerKeyFocus = application.reactive.sessionStorage.getStore(
    sessionConstants.menuContainerFocus, false);

   /**
    * Configuration object for `TJSScrollContainer` component.
    *
    * @type {import('#standard/component/container').TJSScrollContainerData}
    */
   const container = {
      /**
       * The scroll container has a convenience method to support `contextmenu` press callbacks. This is handy if you
       * would like to show a context menu for the entire container.
       *
       * @param event
       */
      onContextMenu: ({ event }) =>
      {
         TJSContextMenu.create({
            event,

            /**
             * Note: When not passing the `application` reference to `createMenuItems` the `always on top` item isn't
             * added. Try modifying the code removing `{ application }`.
             */
            items: createMenuItems({ application }),

            /**
             * The menu item `onPress` handlers from `createMenuItems` are simple, so auto apply focus source.
             * This will focus the scroll container which is the source of the event.
             */
            onPressApplyFocus: true
         });
      },

      /**
       * Session storage store that saves scroll container top. Close and open the app to see that the scroll bars
       * retain state. Note: `scrollLeft` is also supported.
       */
      scrollTop: application.reactive.sessionStorage.getStore(sessionConstants.scrollbarState, 0),

      /**
       * The following are examples of keyboard navigation aspects of the scroll container. Uncomment to allow keyboard
       * tab navigation with a definition for an inset box-shadow when focus is visible.
       */
      // allowTabFocus: true,

      styles: {
         '--tjs-scroll-container-box-shadow-focus-visible': 'inset 0 0 0 2px var(--color-shadow-primary)'
      }
   }

   // Dynamic font size ----------------------------------------------------------------------------------------------

   let fontSize;

   const storeMenuScale = application.reactive.sessionStorage.getStore(sessionConstants.menuScale, 200);

   // A very fun use of Svelte easing / `quadIn` to modify font-size reactively from 1 to 1.5em using quad in easing.
   // This gives a very natural feeling when increasing / decreasing the elements displayed.
   // see https://svelte.dev/repl/easing and select 'quad' & 'ease in' to see the curve applied.
   $: {
      const adjustedItemHeight = $storeMenuScale / 10;
      const easing = quadIn((adjustedItemHeight - 20) / 30 );
      fontSize = `${1 + (easing * 0.5)}em`;
   }

   // Serialize app state --------------------------------------------------------------------------------------------

   /**
    * Serializes app positional state to session storage to show that the scroll container serialization works across
    * page reloads.
    */

   const storageStore = application.reactive.sessionStorage.getStore(sessionConstants.appStateMenu);

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storeAppState = Timing.debounce(() => $storageStore = application.state.current(), 500);

   // Reactive statement to invoke debounce callback on TJSPosition changes.
   $: storeAppState($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <MenuBar />

   <TJSScrollContainer {container} allowTabFocus={$storeContainerKeyFocus}>
      <!-- Note: using local calculated `fontSize` from scaling session store to control `font-size` -->
      <section class=text
               style:font-size={fontSize}>
         <p>
            This advanced demo shows off `TJSMenu` and `TJSContextMenu` providing three separate menu option examples.
            Additionally, several other supporting components are also included such as `TJSToggleButton` and an example
            of how to configure a fixed top menu bar and `TJSScrollContainer` providing an enhanced content area.
            <br>
         </p>
         <p>
         Menus:
         <ul>
            <li>`TJSContextMenu` as header button.</li>
            <li>`TJSContextMenu` as context menu / right click in scroll area.</li>
            <li>`TJSMenu` in fixed menu bar.</li>
         </ul>
         <p>
            The menus include several dummy / no-op menu items, but the `always on top` item will change the app state.
            Keyboard navigation / focus can be enabled / disabled for `TJSScrollContainer. A final slotted menu item
            available in the `TJSMenu` menu controls the font scaling of the main content text. All state including the
            app position is serialized to session storage.
         </p>
      </section>
   </TJSScrollContainer>
</ApplicationShell>

<style lang=scss>
   section {
      display: flex;
      justify-content: center;

      &.text {
         flex-direction: column;
         padding: 0 1rem;
      }
   }

   ul {
      margin-top: 0;
   }
</style>
