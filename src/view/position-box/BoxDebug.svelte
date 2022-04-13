<script>
   import {
      applyPosition,
      applyStyles,
      draggable } from '@typhonjs-fvtt/runtime/svelte/action';

   export let box;

   const transform = box.position.stores.transform;

   let cornersText = '';

   let stylesDebug = {};

   $:
   {
      const boundingRect = $transform.boundingRect;
      const corners = $transform.corners;

      cornersText = `(${parseInt(corners[0][0], 10)}, ${parseInt(corners[0][1], 10)})<br>(${
       parseInt(corners[1][0], 10)}, ${parseInt(corners[1][1], 10)})<br>(${parseInt(corners[2][0], 10)}, ${
        parseInt(corners[2][1], 10)})<br>(${parseInt(corners[3][0], 10)}, ${parseInt(corners[3][1], 10)})`;

      stylesDebug = {
         left: `${boundingRect.x}px`,
         top: `${boundingRect.y}px`,
         width: `${boundingRect.width}px`,
         height: `${boundingRect.height}px`
      }

      // stylesDebug.left = `${boundingRect.x}px`;
      // stylesDebug.top = `${boundingRect.y}px`;
      // stylesDebug.width = `${boundingRect.width}px`;
      // stylesDebug.height = `${boundingRect.height}px`;
   }
</script>

<div class=box use:applyPosition={box.position} use:draggable={{ position: box.position }} style:background={box.color}>
     {@html cornersText}
<!--   ({parseInt($transform.corners[0][0], 10)}, {parseInt($transform.corners[0][1], 10)})<br>-->
<!--   ({parseInt($transform.corners[1][0], 10)}, {parseInt($transform.corners[1][1], 10)})<br>-->
<!--   ({parseInt($transform.corners[2][0], 10)}, {parseInt($transform.corners[2][1], 10)})<br>-->
<!--   ({parseInt($transform.corners[3][0], 10)}, {parseInt($transform.corners[3][1], 10)})<br>-->
</div>
<div class=debug use:applyStyles={stylesDebug}></div>

<style>
   div.box {
      position: absolute;
      border-radius: 0.25em;
      border: solid brown 2px;
      font-size: 12px;
      /*will-change: left, top, width, height;*/
   }
   div.debug {
      position: absolute;
      background: rgba(100, 200, 255, 0.2);
      pointer-events: none;
      /*will-change: left, top, width, height;*/
   }
</style>