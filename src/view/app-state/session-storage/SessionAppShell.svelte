<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { sessionConstants }   from '../../../constants.js';

   export let elementRoot = void 0;

   const { application } = getContext('external');

   const storageStore = application.reactive.sessionStorage.getStore(sessionConstants.appState);

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storeAppState = foundry.utils.debounce(() => $storageStore = application.state.get(), 500);

   // Reactive statement to invoke debounce callback on Position changes.
   $: storeAppState($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   This is a basic demo app that serializes app state to session storage.
   <p>
   When the app is moved the app state is serialized after 500 milliseconds.
   <p>
   Note: If minimized on initial render the position state before being minimized is restored. Foundry doesn't support
   initially rendering an app in the minimized state.
</ApplicationShell>