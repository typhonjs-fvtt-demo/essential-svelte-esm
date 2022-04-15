<script>
   import * as easingFuncs    from 'svelte/easing';

   import { carouselStore }   from './carouselStore.js';

   const selectedIndex = carouselStore.selectedIndex;

   let cellCount = 9;

   $: carouselStore.setCells(cellCount);
</script>

<div class=header>
   <span>Cells:</span>
   <input class="cells-range" type="range" min="3" max="15" bind:value={cellCount} />
   <button on:click={() => $selectedIndex++}>Next</button>
   <button on:click={() => $selectedIndex--}>Previous</button>
</div>

<style lang=scss>
   button {
      width: fit-content;
      height: 20px;
      line-height: 18px;
   }

   div.header {
      display: flex;
      background: linear-gradient(337deg, rgba(2,0,36,0.75) 0%, rgba(40,40,207,0.5) 48%, rgba(149,171,176,0.75) 100%);
      border-bottom: solid black 1px;
      height: 30px;
      align-items: center;
      padding-left: 0.5em;
      white-space: nowrap;
   }
   span {
      margin-left: 0.5em;
      color: white;
   }
</style>