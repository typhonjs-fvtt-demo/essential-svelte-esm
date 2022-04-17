<script>
   import { getContext }            from 'svelte';

   import { resizeObserver }        from '@typhonjs-fvtt/runtime/svelte/action';
   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { boxStore, validator }   from './boxStore.js';

   import Box                       from './Box.svelte';
   import BoxDebug                  from './BoxDebug.svelte';
   import BoxHeader                 from './BoxHeader.svelte';

   export let elementRoot;

   const application = getContext('external').application;

   const storeDebug = boxStore.debug;
   const storeDimension = application.position.stores.dimension;

   let component;

   $: component = $storeDebug ? BoxDebug : Box;

   $: if ($storeDimension) { boxStore.validate(); }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <BoxHeader />
   <main use:resizeObserver={validator}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={component} {box} />
      {/each}
   </main>
</TJSApplicationShell>

<style lang=scss>
   main {
      position: relative;
      height: 100%;
      overflow: hidden;
   }
</style>