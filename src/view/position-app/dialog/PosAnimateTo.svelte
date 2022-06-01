<script>
   import {
      easingFunc,
      easingList }   from '@typhonjs-fvtt/runtime/svelte/gsap';

   export let application;

   const position = application.position;

   let ease = easingFunc.linear;

   let flipping, restoring;

   let duration = 1;

   function animateY()
   {
      if (flipping) { return; }

      flipping = true;
      position.animate.to({ rotateY: position.rotateY < 360 ? 360 : 0 }, { duration, ease }).finished.then(
       () => flipping = false);
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
      <label for=duration>Duration:</label>
      <input type=range min=0 max=3 step=0.1 id=duration bind:value={duration}>
      <input type=text bind:value={duration} readonly>

      <label for=easing>Easing:</label>
      <select id=easing bind:value={ease}>
         {#each easingList as prop}
            <option value={easingFunc[prop]}>
               {prop}
            </option>
         {/each}
      </select>
   </div>

   <div>
      <button on:click={animateY}>Flip</button>
      <button on:click={() => application.state.save({ name: 'save-1' })}>Save</button>
      <button on:click={restore}>Restore</button>
      <button on:click={() => position.reset()}>Reset</button>
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;

      border: 0.1em solid rgba(0, 0, 0, 0.2);
      border-radius: 1em;
      background: rgba(0, 0, 0, 0.1);

      padding: 0.25em;

      input { margin: 0.5em; }
      input[type=text] { max-width: 2.5em; }

      select { margin: 0.5em; width: fit-content; }

      button { margin: 0.25em; }

      div {
         display: flex;
         align-items: center;
         justify-content: center;

         .flex {
            height: fit-content;

            *:not(:last-child) {
               margin-right: 0.25em;
            }

            label:not(:first-child) {
               margin-left: 0.5em;
            }
         }
      }

      label {
         text-align: right;
         width: 6em;
      }
   }
</style>