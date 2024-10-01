<script>
   import { getContext }         from 'svelte';

   import { applyStyles }        from '#runtime/svelte/action/dom';
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import {
      optionStores,
      storeDraggable }           from './dialog/draggable/index.js';

   export let elementRoot = void 0;

   const application = getContext('#external').application;

   const { top, left, width, height, rotateX, rotateY, rotateZ, scale, zIndex } = application.position.stores;

   const { dragging, resizing } = application.reactive.storeUIState;

   const storeDebug = application.storeDebug;

   let nullishRotateX, nullishRotateY, nullishRotateZ, nullishScale;

   $: nullishRotateX = Number.isFinite($rotateX) ? $rotateX : 'null';
   $: nullishRotateY = Number.isFinite($rotateY) ? $rotateY : 'null';
   $: nullishRotateZ = Number.isFinite($rotateZ) ? $rotateZ : 'null';

   $: nullishScale = Number.isFinite($scale) ? $scale : 'null';

   let stylesDebug = {};

   const transform = application.position.stores.transform;

   let draggableOptionsStore;

   $: draggableOptionsStore = optionStores[$storeDraggable];

   $:
   {
      const boundingRect = $transform.boundingRect;

      stylesDebug.left = `${boundingRect.x}px`;
      stylesDebug.top = `${boundingRect.y}px`;
      stylesDebug.width = `${boundingRect.width}px`;
      stylesDebug.height = `${boundingRect.height}px`;
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot draggable={$storeDraggable} draggableOptions={$draggableOptionsStore}>
   <main>
      <h1>Reactive `position`</h1>

      <section>
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
            scale: <input type=text bind:value={nullishScale} readonly>
            zIndex: <input type=text bind:value={$zIndex} readonly>
            dragging: <input type=text bind:value={$dragging} readonly>
            resizing: <input type=text bind:value={$resizing} readonly>
         </label>
      </section>

      <div class=bottom>
         <a href="https://learn.svelte.dev/tutorial/welcome-to-svelte">Interactive Svelte tutorial (highly recommended)</a>
         <br>
         <a href="https://www.youtube.com/playlist?list=PLoKaNN3BjQX3mxDEVG3oGJx2ByXnue_gR">Svelte tutorial videos</a>
      </div>
   </main>
</ApplicationShell>
{#if $storeDebug}
   <div class=debug use:applyStyles={stylesDebug}></div>
{/if}

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      // Prevents clicks on readable inputs.
      section {
         pointer-events:none;
      }

      div.bottom {
         margin-top: auto;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 2em;
         font-weight: 100;
      }

      input { margin: 6px; }
      input[type=text] { max-width: 5em }

      label {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   div.debug {
      position: absolute;
      background: rgba(100, 200, 255, 0.2);
      pointer-events: none;
      will-change: top, left, width, height;
      z-index: 999999;
   }
</style>
