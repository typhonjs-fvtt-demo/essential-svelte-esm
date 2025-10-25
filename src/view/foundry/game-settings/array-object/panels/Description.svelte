<script>
   import { getContext } from 'svelte';

   /** @type {import('#arrayObjectData').ItemContext} */
   const { description } = getContext('#external').itemContext;
</script>

<!-- Use `standard-form` class from Foundry / core styles -->
<section class=standard-form>
   <fieldset>
      <legend>Description</legend>
      {description}
   </fieldset>
</section>

<style lang=scss>
   section {
      flex: 1;

      fieldset {
         flex: 1;
         padding: 0.5rem;
      }
   }
</style>
