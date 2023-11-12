<script>
   import { onMount }               from 'svelte';

   import { ApplicationShell }      from '#runtime/svelte/component/core';

   import {
      TJSInput,
      TJSSideSlideLayer }           from '#standard/component';

   import { createLayerProps }      from './createLayerProps.js';

   import { stores, inputs }        from './demoUIData.js';

   export let elementRoot = void 0;

   // Bound stores must be defined at the top level.
   const { allowLocking, clickToOpen, duration, easingIn, easingOut, side, top } = stores;

   let sidebarSlideLayer;

   // Mounts an instance of TJSSideSlideLayer to the `#ui-middle` div of the Foundry UI to "dock" it next to the
   // Foundry sidebar. Destroys the component when this demo app is closed.
   onMount(() =>
   {
      sidebarSlideLayer = new TJSSideSlideLayer({
         target: document.querySelector('#ui-middle'),
         props: createLayerProps()
      });

      return () => sidebarSlideLayer?.$destroy();
   });

   // Update mounted component on the Foundry sidebar directly except `side`.
   $: sidebarSlideLayer?.$set({
      allowLocking: $allowLocking,
      clickToOpen: $clickToOpen,
      duration: $duration,
      easingIn: $easingIn,
      easingOut: $easingOut,
      top: $top
   });
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <TJSSideSlideLayer {...createLayerProps()}
                         bind:allowLocking={$allowLocking}
                         bind:clickToOpen={$clickToOpen}
                         bind:duration={$duration}
                         bind:easingIn={$easingIn}
                         bind:easingOut={$easingOut}
                         bind:side={$side}
                         bind:top={$top} />

      <div>
         <TJSInput input={inputs.side} />
         <TJSInput input={inputs.easingIn} />
         <TJSInput input={inputs.easingOut} />
      </div>
      <div>
         <TJSInput input={inputs.duration} />
         <TJSInput input={inputs.allowLocking} />
      </div>
      <div>
         <TJSInput input={inputs.top} />
         <TJSInput input={inputs.clickToOpen} />
      </div>
   </main>
</ApplicationShell>

<style>
   /* Remove bad foundry universal style */
   main, main > * {
      flex: none;
   }

   main {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      margin-top: auto;
      height: fit-content;

      background: var(--tjs-input-background);
      border: var(--tjs-input-border);
      border-radius: var(--tjs-input-border-radius);
      padding: 0.5em;

      /* Provide a margin for the side slide layer */
      --tjs-side-slide-layer-margin: 0 8px 0 8px;

      /*--tjs-side-slide-layer-item-diameter: 50px;*/
   }

   div {
      display: flex;
      gap: 0.5em;
      align-items: center;
   }
</style>
