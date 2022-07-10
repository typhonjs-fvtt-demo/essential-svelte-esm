<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
   export let settingStore;

   const { application } = getContext('external');

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storePosition = foundry.utils.debounce(() => $settingStore = application.state.get(), 500);

   // Reactive statement to invoke debounce callback on Position changes.
   $: storePosition($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   This is a basic demo app that serializes position to client setting / local storage.
   <p>
   When the app is moved the app state is serialized after 500 milliseconds.
   <p>
   Note: If minimized on initial render the position state before being minimized is restored. Foundry doesn't support
   initially rendering an app in the minimized state.
</ApplicationShell>