<script>
   import { onMount }               from 'svelte';

   import { writable }              from 'svelte/store';
   import * as easings              from 'svelte/easing';

   import { ApplicationShell }      from '#runtime/svelte/component/core';

   import {
      TJSInput,
      TJSSideSlideLayer }           from '#standard/component';

   import { createLayerProps }      from './createLayerProps.js';

   export let elementRoot = void 0;

   const storeDuration = writable(200);

   const inputDuration = {
      type: 'range',
      label: 'Duration:',
      min: 200,
      max: 2000,
      store: storeDuration
   }

   const storeEasingIn = writable(easings.linear);

   const inputEasingIn = {
      type: 'select',
      label: 'Easing In:',
      options: Object.keys(easings).map((key) => ({ value: easings[key], label: key })),
      store: storeEasingIn
   }

   const storeEasingOut = writable(easings.linear);

   const inputEasingOut = {
      type: 'select',
      label: 'Easing Out:',
      options: Object.keys(easings).map((key) => ({ value: easings[key], label: key })),
      store: storeEasingOut
   }

   const storeSide = writable('right');

   const inputSide = {
      type: 'select',
      label: 'Side:',
      options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }],
      store: storeSide
   }

   const storeStayOpen = writable(false);

   const inputStayOpen = {
      type: 'checkbox',
      label: 'Stay open:',
      store: storeStayOpen
   }

   let sidebarSlideLayer;

   onMount(() =>
   {
      sidebarSlideLayer = new TJSSideSlideLayer({
         target: document.querySelector('#ui-middle'),
         props: createLayerProps()
      });

      return () => sidebarSlideLayer?.$destroy();
   });

</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <TJSSideSlideLayer {...createLayerProps()}
                         bind:duration={$storeDuration}
                         bind:inEasing={$storeEasingIn}
                         bind:outEasing={$storeEasingOut}
                         bind:side={$storeSide}
                         bind:stayOpen={$storeStayOpen} />

      <div>
         <TJSInput input={inputSide} />
         <TJSInput input={inputEasingIn} />
         <TJSInput input={inputEasingOut} />
      </div>
      <div>
         <TJSInput input={inputDuration} />
         <TJSInput input={inputStayOpen} />
         <TJSInput type={'button'} label={'Reset'} on:press={() => console.log(`!!! Pressed`)} />
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

      --tjs-side-slide-layer-item-diameter: 50px;
      --tjs-side-slide-layer-item-font-size: 20px;
   }

   div {
      display: flex;
      gap: 0.5em;
      align-items: center;
   }
</style>
