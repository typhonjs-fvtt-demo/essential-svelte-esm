<script>
   /**
    * This demo controls animation / tweening of application position.
    *
    * The dynamic, but consistent tween options across animations include `duration` and `ease` which control the
    * duration of the animation in seconds and which Svelte easing function is used to control the interpolation of
    * time. Both `duration` and `ease` have a UI range input and select box to choose options.
    *
    * While the TJSPosition animation API does pass back a `BasicAnimation` control object there are a few ways to
    * schedule new animations through tween options which can provide a major convenience over maintaining a local
    * variable for a BasicAnimation control reference. The main control option of the `TweenOptions` type alias is
    * `strategy`. The `strategy` option controls how current animations for the same position instance may be handled.
    * The `strategy` property can either be `cancel` or `exclusive`.
    *
    * - `cancel`: Stops any pending and ongoing animations on the same target and schedules the new animation
    *   immediately. This option ensures that the new animation takes precedence by clearing any existing animations.
    *
    * - `exclusive`: Only schedules the new animation if there are no other animations currently scheduled for the
    *   same target. This option avoids animation conflicts by ensuring that only one animation can run at a time.
    *
    * ---
    *
    * Another useful option is `transformOrigin` which will apply the transform origin specified for the animation,
    * but revert back to the previous transform origin when the animation is completed. This can be handy when working
    * with rotation and reduce the boilerplate code required for this operation. The flip / rotation animation
    * defines a `transformOrigin` of `center` in the example below.
    *
    * ---
    *
    * Additionally, this demo shows the `SvelteApplication` state API allowing app state to be saved and restored
    * with animation. Both `TJSPosition` and `SvelteApplication` have state mechanisms to save / restore state. The
    * SvelteApplication state API knows how to save / restore position _and_ minimized state whereas the TJSPosition
    * state API only saves / restores positional state.
    */

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
    * The animation duration in seconds.
    */
   let duration = 1;
</script>

<section>
   <div>
      <label>Duration:
         <!--
            Creates a range input controlling animation duration from 0-3 seconds.
         -->
         <input type=range min=0 max=3 step=0.1 bind:value={duration}>
         <input type=text bind:value={duration} readonly>
      </label>

      <label>Easing:
         <!--
            Creates a select input with a list of Svelte easing function names.
         -->
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
         <!--
            The following animations use the `cancel` strategy and will interrupt other scheduled animations.
            Note though that they are not triggered when the application is minimized.

            1. Animates width to 75% of the browser window and left to 12.5% to center the app.
            2. Animates the width to 150% of the current value. The `~` after `%` indicates a relative percentage.
            3. You can adjust relative values using `+=`, `-=`, and `*=`. This example adds 50px to the current width.
         -->
         <button on:click={() => !application.reactive.minimized ? application.position.animate.to({ left: '12.5%', width: '75%' }, { duration, ease, strategy: 'cancel' }) : void 0}>75%</button>
         <button on:click={() => !application.reactive.minimized ? application.position.animate.to({ width: '150%~' }, { duration, ease, strategy: 'cancel' }) : void 0}>150%~</button>
         <button on:click={() => !application.reactive.minimized ? application.position.animate.to({ width: '+=50px' }, { duration, ease, strategy: 'cancel' }) : void 0}>+=50px</button>
      </span>
      <div class=separator></div>
      <!--
         The following rotation animation uses the `exclusive` strategy and will _not_ interrupt other scheduled
         animations. Note the use of `transformOrigin: 'center'` which applies a center origin for the rotation during
         the animation.
      -->
      <button on:click={() => application.position.animate.to({ rotateZ: application.position.rotateZ < 360 ? 360 : 0 }, { duration, ease, strategy: 'exclusive', transformOrigin: 'center' })}>Flip</button>
      <div class=separator></div>
      <!--
         Resets any schedule animation and sets initial default position keeping the current `z-index`. This is the
         initial position when the application first was rendered.
      -->
      <button on:click={() => application.position.state.reset({ keepZIndex: true })}>Reset</button>
   </div>

   <div class=height>
      <span>Save:
         <!--
            Saves a snapshot of the current application state including position and minimized state.
         -->
         <button on:click={() => application.state.save({ name: 'save-1' })}>1</button>
         <button on:click={() => application.state.save({ name: 'save-2' })}>2</button>
         <button on:click={() => application.state.save({ name: 'save-3' })}>3</button>
         <button on:click={() => application.state.save({ name: 'save-4' })}>4</button>
         <button on:click={() => application.state.save({ name: 'save-5' })}>5</button>
      </span>
      <div class=separator></div>
      <span>Restore:
         <!--
            Restores any previous saved application snapshot animating to that state. Restoring a state _always_ cancels
            any current animation scheduled.
         -->
         <button on:click={() => application.state.restore({ name: 'save-1', animateTo: true, ease, duration })}>1</button>
         <button on:click={() => application.state.restore({ name: 'save-2', animateTo: true, ease, duration })}>2</button>
         <button on:click={() => application.state.restore({ name: 'save-3', animateTo: true, ease, duration })}>3</button>
         <button on:click={() => application.state.restore({ name: 'save-4', animateTo: true, ease, duration })}>4</button>
         <button on:click={() => application.state.restore({ name: 'save-5', animateTo: true, ease, duration })}>5</button>
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
