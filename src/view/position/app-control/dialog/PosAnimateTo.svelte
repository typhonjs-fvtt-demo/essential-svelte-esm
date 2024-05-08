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

   function animateZ()
   {
      if (flipping?.isActive) { return; }

      flipping = position.animate.to({ rotateZ: position.rotateZ < 360 ? 360 : 0 },
       { duration, ease, transformOrigin: 'center' });
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
   <div>
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

   <div class=height>
      <span>Width:
         <button on:click={() => application.position.animate.to({ left: '12.5%', width: '75%' }, { duration, ease })}>75%</button>
         <button on:click={() => application.position.animate.to({ width: '150%~' }, { duration, ease })}>150%~</button>
      </span>
      <div class=separator></div>
      <button on:click={animateZ}>Flip</button>
      <div class=separator></div>
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

      div.height {
         height: 32px;
      }

      div.separator {
         display: block;
         width: 1px;
         height: 75%;
         background-color: black;
      }

      span, label {
         display: flex;
         align-items: center;
         flex: 1;
         gap: 0.5em;
         text-align: right;
      }
   }
</style>
