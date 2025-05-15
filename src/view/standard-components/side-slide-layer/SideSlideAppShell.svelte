<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { TJSInput }           from '#standard/component/form';
   import { TJSSideSlideLayer }  from '#standard/component/layer/side-slide';

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
   <section>
      <p>
         `TJSSideSlideLayer` provides an absolutely position layer taking up the entire space of the current stacking
         context. When used inside of an `ApplicationShell` this is the entire app window. Notice the tabs to the right
         side. Hover over them to reveal the tab. Right click on a tab to lock it. Below are several of the reactive
         controls available to control the side slide layer.
      </p>
      <p>
         You can mount Svelte components as panels that slide out. You can also mount custom components as the tab icon
         content versus just using an icon. The "target" panel will show tokens that are currently targeted.
      </p>
      <p>
         When opened this app also mounts `TJSSideSlideLayer` in the main Foundry / browser window to an element that
         allows the side slide layer to be positioned in a way that works smoothly with the main Foundry sidebar.
      </p>
   </section>
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
   div {
      display: flex;
      gap: 0.5em;
      align-items: center;
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

      --tjs-input-number-width: 5rem;
      --tjs-input-number-text-align: center;

      /* Provide a margin for the side slide layer */
      --tjs-side-slide-layer-margin: 0 8px 0 8px;

      /*--tjs-side-slide-layer-item-diameter: 50px;*/
   }

   section {
      padding: 0 40px;
   }
</style>
