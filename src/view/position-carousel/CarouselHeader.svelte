<script>
   import {
      easingFunc,
      easingList }      from '@typhonjs-fvtt/runtime/svelte/gsap';

   import { carouselStore }   from './carouselStore.js';

   const selectedIndex = carouselStore.selectedIndex;

   const storeDuration = carouselStore.duration;
   const storeEase = carouselStore.ease;
   const storePerspective = carouselStore.perspective;

   let cellCount = $carouselStore.length;

   const setCells = foundry.utils.debounce(() => carouselStore.setCells(cellCount), 80);

   $: setCells(cellCount);
</script>

<div class="header flex">
   <div class="container flex-vert flex-end">
      <label for=cells>
         Cells:
         <input class=cells-range type=range min=3 max=16 id=cells bind:value={cellCount} />
         <input type=text bind:value={$carouselStore.length} readonly>
      </label>
      <label for=persective>
         Perspective:
         <input type=range min=10 max=1200 id=persective bind:value={$storePerspective}>
         <input type=text bind:value={$storePerspective} readonly>
      </label>
   </div>
   <div class="container flex-vert">
      <label for=duration>
         Duration:
         <input type=range min=0 max=3 step=0.1 id=duration bind:value={$storeDuration}>
         <input type=text bind:value={$storeDuration} readonly>
      </label>
      <label for=easing>
         Easing:
         <select id=easing bind:value={$storeEase}>
            {#each easingList as entry}
               <option value={easingFunc[entry]}>{entry}</option>
            {/each}
         </select>
      </label>
   </div>
   <a on:click={() => $selectedIndex--}>
      <i class="fas fa-arrow-left"></i>
   </a>
   <a on:click={() => $selectedIndex++}>
      <i class="fas fa-arrow-right"></i>
   </a>
</div>

<style lang=scss>
   div.container {
      display: flex;
      justify-content: center;
      border-radius: 0.25em;
      border: 2px solid rgba(60,60,207,0.8);
      padding: 0 0.25em;
      height: 95%;
      margin-left: 0.25em
   }

   div.header {
      background: linear-gradient(337deg, rgba(2,0,36,0.75) 0%, rgba(40,40,207,0.5) 48%, rgba(149,171,176,0.75) 100%);
      border-bottom: solid black 1px;
      white-space: nowrap;
      color: white;
   }

   .flex {
      display: flex;
      height: fit-content;
      align-items: center;
   }

   .flex-end {
      align-items: flex-end;
   }

   .flex-vert {
      display: flex;
      flex-direction: column;
      height: fit-content;
      justify-content: center;
   }

   i {
      font-size: 50px;
      margin-left: 20px;
   }

   label {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 0.25em;
   }

   input { color: white; margin: 3px 6px }
   input[type=range] { max-width: 5em }
   input[type=text] { max-width: 2.75em }

   select {
      color: white;
      margin: 3px 6px;
      width: 130px
   }

   select option {
      background: rgba(60,60,207,0.8);
      color: inherit;
   }
</style>