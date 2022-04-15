<script>
   import * as easingFuncs    from 'svelte/easing';

   import { carouselStore }   from './carouselStore.js';

   const selectedIndex = carouselStore.selectedIndex;

   const storeDuration = carouselStore.duration;
   const storeEasing = carouselStore.easing;

   let cellCount = 9;

   $: carouselStore.setCells(cellCount);
</script>

<div class=header>
   <span>Cells:</span>
   <input class="cells-range" type="range" min="3" max="15" bind:value={cellCount} />
   <span>{$carouselStore.length}</span>
   <label class=duration for=duration>Duration:</label>
   <input type=range min=0 max=3000 id=duration bind:value={$storeDuration}>
   <input type=text bind:value={$storeDuration} readonly>
   <label for=easing>Easing:</label>
   <select id=easing bind:value={$storeEasing}>
      {#each Object.keys(easingFuncs) as prop}
         <option value={easingFuncs[prop]}>{prop}</option>
      {/each}
   </select>
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

   label {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
   }

   input { color: white; margin: 3px 3px }
   input[type=range] { max-width: 3.75em }
   input[type=text] { max-width: 3em }

   select {
      color: white;
      margin: 3px 6px;
   }

   select option {
      background: rgba(60,60,207,0.8);
      color: inherit;
   }

   span {
      margin-left: 0.5em;
      color: white;
   }
</style>