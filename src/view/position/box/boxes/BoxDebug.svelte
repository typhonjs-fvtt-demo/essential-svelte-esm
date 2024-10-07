<script>
   import { applyStyles }     from '#runtime/svelte/action/dom/style';

   import { draggableGsap }   from '#runtime/svelte/gsap';

   import { applyPosition }   from '#runtime/svelte/store/position';

   import { boxStore }        from '../boxStore.js';

   /** @type {import('../boxStore').BoxData} */
   export let box = void 0;

   const labels = boxStore.labels;
   const transform = box.position.stores.transform;

   // This is run once when the component is created. It sets the position width / height back to initial bounds.
   box.position.set(box.initialBounds);

   let cornersText = '';

   let stylesDebug = {};

   $:
   {
      const boundingRect = $transform.boundingRect;
      const corners = $transform.corners;

      const scale = box.position.scale;

      cornersText = `(${parseInt(corners[0][0], 10)}, ${parseInt(corners[0][1], 10)})<br>(${
       parseInt(corners[1][0], 10)}, ${parseInt(corners[1][1], 10)})<br>(${parseInt(corners[2][0], 10)}, ${
        parseInt(corners[2][1], 10)})<br>(${parseInt(corners[3][0], 10)}, ${parseInt(corners[3][1], 10)})<br>Rot: ${
         Math.round(box.position.rotateZ)}°<br>Scale: ${scale ? scale.toFixed(2) : 1}`;

      stylesDebug.left = `${boundingRect.x}px`;
      stylesDebug.top = `${boundingRect.y}px`;
      stylesDebug.width = `${boundingRect.width}px`;
      stylesDebug.height = `${boundingRect.height}px`;
   }
</script>

<div class=box
     use:applyPosition={box.position}
     use:draggableGsap={{ position: box.position, inertia: true }}
     style:background={box.color}>
   {#if $labels}{@html cornersText}{/if}
</div>
<div class=debug use:applyStyles={stylesDebug}></div>

<style>
   div.box {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
      font-size: 12px;
      touch-action: none;
   }

   div.debug {
      position: absolute;
      background: rgba(100, 200, 255, 0.2);
      pointer-events: none;
      will-change: top, left, width, height;
   }
</style>
