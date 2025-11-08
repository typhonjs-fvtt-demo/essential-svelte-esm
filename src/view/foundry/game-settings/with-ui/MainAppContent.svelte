<script>
</script>

<main>
   <section class=text>
      <p>
         SvelteApp allows easy reactive control of CSS classes added / deleted from the main app window through the
         `activeClasses` Set available from `application.reactive.activeClasses`. It is a Readable reactive store
         that provides subscriber notifications when entries change. The `classes` SvelteApp option provides the
         base entries in the `activeClasses` Set. Other runtime classes like the current theme are not included in
         `activeClasses`; just the classes that you specify and add / delete at runtime. Of note, the main SvelteApp
         `classes` option is _not_ modified reactively, so any changes at runtime are only applied to the app window.
      </p>
      <p>
         This example is visually busy, but you can use this feature to change modes or other CSS / style
         modifications for your entire app.
      </p>
   </section>
</main>

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
