<script>
   import { onMount }         from 'svelte';

   import { TJSMediaContent } from '#standard/component/fvtt';

   onMount(() =>
   {
      // Receive events when any user targeting changes.
      Hooks.on('targetToken', targetToken);

      // Find targets for current user.
      targetToken(game.user);

      // Return onDestroy callback to remove event listener.
      return () => Hooks.off('targetToken', targetToken)
   });

   let targets = [];

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
            filepath: target?.texture?.baseTexture?.resource?.src,
            title: target?.document?.name
         });
      }

      targets = newTargets;
   }
</script>

<section>
   {#if targets.length > 0}
      {#each targets as media}
         <TJSMediaContent {media} />
      {/each}
   {:else}
      No targets
   {/if}
</section>

<style>
   section {
      display: flex;
      flex-wrap: wrap;
      max-width: 140px;
      width: 140px;
      gap: 5px;

      /* Set the TJSMediaContent diameter */
      --tjs-media-content-diameter: 30px;
   }
</style>