import MyChatMessage                      from './MyChatMessage.svelte';

export { default as ChatDialogContent }   from './ChatDialogContent.svelte';

/**
 * The following hooks & code support the chat message / Svelte component mounting demo found in
 * `./src/view/chatmessage`. Please note that the `ready` hook below is necessary for _modules_ that attach Svelte
 * components to chat messages. Game systems can omit this hook.
 *
 * In the case of mounting Svelte components to chat messages this is a manual process beyond the purview of TRL, so you
 * must manage the mounting and subsequent destroying of any Svelte components associated w/ chat message documents with
 * the following Foundry core hooks below.
 */

/**
 * This hook is necessary for _modules_ that include Svelte components attached to chat messages. As things go on
 * initial setup and rendering of Foundry the chat log is rendered before modules initially can register for the
 * `renderChatMessage` hook. This hook is _not_ necessary for game systems as systems are initialized / loaded before
 * Foundry core renders the chat log for the first time.
 */
Hooks.once('ready', () =>
{
   // Iterate over all chat message documents potentially adding Svelte components to your specific module chat
   // messages.
   for (const message of game.messages)
   {
      // Find associated flag data scoped to your module ID. This is the easiest way to determine that this message is
      // associated with your module and has a Svelte component attached to the message content.
      const flagData = message.getFlag('essential-svelte-esm', 'data');

      if (typeof flagData === 'object' && !message._svelteComponent)
      {
         // Find existing chat message element already rendered and attach Svelte component.
         const el = document.querySelector(`.message[data-message-id="${message.id}"] .message-content`);
         if (el)
         {
            // Add the svelte component to the message instance loaded in client side memory.
            message._svelteComponent = new MyChatMessage({ target: el, props: flagData });
         }
      }
   }

   // Scroll chat log to bottom.
   ui.chat.scrollBottom();
});

/**
 * Used by chat message demo to manually attach a Svelte component, MyChatMessage, to a chat message.
 *
 * Note: Foundry v13 changes the hook name to `renderChatMessageHTML` instead of `renderChatMessage`.
 * All AppV2 / new render hooks will pass back an HTML element and not a JQuery instance.
 *
 * Note: You must manually destroy this Svelte component in an associated `preDeleteChatMessage` like the one provided
 * below. The reason being is that you are manually / conditionally creating a Svelte component that is not monitored /
 * controlled by TRL itself, so you must also manually destroy this component when the chat message is deleted.
 */

Hooks.once('init', () =>
{
   Hooks.on('renderChatMessageHTML', (message, html) =>
   {
      // Find associated flag data scoped to your module ID. This is the easiest way to determine that this message is
      // associated with your module and has a Svelte component attached to the message content.
      const flagData = message.getFlag('essential-svelte-esm', 'data');

      if (typeof flagData === 'object')
      {
         const messageContentEl = html.querySelector(`.message-content`);

         if (messageContentEl)
         {
            // Add the svelte component to the message instance loaded in client side memory.
            message._svelteComponent = new MyChatMessage({ target: messageContentEl, props: flagData });
         }
      }
   });
});


/**
 * Used by chat message demo to clean up / destroy the mounted Svelte component to the message instance when the chat
 * message is deleted.
 */
Hooks.on('preDeleteChatMessage', (message) =>
{
   // Find associated flag data scoped to your module ID. This is the easiest way to determine that this message is
   // associated with your module and has a Svelte component attached to the message content.
   const flagData = message.getFlag('essential-svelte-esm', 'data');

   // Also ensure that the Svelte component exists
   if (typeof flagData === 'object' && typeof message?._svelteComponent?.$destroy === 'function')
   {
      // Manually destroy Svelte component when the chat message document is being deleted.
      message._svelteComponent.$destroy();
   }
});
