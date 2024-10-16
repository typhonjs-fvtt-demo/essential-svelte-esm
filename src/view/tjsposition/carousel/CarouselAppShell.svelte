<script>
   import { TJSApplicationShell }   from '#runtime/svelte/component/application';

   import { carouselStore }         from './carouselStore.js';
   import Carousel                  from './Carousel.svelte';
   import Cell                      from './Cell.svelte';
   import CarouselHeader            from './CarouselHeader.svelte';

   export let elementRoot = void 0;

   const storePerspective = carouselStore.perspective;

   let perspective;

   $: perspective = `${$storePerspective}px`;
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0, overflow: 'hidden' }}>
   <CarouselHeader />
   <div class=scene style:perspective>
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
      width: 190px;
      height: 140px;
      margin: 80px auto;
   }
</style>
