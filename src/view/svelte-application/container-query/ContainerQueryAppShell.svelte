<script>
   /**
    * All app shells support container queries (CQ) out of the box with the following container names:
    * - `tjs-app-content` (For the app window content inline-size)
    *
    * This is a complete demo that shows the reactive control TRL provides over CQ. They are like media queries, but
    * allow significantly more control over dynamic app window content layout and styles.
    *
    * `inline-size` CQ provides size queries for `width` and `height` can be `auto.
    *
    * `size` CQ provides size queries for `width` and `height` and neither `width` / `height` may be auto.
    *
    * TRL will disable CQ when the app position width / height causes invalid / indeterminate CQ states.
    */
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import CQDemoContent          from './content/CQDemoContent.svelte';
   import CQDemoControls         from './controls/CQDemoControls.svelte';

   export let elementRoot = void 0;

   // CQ works by the inner width of an element so that is the offset width of the element minus the left / right
   // border & padding constraints. Most Foundry apps have a window content padding of 16px on both left / right sides
   // in addition to 1px left / right app border. TRL can automatically monitor the width of the window content by
   // binding to `contentWidth` and setting an initial truthy value.
</script>

<svelte:options accessors={true}/>

<!--
   You may enable window content resize observation by passing `contentWidth` as `true`.
   You may also bind to `contentWidth` / `contentHeight`, but must pass `true` initially before values are set.
   There are stores for `contentWidth` and such in the `#internal` context.
   This is used in `CQDemoControls` to display the app window content width and height.
-->
<ApplicationShell bind:elementRoot contentWidth={true}>
   <CQDemoContent />
   <CQDemoControls />
</ApplicationShell>

