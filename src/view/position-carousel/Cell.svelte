<script>
   import { fade }            from 'svelte/transition';
   import { applyPosition }   from '@typhonjs-fvtt/runtime/svelte/action';

   import { carouselStore }   from './carouselStore.js';

   export let cell;
</script>

<div use:applyPosition={cell.position}
     transition:fade
     on:click={() => carouselStore.selectedIndex.set(cell.id)}
     style:background={cell.color}>
   {cell.id}
</div>

<style>
   div {
      position: absolute;
      border: 2px solid black;
      border-radius: 16px;
      line-height: 116px;
      font-size: 80px;
      font-weight: bold;
      color: white;
      text-align: center;
      transition: transform 1s;
   }
</style>