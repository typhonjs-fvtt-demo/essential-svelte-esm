<script>
   import * as easingFuncs    from 'svelte/easing';

   import { carouselStore }   from './carouselStore.js';

   const selectedIndex = carouselStore.selectedIndex;

   const storeDuration = carouselStore.duration;
   const storeEasing = carouselStore.easing;

   let cellCount = $carouselStore.length;

   const setCells = foundry.utils.debounce(() => carouselStore.setCells(cellCount), 80);

   $: setCells(cellCount);
</script>

<div class=header>
   <label class=duration for=cells>
      Cells:
      <input class=cells-range type=range min=3 max=16 id=cells bind:value={cellCount} />
      <input type=text bind:value={$carouselStore.length} readonly>
   </label>
   <label class=duration for=duration>
      Duration:
      <input type=range min=0 max=3000 id=duration bind:value={$storeDuration}>
      <input type=text bind:value={$storeDuration} readonly>
   </label>
   <label for=easing>
      Easing:
      <select id=easing bind:value={$storeEasing}>
         {#each Object.keys(easingFuncs) as prop}
            <option value={easingFuncs[prop]}>{prop}</option>
         {/each}
      </select>
   </label>
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
      padding-left: 0.25em;
      white-space: nowrap;
   }

   label {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      padding-left: 0.25em;
   }

   input { color: white; margin: 3px 6px }
   input[type=range] { max-width: 12em }
   input[type=text] { max-width: 2.75em }

   select {
      color: white;
      margin: 3px 6px;
   }

   select option {
      background: rgba(60,60,207,0.8);
      color: inherit;
   }
</style>