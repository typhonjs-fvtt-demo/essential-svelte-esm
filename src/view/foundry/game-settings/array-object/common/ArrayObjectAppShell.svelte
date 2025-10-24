<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import ItemEntries            from './ItemEntries.svelte';

   export let elementRoot = void 0;

   export let description = '';
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=text>
         <p>
            {description}
         </p>
      </section>

      <ItemEntries />
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      height: 100%;
   }

   section {
      display: flex;
      justify-content: center;

      &.text {
         flex-direction: column;
      }
   }
</style>
