<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { Timing }             from '#runtime/util';

   import { sessionConstants }   from '#constants';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   const storageStore = application.reactive.sessionStorage.getStore(sessionConstants.appStateClient);

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storeAppState = Timing.debounce(() => $storageStore = application.state.current(), 500);

   // Reactive statement to invoke debounce callback on TJSPosition changes.
   $: storeAppState($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   This is a basic demo app that serializes app state to session storage.
   <p>
   When the app is moved the app state is serialized after 500 milliseconds.
   </p>
   <p>
   Note: If minimized on initial render the position state before being minimized is restored. Foundry doesn't support
   initially rendering an app in the minimized state.
   </p>
</ApplicationShell>
