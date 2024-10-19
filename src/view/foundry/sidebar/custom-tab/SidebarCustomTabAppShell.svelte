<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { sessionConstants }   from '#constants';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   const storeChecked = application.reactive.sessionStorage.getStore(sessionConstants.sidebarCustomTab, false);

   const initialChecked = $storeChecked;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      Add a custom sidebar tab / Svelte component implementation. Custom tabs are loaded in Foundry `init` hook.
      Reload Foundry (press F5) to see the custom tab added before the chat tab.

      <label>
         <span>Enable / disable custom tab:</span>
         <input type=checkbox bind:checked={$storeChecked}>
         {#if initialChecked !== $storeChecked}
            <span class=reload>Reload Required</span>
         {/if}
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
      gap: 0.25rem;
   }

   .reload {
      color: red;
      font-weight: bold;
   }
</style>
