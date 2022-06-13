<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
   export let settingStore;

   const context = getContext('external');

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = context.application.position;

   // A debounced callback that serializes position after 500-millisecond delay.
   const storePosition = foundry.utils.debounce((data) => $settingStore = data, 500);

   // Reactive statement to invoke debounce callback on Position changes.
   $: storePosition($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   This is a basic demo app that serializes position to client setting / local storage.
   <p>
   When the app is moved Position is serialized after 500 milliseconds.
</ApplicationShell>