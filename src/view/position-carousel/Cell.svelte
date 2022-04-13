<script>
   import { fade } from 'svelte/transition';

   import { applyPosition } from '@typhonjs-fvtt/runtime/svelte/action';

   export let cell;

   // $: console.log(cell);

   //
</script>

<div use:applyPosition={cell.position}
     style:background={cell.color}
     transition:fade>{cell.id}</div>

<style>
   div {
      position: absolute;
      border: 2px solid black;
      line-height: 116px;
      font-size: 80px;
      font-weight: bold;
      color: white;
      text-align: center;
      transition: transform 1s;

      /*top: 10px;*/
      /*left: 10px;*/
      /*width: 190px;*/
      /*height: 120px;*/
   }
</style>