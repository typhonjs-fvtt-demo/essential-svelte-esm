<script>
   import { getContext }            from 'svelte';

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
            items: createMenuItems(),

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

      // styles: {
      //    '--tjs-scroll-container-box-shadow-focus-visible': 'inset 0 0 0 2px var(--color-shadow-primary)'
      // }
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

   <TJSScrollContainer {container}>
      <section class=text>
         <p>
            This demo shows off `TJSMenu` and `TJSContextMenu` providing two separate menu options. Additionally,
            several other supporting components are also included such as a toggle button and an example of how to
            configure a fixed top menu bar and a scrolling container content area.
         </p>
         <p>
            Context / right click the main scrolling area to display `TJSContextMenu` and select the overflow icon in
            the fixed menu bar to show the `TJSMenu` component.
         </p>
         <p>
            Also make the app window smaller and notice that the scroll container position is serialized.
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
</style>
