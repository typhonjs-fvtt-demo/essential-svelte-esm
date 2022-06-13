<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { SessionStorage }     from '@typhonjs-fvtt/runtime/svelte/store';

   export let elementRoot;

   const context = getContext('external');
   const sessionStorage = new SessionStorage();

   // Easily get a store that is synchronized with session storage.
   const storageStore = sessionStorage.getStore('essential-svelte-esm.position');

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = context.application.position;

   // A debounced callback that serializes position after 500-millisecond delay.
   const storePosition = foundry.utils.debounce((data) => $storageStore = data, 500);

   // Reactive statement to invoke debounce callback on Position changes.
   $: storePosition($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   This is a basic demo app that serializes position to session storage.
   <p>
   When the app is moved Position is serialized after 500 milliseconds.
</ApplicationShell>