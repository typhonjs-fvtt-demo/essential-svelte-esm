<script>
   import { getContext }            from 'svelte';
   import { quadIn }                from 'svelte/easing';

   import { ApplicationShell }      from '#runtime/svelte/component/application';
   import { TJSScrollContainer }    from '#runtime/svelte/component/container';
   import { Timing }                from '#runtime/util';

   import { TJSContextMenu }        from '#standard/application/menu';

   import { createMenuItems }       from './createMenuItems.js';
   import MenuBar                   from './MenuBar.svelte';

   import { sessionConstants }      from '#constants';

   /** 
    * @import { TJSScrollContainerData } from '#runtime/svelte/component/container';
    * 
    * @import { External }               from './types';
    */
   
   /** @type {HTMLElement} */
   export let elementRoot;

   /** @type {External} */
   const { application, stores } = getContext('#external');

   // ----------------------------------------------------------------------------------------------------------------

   // Session storage store for `TJSScrollContainer` keyboard focus / tab navigation enabled.
   const storeKeyFocus = stores.scrollContainer.keyFocus;

   // Session storage store for `TJSScrollContainer` to enable / disable scroll key event propagation. Foundry doesn't
   // respect key events for scrolling accessibility. IE spacebar, up / down arrows, etc.
   const storeKeyPropagate = stores.scrollContainer.keyPropagate;

   /**
    * Configuration object for `TJSScrollContainer` component.
    *
    * @type {TJSScrollContainerData}
    */
   const container = {
      /**
       * Sets the scrollbar gutter to `stable`; this is a convenience when there is no wrapping element around
       * `TJSScrollContainer` to set a CSS variable.
       */
      gutterStable: true,

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
             *
             * Note: For `TJSContextMenu` and `TJSMenu` as of TRL `0.3.0` you can also just pass a function for `items`
             * This function will be invoked to retrieve the list of menu items to display. Below an arrow function is
             * used to wrap `createMenuItems` in order to pass `application` to it, but this can be any function that
             * returns a list of menu items.
             */
            items: () => createMenuItems({ application })
         });
      },

      /**
       * Session storage store that saves scroll container top. Close and open the app to see that the scroll bars
       * retain state. Note: `scrollLeft` is also supported.
       */
      scrollTop: stores.scrollContainer.scrollTop,

      /**
       * The following defines the box-shadow for the scroll container when keyboard / tab navigation is enabled.
       */
      styles: {
         '--tjs-scroll-container-box-shadow-focus-visible': 'inset 0 0 0 2px var(--color-shadow-primary)'
      }
   }

   // Dynamic font size ----------------------------------------------------------------------------------------------

   /** @type {string} */
   let fontSize;

   const storeFontScale = stores.fontScale;

   // A very fun use of Svelte easing / `quadIn` to modify font-size reactively from 1 to 1.5em using quad in easing.
   // This gives a very natural feeling when increasing / decreasing the elements displayed.
   // see https://svelte.dev/repl/easing and select 'quad' & 'ease in' to see the curve applied.
   $: {
      const adjustedItemHeight = $storeFontScale / 10;
      const easing = quadIn((adjustedItemHeight - 20) / 30 );
      fontSize = `${1 + (easing * 0.5)}em`;
   }

   // Serialize app state --------------------------------------------------------------------------------------------

   /**
    * Serializes app positional state to session storage to show that the scroll container serialization works across
    * page reloads.
    */

   const storageStore = application.reactive.sessionStorage.getStore(sessionConstants.menusAppState);

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storeAppState = Timing.debounce((pos) => $storageStore = application.state.current(), 500);

   // Reactive statement to invoke debounce callback on TJSPosition changes.
   $: storeAppState($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot padToVisualEdge={true}>
   <MenuBar />

   <TJSScrollContainer {container} allowTabFocus={$storeKeyFocus} keyPropagate={$storeKeyPropagate}>
      <!-- Note: The use of the `tjs-content-vars` class. This is a special class w/ dynamic CSS vars  -->
      <!-- Note: using local calculated `fontSize` from scaling session store to control `font-size` -->
      <section class=tjs-content-vars style:font-size={fontSize}>
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
            All menus handle intelligent focus handling with optional focus chaining. By default the component /
            element that triggered the menu regains focus after a menu item is selected or the menu is closed via the
            `Escape` key. A focus chaining example is provided which shows a modal dialog. Notice the return of focus
            after the dialog is closed.
         </p>
         <p>
            A final slotted menu item available in the `TJSMenu` menu items controls the font scaling of the main
            content text. All state including the app position and `always on top` is serialized to session storage.
            Keyboard navigation / focus can be enabled / disabled for `TJSScrollContainer`. By default, the scroll
            container supports accessibility in stopping propagation of keys related to scrolling. You may turn this
            off with a menu bar button.
         </p>
      </section>
   </TJSScrollContainer>
</ApplicationShell>

<style lang=scss>
   section {
      display: flex;
      flex-direction: column;
      justify-content: center;

      // A very handy convenience CSS variable accessible by elements that use the `tjs-content-vars` class. By default,
      // this is inline (left / right) `1rem` padding where the right padding takes into account the stable scrollbar
      // gutter width. Remove `-inline` from the end for `1rem` top & bottom padding values as well.
      padding: var(--tjs-scrollbar-gutter-stable-padding-inline);

      // The following CSS variables are available to globally modify and are used as overrides in `tjs-content-vars`
      // scoped variables like the `padding` above. Be mindful to scope your overrides to your particular applications!

      //--tjs-content-padding-length: 3rem;        // All sides.

      //--tjs-content-padding-right: 3rem;         // Explicit override of right padding.
      //--tjs-content-padding-left: 3rem;          // Explicit override of left padding.

      // Available to use with `--tjs-scrollbar-gutter-stable-padding` / not inline variant; remove `-inline` from
      // above `padding` variable.

      //--tjs-content-padding-top: 3rem;           // Explicit override of top padding.
      //--tjs-content-padding-bottom: 3rem;        // Explicit override of bottom padding.
   }

   ul {
      margin-top: 0;
   }
</style>
