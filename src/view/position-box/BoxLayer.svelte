<script>
   import { getContext }            from 'svelte';
   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { boxStore, validator }   from './boxStore.js';

   import Box                       from './Box.svelte';
   import BoxDebug                  from './BoxDebug.svelte';

   export let elementRoot;

   const application = getContext('external').application;

   const storeDimension = application.position.stores.dimension;

   const storeDebug = boxStore.debug;
   let component;

   $: component = $storeDebug ? BoxDebug : Box;

   $: if ($storeDimension) { boxStore.validate(); }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <div class=header>
      <button on:click={() => boxStore.add(5)}>Add 5</button>
      <button on:click={() => boxStore.add(50)}>Add 50</button>
      <button on:click={() => boxStore.randomLocation()}>Random Location</button>
      <button on:click={() => boxStore.randomScaleRot()}>Random Scale / Rotation</button>
      <button on:click={() => boxStore.removeRandom(50)}>Remove 50</button>
      <button on:click={() => boxStore.removeAll()}>Remove All</button>
      <span>Validation:</span>
      <input type=checkbox bind:checked={validator.enabled}/>
      <span>Debug:</span>
      <input type=checkbox bind:checked={$storeDebug}/>
      <span>Count: {$boxStore.length}</span>
   </div>
   <main bind:this={validator.element} bind:offsetWidth={validator.width} bind:offsetHeight={validator.height}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={component} {box} />
      {/each}
   </main>
</TJSApplicationShell>

<style lang="scss">
   button {
      width: fit-content;
      height: 20px;
      line-height: 18px;
   }

   main {
      position: relative;
      height: 100%;
      overflow: hidden;
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