<script>
   import { getContext }            from 'svelte';

   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { boxStore, validator }   from './boxStore.js';

   import Box                       from './Box.svelte';
   import BoxDebug                  from './BoxDebug.svelte';
   import Header                    from './Header.svelte';

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
   <Header />
   <main bind:this={validator.element} bind:offsetWidth={validator.width} bind:offsetHeight={validator.height}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={component} {box} />
      {/each}
   </main>
</TJSApplicationShell>

<style lang="scss">
   main {
      position: relative;
      height: 100%;
      overflow: hidden;
   }
</style>