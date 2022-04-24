<script>
   import {
      applyPosition,
      draggable } from '@typhonjs-fvtt/runtime/svelte/action';

   export let box;

   // This is run once when the component is created. It sets the position width / height back to initial bounds.
   const bounds = box.position._initialBounds;
   box.position.set({ width: bounds, height: bounds });
</script>

<div use:applyPosition={box.position}
     use:draggable={{ position: box.position }}
     style:background={box.color}>
</div>

<style>
   div {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
   }
</style>