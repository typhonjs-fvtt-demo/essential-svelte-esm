<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import DynamicContent         from './DynamicContent.svelte';

   export let elementRoot = void 0;

   /**
    * Configuration object for `TJSScrollContainer` component. `ApplicationShell` and `TJSApplicationShell` can insert
    * and automatically configure a wrapping `TJSScrollContainer` around the slotted / main content via the
    * `scrollContainer` prop. You may change this data dynamically and even define a Svelte component to load
    * instead of the slotted content.
    *
    * Review all the options described by `TJSScrollContainerData` as there are several useful ones including
    * scrollbar serialization.
    *
    * @type {import('#runtime/svelte/component/container').TJSScrollContainerData}
    */
   let container = {
      /** Sets the scrollbar gutter to `stable`. */
      gutterStable: true,

      /** You may define a context menu callback. */
      onContextMenu,

      /** Uncomment to dynamically load a content component */
      // svelte: {
      //    class: DynamicContent,
      //    // props: {} // etc etc.
      // }
   }

   /**
    * Example context menu callback that swaps the current `scrollContainer` prop for `gutterStable`.
    */
   function onContextMenu()
   {
      container = { ...container, gutterStable: !container.gutterStable };

      console.log(`!!!!! CONTEXT MENU - gutterStable: ${container.gutterStable}`);
   }

   /**
    * Uncomment the block below to see that the `scrollContainer` prop is reactive.
    * After 3 seconds swap out the data defined content component.
    */
   // setTimeout(() => container = { ...container, svelte: { class: DynamicContent } }, 3000);
</script>

<svelte:options accessors={true}/>

<!-- Setting `scrollContainer` to `true` is the simplest way to enable a scroll container -->
<!--<ApplicationShell bind:elementRoot scrollContainer={true}>-->

<!-- In this example we use the basic config, `container`, from above. -->
<ApplicationShell bind:elementRoot scrollContainer={container}>
   <main>
      <p>
         The `ApplicationShell` and `TJSApplicationShell` components now provide reactive and data defined configuration
         of `TJSScrollContainer` through the `scrollContainer` prop`. The most basic way to enable a scroll container
         is to set `scrollContainer` to `true`.
      </p>
      <p>
         Another prop and also data property of `TJSScrollContainerData` is `padToVisualEdge` which allows dynamic
         control of being able to pad the window content element to the precise visual edge of the app frame. This may
         differ on various game systems particularly ones that use border images on window content (Warhammer). Being
         able to dynamically control this allows you to write components that can take up the full visual space of the
         window content without having to worry about game system / CSS specific modifications.
      </p>
      <p>
         By default, the app shells when `scrollContainer` is defined will set `padToVisualEdge` to
         `&lbrace; right: true &rbrace;`. This will always align the scrollbar with the right visual edge of the window
         content area, but leave the default game system padding for `top`, `bottom`, `left`. Set `padToVisualEdge`
         to `true` dynamically sets the padding of the `.window-content` element of the app shell to take up the full
         viewable space.
      </p>
      <p>
         `TJSScrollContainer` has a property to set the scrollbar gutter as stable which means that
         space for the scrollbar is always present in the layout. TRL provides a special set of content CSS variables
         to control content layout. These CSS variables are special as they contain programmatic / dynamic runtime
         values calculated for the actual scrollbar width. Currently, there are several `tjs-content-vars` CSS
         variables for when the scrollbar gutter is `stable`:
      </p>
      <ol>
         <li>--tjs-scrollbar-gutter-stable-padding</li>
         <li>--tjs-scrollbar-gutter-stable-padding-inline</li>
         <li>--tjs-scrollbar-gutter-stable-padding-right</li>
      </ol>
      <p>
         By default, a special action in app shells calculates the appropriate gutter stable CSS variables based on any
         current styles of the app window / border. This is handy across various game systems that modify app window
         styles.
      </p>
      <p>
         You may globally alter though be sure to target your application ID / classes `--tjs-content-padding-length`
         to change the default padding margin away from `1rem`. See the `style` section in the associated demo
         component for more details.
      </p>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      //justify-content: center;

      // A very handy convenience CSS variable accessible in app shells. This particular variable is for right
      // `1rem` padding where the right padding takes into account the stable scrollbar gutter width.
      //padding: var(--tjs-scrollbar-gutter-stable-padding-right);

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

   p:first-of-type {
      margin-top: 0;
   }
</style>
