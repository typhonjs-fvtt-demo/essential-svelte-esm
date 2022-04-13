<script>
   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { carouselStore }         from './carouselStore.js';
   import Carousel                  from './Carousel.svelte';
   import Cell                      from './Cell.svelte';

   export let elementRoot;

   let cellCount = 9;

   $: carouselStore.setCells(cellCount);

   let selectedIndex = 1;
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <div class=header>
      <span>Cells:</span>
      <input class="cells-range" type="range" min="3" max="15" bind:value={cellCount} />
      <button on:click={() => selectedIndex++}>Next</button>
      <button on:click={() => selectedIndex--}>Previous</button>
   </div>

   <div class=scene>
      <Carousel bind:selectedIndex>
         {#each $carouselStore as cell (cell.id)}
            <Cell {cell} />
         {/each}
      </Carousel>
   </div>
</TJSApplicationShell>

<style lang="scss">
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

   .scene {
      //border: 1px solid #CCC;
      position: relative;
      width: 210px;
      height: 140px;
      margin: 80px auto;
      perspective: 1000px;
   }

   span {
      margin-left: 0.5em;
      color: white;
   }
</style>