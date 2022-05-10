<script>
   import {
      applyPosition,
      resizeObserver }           from '@typhonjs-fvtt/runtime/svelte/action';

   import { draggableInertia }   from '@typhonjs-fvtt/runtime/svelte/gsap';

   export let box;

   // This is run once when the component is created. It sets the position width / height to 'auto'.
   box.position.set({ width: 'auto', height: 'auto' });
</script>

<div use:applyPosition={box.position}
     use:draggableInertia={{ position: box.position }}
     use:resizeObserver={box.position}
     style:background={box.color}></div>

<style>
   div {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
      min-width: 100px;
      min-height: 100px;
   }
</style>