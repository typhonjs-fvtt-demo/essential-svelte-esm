<script>
   import {
      applyPosition,
      draggable } from '@typhonjs-fvtt/runtime/svelte/action';

   export let box;
</script>

<div use:applyPosition={box.position} use:draggable={{ position: box.position }} style:background={box.color}></div>

<style>
   div {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
      will-change: transform;
      contain: style;
   }
</style>