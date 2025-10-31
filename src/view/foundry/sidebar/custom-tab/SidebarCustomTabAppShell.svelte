<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   /** @type {import('./types').External} */
   const { stores } = getContext('#external');

   const { reloadRequired, tabAdd, tabRemove, tabReplace } = stores;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      Add, remove, replace sidebar tabs with Svelte component implementations. Custom tabs are loaded in Foundry
      `init` hook. Reload Foundry (press F5) to see the sidebar tab changes.

      <div>
         <span>Enable / disable:</span>
         {#if $reloadRequired}
            <span class=reload>Reload Required</span>
         {/if}
      </div>

      <label>
         <span>- Add custom tab (before chat):</span>
         <input type=checkbox bind:checked={$tabAdd}>
      </label>
      <label>
         <span>- Remove journal tab:</span>
         <input type=checkbox bind:checked={$tabRemove}>
      </label>
      <label>
         <span>- Replace combat tracker tab:</span>
         <input type=checkbox bind:checked={$tabReplace}>
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
