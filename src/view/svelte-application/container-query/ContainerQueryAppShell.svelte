<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   const { width, height } = application.position.stores;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=text>
         <p>
            All app shells provides support for container queries out of the box.
         </p>
      </section>

      <!-- Use `standard-form` class from Foundry / core styles -->
      <section class=standard-form>
         <fieldset>
            <legend>App Constraints</legend>
            <div class=row>
               <label>
                  <span>Width:</span>
                  <input type=text class=width bind:value={$width} readonly />
               </label>
               <label>
                  <span>Height:</span>
                  <input type=text class=height bind:value={$height} readonly />
               </label>
            </div>
         </fieldset>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   div {
      &.row {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
   }

   main {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      height: 100%;
   }

   section.text {
      //padding: 0 40px;
   }

   .standard-form {
      margin-top: auto;
   }
</style>
