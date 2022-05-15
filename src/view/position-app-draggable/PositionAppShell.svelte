<script>
   import { getContext }         from 'svelte';

   import { draggable }          from '@typhonjs-fvtt/runtime/svelte/action';
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { draggableGsap }      from '@typhonjs-fvtt/runtime/svelte/gsap';

   // Imports the loading / automatic GSAP plugin registration.
   import '@typhonjs-fvtt/runtime/svelte/gsap/plugin/bonus/InertiaPlugin';

   import {
      optionComponents,
      optionStores }             from './options/index.js';

   export let elementRoot;

   let draggableSelected = draggable;

   let draggableOptionStore;
   let draggableOptionComp;

   $: {
      draggableOptionStore = optionStores[draggableSelected];
      draggableOptionComp = optionComponents[draggableSelected];
   }

   const application = getContext('external').application;

   const { top, left, width, height } = application.position.stores;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot draggable={draggableSelected} draggableOptions={$draggableOptionStore}>
   <main>
      <h1>Reactive `draggable`</h1>

      <label>
         top: <input type=text bind:value={$top} readonly>
         left: <input type=text bind:value={$left} readonly>
         width: <input type=text bind:value={$width} readonly>
         height: <input type=text bind:value={$height} readonly>
      </label>

      <div>
         <label for=draggableSelect>Draggable Implementation:</label>
         <select id=draggableSelect bind:value={draggableSelected}>
            <option value={draggable}>draggable</option>
            <option value={draggableGsap}>draggableGsap</option>
         </select>
      </div>

      <hr>
         <svelte:component this={draggableOptionComp} options={$draggableOptionStore} />
      <hr>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 2em;
         font-weight: 100;
      }

      input, select { margin: 6px }
      input[type=text] { max-width: 5em }

      label {
         display: flex;
         align-items: center;
         justify-content: center;
      }

      //.flex {
      //   display: flex;
      //   height: fit-content;
      //   align-items: center;
      //}

      div {
         display: flex;
         align-items: center;
         justify-content: center;

         label {
            text-align: right;
         }
      }

      hr { width: 96% }
   }
</style>