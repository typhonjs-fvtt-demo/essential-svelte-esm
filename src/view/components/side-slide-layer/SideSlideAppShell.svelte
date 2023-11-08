<script>
   import { writable }              from 'svelte/store';
   import * as easings              from 'svelte/easing';

   import { ripple }                from '#runtime/svelte/action/animate';
   import { ApplicationShell }      from '#runtime/svelte/component/core';

   import { TJSButton }             from '#standard/component';
   import {
      TJSInput,
      TJSSelect,
      TJSSideSlideLayer }           from '#standard/component';

   import { createLayerProps }      from './createLayerProps.js';

   export let elementRoot = void 0;

   const storeStayOpen = writable(false);

   const inputStayOpen = {
      type: 'checkbox',
      label: 'Stay open:',
      store: storeStayOpen
   }

   const storeEasing = writable(easings.linear);

   const selectEasing = {
      label: 'Easing:',
      options: Object.keys(easings).map((key) => ({ value: easings[key], label: key })),
      store: storeEasing
   }

   const storeSide = writable('right');

   const selectSide = {
      label: 'Side:',
      options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }],
      store: storeSide
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <TJSSideSlideLayer {...createLayerProps()}
                         bind:side={$storeSide}
                         bind:stayOpen={$storeStayOpen}
                         bind:easing={$storeEasing}  />

      <TJSSelect select={selectSide} />
      <TJSSelect select={selectEasing} />
      <TJSInput input={inputStayOpen} />
   </main>
</ApplicationShell>

<style>
    main {
        --tjs-side-slide-layer-margin: 0 8px 0 8px;
    }
</style>
