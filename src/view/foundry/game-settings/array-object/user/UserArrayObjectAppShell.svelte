<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=text>
         <p>
            Testing
         </p>
      </section>

      <!-- Use `standard-form` class from Foundry / core styles -->
      <section class=standard-form>
         <fieldset>
            <legend>Items Array Store</legend>
            <div class=grid>
            </div>
         </fieldset>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   div {
      &.grid {
         display: grid;
         grid-template-columns: 80px auto 1fr;
         align-items: center;
         gap: 0.5em;
         margin: auto;

         > span:has(+ input[type='checkbox']) { justify-self: end; text-align: right; }
         > input[type='checkbox'] { justify-self: center; }
      }

      &.row {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
   }

   label {
      //display: flex;
      //align-items: center;
      //gap: 0.5rem;
   }

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

   .standard-form {
      margin: auto auto 0 auto;
      height: fit-content;
      width: 425px;
   }
</style>
