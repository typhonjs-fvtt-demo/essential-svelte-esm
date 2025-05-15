<!--
Dialog content presenting a button to add a custom chat message that is enhanced in the `renderChatMessage` found
in `./src/view/foundry/sidebar/chatmessage/index.js`. Please refer to this source file for all the hooks required and
more information.
-->
<script>
   function onClick()
   {
      // Add flags data scoped to your module ID in initial message creation. This allows the associated Svelte
      // component to be mounted in a single callback in `renderChatMessage` hook found in
      // `./src/view/foundry/sidebar/chatmessage/index.js` and the chat log to properly scroll down with the full size
      // of the chat message + Svelte component size.
      ChatMessage.create({
         user: game.user.id,
         flags: {
            'essential-svelte-esm': {        // Use your module ID instead of `essential-svelte-esm`.
               data: { something: 'useful' }
            }
         }
      });
   }
</script>

<main>
   Creates a custom chat message with flag data that is used to mount `MyChatMessage` Svelte component.
   <button on:click={onClick}>Post Custom Chat Message</button>
</main>

<style>
   main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }
</style>
