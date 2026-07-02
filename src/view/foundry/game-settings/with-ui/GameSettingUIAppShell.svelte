<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { TJSSettingsSwap }    from '#standard/component/fvtt/settings';

   import { demoGameSettingsWithUI } from './gameSettingsWithUI.js';

   import MainAppContent         from './MainAppContent.svelte';

   import Header                 from './settings/Header.svelte';
   import Footer                 from './settings/Footer.svelte';

   export let elementRoot = void 0;

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot scrollContainer={true}>
   <TJSSettingsSwap settings={demoGameSettingsWithUI} options={{ efx: 'ripple', storage: application.reactive.sessionStorage }}>
      <MainAppContent />

      <!-- Uncomment line below to add header to settings edit panel. -->
      <!--<Header slot=settings-header />-->

      <!-- This component provides a footer w/ draggable macro to open the settings UI -->
      <Footer slot=settings-footer />
   </TJSSettingsSwap>
</ApplicationShell>
