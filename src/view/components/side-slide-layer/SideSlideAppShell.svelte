<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/core';

   import { TJSInput }           from '#standard/component/form';
   import { TJSSideSlideLayer }  from '#standard/component/layer';

   import { createLayerProps }   from './createLayerProps.js';
   import { createUIData }       from './createUIData.js';

   export let elementRoot = void 0;

   const { stores, inputs } = createUIData();

   // Bound stores must be defined at the top level, so destructure them.
   const { allowLocking, clickToOpen, duration, easingIn, easingOut, side, top, worldObject } = stores;

   const { application } = getContext('#external');

   // Retrieve the instance of TJSSideSlideLayer that is mounted in `#ui-middle`.
   const sidebarSlideLayer = application.sidebarSlideLayer;

   // Update component mounted to the Foundry sidebar directly w/ the entire world object storing all serialized props.
   $: sidebarSlideLayer?.$set($worldObject);
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
