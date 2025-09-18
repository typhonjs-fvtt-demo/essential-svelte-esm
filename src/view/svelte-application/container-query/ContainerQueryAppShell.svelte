<script>
   /**
    * All app shells support container queries (CQ) out of the box with the following container names:
    * - `tjs-app-content` (For the app window content inline-size)
    *
    * This is a basic demo as CQ are a nuanced topic. They are like media queries, but allow
    * significantly more control over dynamic app window layout.
    *
    * Of note is that you can not have the app `width` as `auto` and also use CQ at the same time. TRL will disable
    * CQ when the app position width is 'auto'. You may however set `height` as `auto`.
    */
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import CQDemoContent          from './CQDemoContent.svelte';
   import CQDemoControls         from './CQDemoControls.svelte';

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
-->
<ApplicationShell bind:elementRoot contentWidth={true}>
   <CQDemoContent />
   <CQDemoControls />
</ApplicationShell>

