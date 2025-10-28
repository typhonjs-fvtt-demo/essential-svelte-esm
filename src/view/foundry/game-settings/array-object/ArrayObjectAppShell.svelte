<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import {
      Description,
      ItemEntries }              from './panels';

   export let elementRoot = void 0;
   export let elementContent = void 0;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot bind:elementContent>
   <main>
      <ItemEntries />
      <Description />
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      gap: 1rem;
      height: 344px;
   }
</style>
