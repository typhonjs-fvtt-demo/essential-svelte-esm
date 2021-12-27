<script>
   import { getContext }         from 'svelte';
   import { fade, scale }        from 'svelte/transition';
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;

   const foundryApp = getContext('external').foundryApp;

   const storeZIndex = foundryApp.reactive.storeAppOptions.zIndex
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot transition={scale} transitionOptions={{duration: 1000}}>
   <main>
      <h1>Reactive `z-index`</h1>

      <label>
         <input type="range" min="20" max="1000" bind:value={$storeZIndex}>
         <input type=number bind:value={$storeZIndex} readonly>
      </label>

      <button on:click={() => foundryApp.bringToTop()}>Invoke: `bringToTop` (activated when z-index is lower than top popOut app)</button>
      <div class=bottom>
         <a href="https://svelte.dev/tutorial">Interactive Svelte tutorial (highly recommended)</a>
         <br>
         <a href="https://www.youtube.com/playlist?list=PLoKaNN3BjQX3mxDEVG3oGJx2ByXnue_gR">Svelte tutorial videos</a>
      </div>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      button, div.bottom {
         margin-top: auto;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 3em;
         font-weight: 100;
      }

      input { margin: 6px }
      input[type=range] { min-width: 80% }
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
         opacity: 1;
      }

      label {
         display: flex;
         align-items: center;
      }
   }
</style>