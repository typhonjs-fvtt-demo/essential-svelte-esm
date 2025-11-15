<script>
</script>

<main>
   <section class=text>
      <p>
         `TJSGameSettingsWithUI` from the TRL standard library is an extension to `TJSGameSettings` providing a default
         way to embed editing game settings directly into your applications. This is an optional mechanism that you may
         prefer as it allows a more direct method to edit settings than requiring users to go through several menus in
         the core Foundry UI including locating your specific package. The TRL settings editor is reactive and changes
         to settings update immediately versus the form based / submission process in the core settings editor.
      </p>
      <p>
         There are many options to configuring the TRL settings editor.
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
