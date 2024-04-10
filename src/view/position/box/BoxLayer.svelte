<script>
   import { getContext }               from 'svelte';

   import { resizeObserver }           from '#runtime/svelte/action/dom';
   import { TJSApplicationShell }      from '#runtime/svelte/component/core';
   import { TJSPositionControlLayer }  from '#standard/component'

   import { boxStore, validator }      from './boxStore.js';

   import AutoBox                      from './boxes/AutoBox.svelte';
   import AutoBoxDebug                 from './boxes/AutoBoxDebug.svelte';
   import Box                          from './boxes/Box.svelte';
   import BoxDebug                     from './boxes/BoxDebug.svelte';
   import BoxHeader                    from './BoxHeader.svelte';

   export let elementRoot = void 0;

   const application = getContext('#external').application;

   const storeMinimized = application.reactive.storeUIState.minimized;

   const storeAuto = boxStore.auto;
   const storeDebug = boxStore.debug;
   const storeValidator = boxStore.validator;
   const storePCL = boxStore.pclEnabled;

   let component;
   let controls;

   const boundingRect = new DOMRect(0, 0, 0, 0);

   // Reactive statement to switch the box component between four variations depending on the auto & debug options.
   $: {
      component = $storeAuto ?
       $storeDebug ? AutoBoxDebug : AutoBox :
        $storeDebug ? BoxDebug : Box;
   }

   $: boxStore.setValidatorEnabled($storeValidator);

   function setDimension(offsetWidth, offsetHeight)
   {
      // When the application is minimized do not update the validator / app constraints.
      if ($storeMinimized) { return; }

      // When the PopOut module is enabled and this app is popped out 0 / 0 is received; ignore this.
      if (offsetWidth === 0 && offsetHeight === 0) { return; }

      // Avoid any changes when the application state is not rendered as setting `boundingRect` while the application is
      // closing can cause a loop in the Svelte runtime. This can happen occasionally, so just avoid it entirely.
      if (!application.rendered) { return; }

      validator.setDimension(offsetWidth, offsetHeight);

      boundingRect.width = offsetWidth;
      boundingRect.height = offsetHeight;

      // Force validation for all TJSPosition instances.
      for (const box of $boxStore) { box.position.set(); }
   }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <BoxHeader {controls} />
   <main use:resizeObserver={setDimension}>
      <TJSPositionControlLayer active={$storePCL} {boundingRect} bind:controls
                            components={$boxStore}
                            validate={$storeValidator}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={component} {box} />
      {/each}
      </TJSPositionControlLayer>
   </main>
</TJSApplicationShell>

<style lang=scss>
   main {
      position: relative;
      height: 100%;
      overflow: hidden;
   }
</style>
