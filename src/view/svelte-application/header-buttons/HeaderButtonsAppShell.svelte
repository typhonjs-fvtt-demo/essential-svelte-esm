<script>
   import { getContext }         from 'svelte';
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   // Provides two-way bindings to application options. By using the stores external updates will be received here.
   const {
      headerButtonNoClose,
      headerButtonNoLabel,
      headerNoTitleMinimized } = application.reactive.storeAppOptions;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main class=scrollable>
      <h1>Reactive Header Buttons</h1>
      <br>
      <div class="tjs-panel-content tjs-panel-content--flex-row">
         Options:
         <label><input type=checkbox bind:checked={$headerButtonNoClose}> No Close Button</label>
         <label><input type=checkbox bind:checked={$headerButtonNoLabel}> No Button Labels</label>
         <label><input type=checkbox bind:checked={$headerNoTitleMinimized}> No Title (Minimized)</label>
      </div>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      .tjs-panel-content {
         align-items: center;
         justify-content: center;
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
         gap: var(--tjs-content-gap-half)
      }
   }
</style>
