<script>
   /**
    * Defines an example footer component for `TJSGameSettingsWithUI / `TJSSettingsEdit` / `TJSSettingsSwap`.
    *
    * The extra part of this demo is that it shows how to handle a drag & drop action of an image to the macro hot bar
    * and defining a single macro without duplication across users. While the macro in this demo below posts a UI
    * notification please do create your own macro, perhaps fire a hook that opens your application, etc.
    *
    * @componentDescription
    */

   import { onMount } from 'svelte';

   let imageEl;

   onMount(() =>
   {
      Hooks.on('hotbarDrop', hotbarDrop);
      return () => Hooks.off('hotbarDrop', hotbarDrop);
   });

   function hotbarDrop(hotbar, data, slot)
   {
      let handled = false;

      if (data?.type === 'TJSGameSettingsWithUI_Demo')
      {
         handled = true;

         // Wrap the handling code in an async IIFE.
         (async () =>
         {
            // The macro script data to open the quest via the public QuestAPI.
            const command = `ui.notifications.info('TJSGameSettingsWithUI demo macro test!');`;

            const macroData = {
               name: 'TJSGameSettingsWithUI Demo Macro',
               type: 'script',
               command,
               img: 'icons/vtt.png'
            };

            // Search for an already existing macro with the same command.
            let macro = game.macros.contents.find((m) => m.command === command);

            // If not found then create a new macro with the command.
            if (!macro)
            {
               macro = await Macro.create(macroData, { displaySheet: false });
            }

            // Assign the macro to the hotbar.
            await game.user.assignHotbarMacro(macro, slot);
         })();
      }

      return handled;
   }

   function onDragStart(event)
   {
      const dataTransfer = { type: 'TJSGameSettingsWithUI_Demo' };
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setDragImage(imageEl, 18, 18);
      event.dataTransfer.setData('text/plain', JSON.stringify(dataTransfer));
   }
</script>

<div on:dragstart={onDragStart}
     role=banner
     draggable=true
     title="Drag to hot bar">
    <img bind:this={imageEl}
         on:dragstart={onDragStart}
         draggable=true
         src="icons/vtt.png" alt=Macro>
    <span>Example `Footer component` w/ draggable macro.</span>
</div>

<style>
   div {
      display: flex;
      background: var(--tjs-component-background-alt);
      border-top: var(--tjs-component-border);

      align-items: center;
      justify-content: center;
      height: 2rem;
      min-height: 2rem;
      padding: 0 0.5rem;

      cursor: var(--tjs-cursor-grab);
      font-weight: bold;

      transition: background .25s;
   }

   div:hover {
      background: var(--tjs-component-background-highlight);
   }

   img {
      height: 1.5rem;
      margin-right: 0.5em;
      border-radius: 0.25em;
   }

   span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
</style>
