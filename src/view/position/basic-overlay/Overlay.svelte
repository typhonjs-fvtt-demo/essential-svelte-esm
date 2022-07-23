<script>
   import { getContext } from 'svelte';

   import {
      applyPosition,
      draggable } from '@typhonjs-fvtt/runtime/svelte/action';

   export let elementRoot = void 0;

   const context = getContext('external');

   // Store Application reference.
   const position = context.application.position;
</script>

<svelte:options accessors={true}/>

<!-- width & height will be what you set in app options -->
<div bind:this={elementRoot}
     use:applyPosition={position}
     use:draggable={{position}}
     on:pointerdown={(event) => { if (event.button === 0) { context.application.bringToTop(); } }}
     on:contextmenu={() => context.application.close()}>
   Context click to close
</div>

<style>
   div {
      position: absolute;
      background: rgba(255, 100, 100, 0.5);
      font-size: 2em;
   }
</style>