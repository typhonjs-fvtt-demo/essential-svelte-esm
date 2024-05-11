<script>
   import { easingList }  from '#runtime/svelte/easing';

   /**
    * The target Svelte application being animated.
    *
    * @type {import('#runtime/svelte/application').SvelteApplication}
    */
   export let application = void 0;

   /**
    * Svelte easing function name to apply to animation.
    *
    * @type {import('#runtime/svelte/easing').EasingFunctionName}
    */
   let ease = 'linear';

   /**
    * Animations are exclusive. This is passed in as a tween option to prevent multiple overlapping animations.
    *
    * @type {boolean}
    */
   const exclusive = true;

   /**
    * The animation duration in seconds.
    */
   let duration = 1;
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
         <button on:click={() => !application.reactive.minimized ? application.position.animate.to({ left: '12.5%', width: '75%' }, { duration, ease, exclusive }) : void 0}>75%</button>
         <button on:click={() => !application.reactive.minimized ? application.position.animate.to({ width: '150%~' }, { duration, ease, exclusive }) : void 0}>150%~</button>
      </span>
      <div class=separator></div>
      <button on:click={() => application.position.animate.to({ rotateZ: application.position.rotateZ < 360 ? 360 : 0 }, { duration, ease, exclusive, transformOrigin: 'center' })}>Flip</button>
      <div class=separator></div>
      <button on:click={() => application.position.state.reset({ keepZIndex: true })}>Reset</button>
   </div>

   <div class=height>
      <span>Save:
         <button on:click={() => application.state.save({ name: 'save-1' })}>1</button>
         <button on:click={() => application.state.save({ name: 'save-2' })}>2</button>
         <button on:click={() => application.state.save({ name: 'save-3' })}>3</button>
         <button on:click={() => application.state.save({ name: 'save-4' })}>4</button>
         <button on:click={() => application.state.save({ name: 'save-5' })}>5</button>
      </span>
      <div class=separator></div>
      <span>Restore:
         <button on:click={() => application.state.restore({ name: 'save-1', animateTo: true, async: true, ease, duration })}>1</button>
         <button on:click={() => application.state.restore({ name: 'save-2', animateTo: true, async: true, ease, duration })}>2</button>
         <button on:click={() => application.state.restore({ name: 'save-3', animateTo: true, async: true, ease, duration })}>3</button>
         <button on:click={() => application.state.restore({ name: 'save-4', animateTo: true, async: true, ease, duration })}>4</button>
         <button on:click={() => application.state.restore({ name: 'save-5', animateTo: true, async: true, ease, duration })}>5</button>
      </span>
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
