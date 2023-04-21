<script>
   import { getContext }         from 'svelte';
   import { ApplicationShell }   from '#runtime/svelte/component/core';

   export let elementRoot = void 0;

   const application = getContext('#external').application;

   // Provides two-way bindings to application options. By using the stores external updates will be received here.
   const headerButtonNoClose = application.reactive.storeAppOptions.headerButtonNoClose;
   const headerButtonNoLabel = application.reactive.storeAppOptions.headerButtonNoLabel;
   const headerNoTitleMinimized = application.reactive.storeAppOptions.headerNoTitleMinimized;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <h1>Reactive Header Buttons</h1>
      <br>
      <div class=container>
         Options:
         <label><input type=checkbox bind:checked={$headerButtonNoClose}> No Close Button</label>
         <label><input type=checkbox bind:checked={$headerButtonNoLabel}> No Button Labels</label>
         <label><input type=checkbox bind:checked={$headerNoTitleMinimized}> No Title (Minimized)</label>
      </div>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      div.container {
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 10px;
         border: 2px solid rgba(0, 0, 0, 0.2);
         padding: 10px;
         margin-top: auto;
         margin-bottom: 10px;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 2em;
         font-weight: 100;
      }

      label {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
</style>