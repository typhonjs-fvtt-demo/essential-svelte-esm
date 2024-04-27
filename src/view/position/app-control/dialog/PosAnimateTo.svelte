<script>
   import { easingList }  from '#runtime/svelte/easing';

   /** @type {import('#runtime/svelte/application').SvelteApplication} */
   export let application = void 0;

   const position = application.position;

   /** @type {import('#runtime/svelte/easing').EasingFunctionName} */
   let ease = 'linear';

   /** @type {import('#runtime/util/animate').BasicAnimation} */
   let flipping;

   /** @type {boolean} */
   let restoring;

   let duration = 1;

   function animateY()
   {
      if (flipping?.isActive) { return; }

      flipping = position.animate.to({ rotateY: position.rotateY < 360 ? 360 : 0 }, { duration, ease });
   }

   function restore()
   {
      if (restoring) { return; }

      restoring = true;
      application.state.restore({ name: 'save-1', animateTo: true, async: true, ease, duration }).then(
       () => restoring = false);
   }
</script>

<section>
   <div class=flex>
      <label>Duration:
         <input type=range min=0 max=3 step=0.1 bind:value={duration}>
         <input type=text bind:value={duration} readonly>
      </label>

      <label>Easing:
         <select bind:value={ease}>
            {#each easingList as easeFnName}
               <option value={easeFnName}>
                  {easeFnName}
               </option>
            {/each}
         </select>
      </label>
   </div>

   <div>
      <button on:click={animateY}>Flip</button>
      <button on:click={() => application.position.animate.to({ left: '12.5%', width: '75%' }, { duration, ease })}>Width 75%</button>
      <button on:click={() => application.state.save({ name: 'save-1' })}>Save</button>
      <button on:click={restore}>Restore</button>
      <button on:click={() => position.state.reset()}>Reset</button>
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      border: 0.1em solid rgba(0, 0, 0, 0.2);
      border-radius: 1em;
      background: rgba(0, 0, 0, 0.1);

      padding: 0.5em;

      input[type=text] {
         max-width: 2.5em;
         pointer-events: none;
         text-align: center;
      }

      select {
         width: fit-content;
      }

      div {
         display: flex;
         align-items: center;
         justify-content: center;
         gap: 0.75em;
      }

      label {
         display: flex;
         align-items: center;
         flex: 1;
         gap: 0.5em;
         text-align: right;
      }
   }
</style>
