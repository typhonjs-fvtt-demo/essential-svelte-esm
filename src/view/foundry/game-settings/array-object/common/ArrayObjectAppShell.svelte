<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import ItemEntries            from './ItemEntries.svelte';

   export let elementRoot = void 0;

   import { getContext } from 'svelte';

   /** @type {import('#arrayObjectData').ItemContext} */
   const { description } = getContext('#external').itemContext;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <ItemEntries />

      <!-- Use `standard-form` class from Foundry / core styles -->
      <section class=standard-form>
         <fieldset>
            <legend>Description</legend>
            {description}
         </fieldset>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      gap: 1rem;
      height: 344px;
   }

   section {
      flex: 1;

      fieldset {
         flex: 1;
         padding: 0.5rem;
      }
   }
</style>
