<script>
   async function onClick()
   {
      const message = await ChatMessage.create({ user: game.user.id });
      await message.setFlag('essential-svelte-esm', 'data', { something: 'useful' });
   }
</script>

<main>
   Creates a custom chat message with flag data that is used to mount `MyChatMessage` Svelte component.
   <button on:click={onClick}>Post Custom Chat Message</button>
</main>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
</style>