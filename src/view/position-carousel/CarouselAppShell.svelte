<script>
   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { carouselStore }         from './carouselStore.js';
   import Carousel                  from './Carousel.svelte';
   import Cell                      from './Cell.svelte';
   import CarouselHeader            from './CarouselHeader.svelte';

   export let elementRoot;
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <CarouselHeader />
   <div class=scene>
      <Carousel>
         {#each $carouselStore as cell (cell.id)}
            <Cell {cell} />
         {/each}
      </Carousel>
   </div>
</TJSApplicationShell>

<style lang="scss">
   .scene {
      position: relative;
      width: 210px;
      height: 140px;
      margin: 80px auto;
      perspective: 1000px;
   }
</style>