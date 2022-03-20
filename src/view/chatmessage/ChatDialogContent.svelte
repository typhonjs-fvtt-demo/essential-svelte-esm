<!--
Dialog content presenting a button to add a custom chat message that is enhanced in the `renderChatMessage` found
in `./src/init.js`
-->
<script>
   async function onClick()
   {
      const message = await ChatMessage.create({ user: game.user.id });
      await message.setFlag('essential-svelte-esm', 'data', { something: 'useful' });
   }
</script>

Creates a custom chat message with flag data that is used to mount `MyChatMessage` Svelte component.
<button on:click={onClick}>Post Custom Chat Message</button>
