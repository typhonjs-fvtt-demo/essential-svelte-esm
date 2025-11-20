<script>
   import { TestApplicationShell }  from '#runtime/svelte/component/application';
   import { TJSScrollContainer }    from '#runtime/svelte/component/container';

   export let elementRoot = void 0;

   /**
    * Configuration object for `TJSScrollContainer` component. You may also set individual props such as `gutterStable`.
    *
    * @type {import('#runtime/svelte/component/container').TJSScrollContainerData}
    */
   const container = {
      /**
       * Sets the scrollbar gutter to `stable`; this is a convenience when there is no wrapping element around
       * `TJSScrollContainer` to set a CSS variable.
       */
      gutterStable: true,

      onContextMenu: () => console.log('!!!!! CONTEXT MENU')
   }
</script>

<svelte:options accessors={true}/>

<TestApplicationShell bind:elementRoot padToVisualEdge={true} scrollContainer={container}>
   <!-- Note: The use of the `tjs-content-vars` class. This is a special class w/ dynamic CSS vars  -->
   <main class=tjs-content-vars>
      <p>
         A basic example of TJSScrollContainer configuring the `ApplicationShell` with `padToVisualEdge` set to
         `true` which dynamically sets the padding of the `.window-content` element of the app shell.
         `TJSScrollContainer` has minor configuration to set the scrollbar gutter as stable which means that
         space for the scrollbar is always present in the layout. TRL provides a special set of content CSS variables
         to control content layout. These CSS variables are special as they contain programmatic / dynamic runtime
         values calculated for the actual scrollbar width. Currently, there are two main `tjs-content-vars` CSS
         variables for when the scrollbar gutter is `stable`:
      </p>
      <ol>
         <li>--tjs-scrollbar-gutter-stable-padding</li>
         <li>--tjs-scrollbar-gutter-stable-padding-inline</li>
      </ol>
      <p>
         Include the `tjs-content-vars` class in your main slotted content and you may set `padding` in styles to
         either of the above CSS variables. You may globally alter though be sure to target your application ID /
         classes `--tjs-content-padding-length` to change the default padding margin away from `1rem`. See the
         `style` section in the associated demo component for more details.
      </p>
   </main>
</TestApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      justify-content: center;

      // A very handy convenience CSS variable accessible by elements that use the `tjs-content-vars` class. By default,
      // this is inline (left / right) `1rem` padding where the right padding takes into account the stable scrollbar
      // gutter width. Remove `-inline` from the end for `1rem` top & bottom padding values as well.
      //padding: var(--tjs-scrollbar-gutter-stable-padding-inline);

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
</style>
