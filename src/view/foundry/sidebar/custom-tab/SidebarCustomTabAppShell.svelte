<script>
   import { getContext }         from 'svelte';
   import { derived, get }       from 'svelte/store';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { sessionConstants }   from '#constants';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   const storeAddTab = application.reactive.sessionStorage.getStore(sessionConstants.sidebarCustomTab, false);
   const storeReplaceTab = application.reactive.sessionStorage.getStore(sessionConstants.sidebarReplaceTab, false);
   const storeRemoveTab = application.reactive.sessionStorage.getStore(sessionConstants.sidebarRemoveTab, false);

   const initialState = [get(storeAddTab), get(storeReplaceTab), get(storeRemoveTab)];
   let initialized = false;

   // Create a derived store which detects when any boolean state does not match initial state on load.
   const flagsChanged = derived(
      [storeAddTab, storeReplaceTab, storeRemoveTab],
      ([$a, $b, $c], set) =>
      {
         if (!initialized)
         {
            initialized = true;
            set(false);
            return;
         }

         const current = [$a, $b, $c];

         const changed = current.some((v, i) => v !== initialState[i]);
         set(changed);
      },
      false
   );
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      Add, remove, replace sidebar tabs with Svelte component implementations. Custom tabs are loaded in Foundry
      `init` hook. Reload Foundry (press F5) to see the sidebar tab changes.

      <div>
         <span>Enable / disable:</span>
         {#if $flagsChanged}
            <span class=reload>Reload Required</span>
         {/if}
      </div>

      <label>
         <span>- Custom tab (before chat):</span>
         <input type=checkbox bind:checked={$storeAddTab}>
      </label>
      <label>
         <span>- Replace combat tracker tab:</span>
         <input type=checkbox bind:checked={$storeReplaceTab}>
      </label>
      <label>
         <span>- Remove journal tab:</span>
         <input type=checkbox bind:checked={$storeRemoveTab}>
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
      margin-left: 2rem;
      color: red;
      font-weight: bold;
   }
</style>
