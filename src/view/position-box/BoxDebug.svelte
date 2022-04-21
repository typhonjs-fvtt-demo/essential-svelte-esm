<script>
   import {
      applyPosition,
      applyStyles,
      draggable }       from '@typhonjs-fvtt/runtime/svelte/action';

   import { boxStore }  from './boxStore.js';

   export let box;

   const labels = boxStore.labels;
   const transform = box.position.stores.transform;

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

<div class=box use:applyPosition={box.position} use:draggable={{ position: box.position }} style:background={box.color}>
   {#if $labels}{@html cornersText}{/if}
</div>
<div class=debug use:applyStyles={stylesDebug}></div>

<style>
   div.box {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
      font-size: 12px;
   }
   div.debug {
      position: absolute;
      background: rgba(100, 200, 255, 0.2);
      pointer-events: none;
      will-change: top, left, width, height;
   }
</style>