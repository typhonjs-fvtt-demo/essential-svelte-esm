<script>
   import { getContext } from 'svelte';

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { itemStore, scope } = getContext('#external').itemContext;

   const msgCanEdit = 'can read and edit the data table';
   const msgCannotEdit = 'can not edit, but can read the data table';
</script>

<!-- Use `standard-form` class from Foundry / core styles -->
<section class=standard-form>
   <fieldset>
      <legend>Description</legend>
      <p>
         The current user ({globalThis.game.user.name}) {itemStore.canUserModify ? msgCanEdit : msgCannotEdit} which is `{scope}`
         scoped{#if scope === 'user'}&nbsp;and unique to this user{/if}.
      </p>
      <p>
         `GameSettingArrayObject` allows serializing a bespoke array of objects to the Foundry DB through a game
         setting that fulfills a purpose in your app. This can be specialized data driving your app. There are two
         scoping options. The first is `user` scope which creates a unique object array per user that is only
         readable / writable by that user. The second is `world` scope which is only editable by GM users, but is
         readable by all. All data is reactive and can be filtered and sorted interactively.
      </p>
      <p>
         This demo shows a trivial example of serializing mock items that are randomly generated. A grid or table
         layout implementation is available to show dynamic sorting by column with search field filtering entries.
      </p>
   </fieldset>
</section>

<style lang=scss>
   section {
      flex: 1;

      fieldset {
         flex: 1;
         padding: 0.5rem;
         gap: 0.5rem;

         p {
            margin: 0;
            font-size: 0.8rem;
         }
      }
   }
</style>
