<script>
   /**
    * This demo shows how the `animateWAAPI` Svelte action works. This composable action provides a reactive mechanism
    * to defined reactive WAAPI animations.
    *
    * @componentDescription
    */

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { animateWAAPI }       from '#standard/action/animate/composable';

   import { TJSInput }           from '#standard/component/form';

   import {
      inputData,
      keyframes }                from './createData.js';

   // ApplicationShell contract.
   export let elementRoot = void 0;

   // Svelte stores must be declared at the top level.
   const storeDuration = inputData.duration.store;
   const storeEnabled = inputData.enabled.store;
   const storeEvent = inputData.event.store;
   const storeKeyframes = inputData.keyframes.store;
   const storeStrategy = inputData.strategy.store;

   // Create specific action instance of `animateWAAPI`.
   const animate = animateWAAPI();

   // When any input / store data changes regenerate the action options.
   $: animateOptions = {
      keyframes: keyframes[$storeKeyframes],
      duration: $storeDuration,
      enabled: $storeEnabled,
      event: $storeEvent,
      strategy: $storeStrategy
   };
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section>
         <p>
            `animateWAAPI` provides a composable action that makes it easy to dynamically apply web animations to an
            element. Click the button below and explore several of the options available to dynamically change the
            animation.
         </p>
      </section>

      <section>
         <!-- The `animateWAAPI` action instance is used on the button below and `animateOptions` updates the action
         options.
         -->
         <button use:animate={animateOptions}>
            Click Me!
         </button>
      </section>

      <fieldset class="tjs-panel-content tjs-panel-content--flex-col">
         <legend class=tjs-panel-legend>Action Controls</legend>
         <div class=row>
            <TJSInput input={inputData.enabled} />
            <TJSInput input={inputData.keyframes} />
         </div>
         <div class=row>
            <TJSInput input={inputData.strategy} />
            <TJSInput input={inputData.event} />
         </div>
         <div class=row><TJSInput input={inputData.duration} /></div>
      </fieldset>
   </main>
</ApplicationShell>

<style>
   main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
   }

   button {
      width: fit-content;
      margin: 0 auto;
   }

   .row {
      --tjs-input-number-width: 4rem;
      --tjs-input-number-text-align: center;
      display: flex;
      gap: 0.5rem;
      align-items: center;
   }
</style>
