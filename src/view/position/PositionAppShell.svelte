<script>
   import { getContext }         from 'svelte';
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;

   const application = getContext('external').application;

   const { top, left, width, height, rotateX, rotateY, rotateZ, scale, translateX, translateY, translateZ,
    zIndex } = application.position.stores;

   const { dragging, resizing } = application.reactive.storeUIState;

   let nullishRotateX, nullishRotateY, nullishRotateZ, nullishScale, nullishTranslateX, nullishTranslateY,
    nullishTranslateZ;

   $: nullishRotateX = Number.isFinite($rotateX) ? $rotateX : 'null';
   $: nullishRotateY = Number.isFinite($rotateY) ? $rotateY : 'null';
   $: nullishRotateZ = Number.isFinite($rotateZ) ? $rotateZ : 'null';

   $: nullishScale = Number.isFinite($scale) ? $scale : 'null';

   $: nullishTranslateX = Number.isFinite($translateX) ? $translateX : 'null';
   $: nullishTranslateY = Number.isFinite($translateY) ? $translateY : 'null';
   $: nullishTranslateZ = Number.isFinite($translateZ) ? $translateZ : 'null';
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <h1>Reactive `position`</h1>

      <label>
         top: <input type=text bind:value={$top} readonly>
         left: <input type=text bind:value={$left} readonly>
         width: <input type=text bind:value={$width} readonly>
         height: <input type=text bind:value={$height} readonly>
      </label>

      <label>
         rotateX: <input type=text bind:value={nullishRotateX} readonly>
         rotateY: <input type=text bind:value={nullishRotateY} readonly>
         rotateZ: <input type=text bind:value={nullishRotateZ} readonly>
      </label>

      <label>
         translateX: <input type=text bind:value={nullishTranslateX} readonly>
         translateY: <input type=text bind:value={nullishTranslateY} readonly>
         translateZ: <input type=text bind:value={nullishTranslateZ} readonly>
      </label>

      <label>
         scale: <input type=text bind:value={nullishScale} readonly>
         zIndex: <input type=text bind:value={$zIndex} readonly>
         dragging: <input type=text bind:value={$dragging} readonly>
         resizing: <input type=text bind:value={$resizing} readonly>
      </label>

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

      div.bottom {
         margin-top: auto;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 2em;
         font-weight: 100;
      }

      input { margin: 6px }
      input[type=text] { max-width: 5em }

      label {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
</style>