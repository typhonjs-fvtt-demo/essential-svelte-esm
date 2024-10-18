<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { sessionConstants }   from '#constants';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   const storeChecked = application.reactive.sessionStorage.getStore(sessionConstants.sidebarCustomTab, false)
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      Add a custom sidebar tab / Svelte component implementation. Custom tabs are loaded in Foundry `init` hook.
      Reload Foundry (press F5) to see the custom tab added before the chat tab.

      <label>
         <span>Enable / disable custom tab:</span>
         <input type=checkbox bind:checked={$storeChecked}>
      </label>
   </main>
</ApplicationShell>

<style>
   main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }

   label {
      display: flex;
      align-items: center;
   }
</style>
