<script>
   import { onMount }         from 'svelte';

   import { ripple }          from '#runtime/svelte/action/animate';

   import {
      TJSMediaContent,
      TJSSlotButton }         from '#standard/component';

   onMount(() =>
   {
      // Receive events when any user targeting changes.
      Hooks.on('targetToken', targetToken);

      // Find targets for current user.
      targetToken(game.user);

      // Return onDestroy callback to remove event listener.
      return () => Hooks.off('targetToken', targetToken)
   });

   // Stores a single instance of the ripple action to apply to all buttons.
   const rippleInstance = ripple({ contextmenu: true });

   let targets = [];

   /**
    * Opens any associated actor sheet on context menu click
    *
    * @param {object}   media - Contains stored token UUID.
    */
   async function onContextMenu(media)
   {
      if (media?.uuid)
      {
         const tokenDoc = await globalThis.fromUuid(media.uuid);
         if (tokenDoc) { tokenDoc?.actor?.sheet?.render?.(true); }
      }
   }

   /**
    * Basic example to pan to and control the target token.
    *
    * @param {object}   media - Contains stored token UUID.
    */
   async function onPress(media)
   {
      if (media?.uuid)
      {
         const tokenDoc = await globalThis.fromUuid(media.uuid);

         // Control and pan to token object.
         if (tokenDoc?.object)
         {
            tokenDoc.object?.control({ releaseOthers: true });
            canvas.animatePan(tokenDoc.object.center);
         }
      }
   }

   /**
    * Gets the current targets for `game.user`.
    *
    * @param {User}  user - User document.
    */
   function targetToken(user)
   {
      // Ignore any users that is not `game.user`.
      if (game.user.id !== user.id) { return; }

      const newTargets = [];

      // Push image / filepath of target and target name.
      for (const target of game.user.targets)
      {
         newTargets.push({
            uuid: target?.document?.uuid,
            filepath: target?.texture?.baseTexture?.resource?.src,
            title: target?.document?.name,
         });
      }

      targets = newTargets;
   }
</script>

<section>
   {#if targets.length > 0}
      {#each targets as media}
         <TJSSlotButton onPress={() => onPress(media)}
                        onContextMenu={() => onContextMenu(media)}
                        efx={rippleInstance}>
            <TJSMediaContent {media} />
         </TJSSlotButton>
      {/each}
   {:else}
      No targets
   {/if}
</section>

<style>
   section {
      display: flex;
      flex-wrap: wrap;
      max-width: 152px;
      width: 152px;
      gap: 8px;

      /* Set the TJSMediaContent diameter */
      --tjs-media-content-diameter: 30px;
   }
</style>
