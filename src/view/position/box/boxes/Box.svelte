<script>
   import { draggableGsap }   from '#runtime/svelte/gsap';
   import { applyPosition }   from '#runtime/svelte/store/position';

   /** @type {import('../boxStore').BoxData} */
   export let box = void 0;

   // This is run once when the component is created. It sets the position width / height back to initial bounds.
   box.position.set(box.initialBounds);
</script>

<div use:applyPosition={box.position}
     use:draggableGsap={{ position: box.position, inertia: true }}
     style:background={box.color}>
</div>

<style>
   div {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
      touch-action: none;
   }
</style>
