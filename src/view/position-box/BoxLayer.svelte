<script>
   import { getContext }            from 'svelte';

   import { resizeObserver }        from '@typhonjs-fvtt/runtime/svelte/action';
   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { boxStore, validator }   from './boxStore.js';

   import AutoBox                   from './boxes/AutoBox.svelte';
   import AutoBoxDebug              from './boxes/AutoBoxDebug.svelte';
   import Box                       from './boxes/Box.svelte';
   import BoxDebug                  from './boxes/BoxDebug.svelte';
   import BoxHeader                 from './BoxHeader.svelte';

   export let elementRoot;

   const application = getContext('external').application;

   const storeAuto = boxStore.auto;
   const storeDebug = boxStore.debug;
   const storeValidator = boxStore.validator;

   let component;

   // Reactive statement to switch the box component between four variations depending on the auto & debug options.
   $: {
      component = $storeAuto ?
       $storeDebug ? AutoBoxDebug : AutoBox :
       $storeDebug ? BoxDebug : Box;
   }

   $:
   {
      validator.enabled = $storeValidator;

      // When the validator is turned on and there is box data then force a set on each box position to update validation.
      if ($storeValidator && $boxStore.length > 0)
      {
         for (const box of $boxStore) { box.position.set(); }
      }
   }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <BoxHeader />
   <main use:resizeObserver={boxStore}>
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