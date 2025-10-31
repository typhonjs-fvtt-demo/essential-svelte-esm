<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { Timing }             from '#runtime/util';

   import { settings }           from '#constants';
   import { gameSettings }       from '#gameSettings';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   const settingStore = gameSettings.getStore(settings.appStateUser);

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storePosition = Timing.debounce((pos) => $settingStore = application.state.current(), 500);

   // Reactive statement to invoke debounce callback on TJSPosition changes.
   $: storePosition($position);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main class=scrollable>
      This is a basic demo app that serializes position to a user setting in the Foundry DB associated with the current
      user. This is helpful to store app positioning across Foundry server restarts.
      <p>
         When the app is moved the app state is serialized after 500 milliseconds.
      </p>
      <p>
         Note: If minimized on initial render the position state before being minimized is restored. Foundry doesn't
         support initially rendering an app in the minimized state.
      </p>
   </main>
</ApplicationShell>
