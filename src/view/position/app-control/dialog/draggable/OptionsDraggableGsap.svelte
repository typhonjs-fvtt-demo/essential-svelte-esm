<script>
   import { gsapEasingList }   from '#runtime/svelte/gsap';
   import { slideFade }    from '#runtime/svelte/transition';

   // Imports the loading / automatic GSAP plugin registration.
   import '#runtime/svelte/gsap/plugin/bonus/InertiaPlugin';

   /**
    * @type {import('#runtime/svelte/gsap').IDraggableGsapOptions}
    */
   export let options = void 0;

   const tweenEnd = ({ top, left }) => ({ top: Math.round(top / 100) * 100, left: Math.round(left / 100) * 100 });

   let endOnGrid = false;

   $: options.inertiaEnd = endOnGrid ? tweenEnd : void 0;

   function resetInertia()
   {
      options.resetInertiaOptions();
      endOnGrid = false;
   }
</script>

<section transition:slideFade={{duration: 150}}>
   <hr>

   <div>
      <input type=checkbox bind:checked={options.tween}/>
      <span>Tween:</span>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={() => options.resetTweenOptions()} title="Reset Tween Options" role=presentation><i class="fas fa-trash"></i></a>
   </div>

   <div>
      <label>Duration:
         <input type=range min=0 max=3 step=0.01 bind:value={options.tweenDuration}>
         <input type=text bind:value={options.tweenDuration} readonly>
      </label>

      <label>Easing:
         <select bind:value={options.tweenEase}>
            {#each gsapEasingList as entry}
               <option value={entry}>{entry}</option>
            {/each}
         </select>
      </label>
   </div>

   <div>
      <input type=checkbox bind:checked={options.inertia}/>
      <span>Inertia:</span>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={() => resetInertia()} title="Reset Inertia" role=presentation><i class="fas fa-trash"></i></a>
   </div>

   <div>
      <span>Duration:</span>

      <label>(min):
         <input type=range min=0 max=5 step=0.1 bind:value={options.inertiaDurationMin}>
         <input type=text bind:value={options.inertiaDurationMin} readonly>
      </label>

      <label>(max):
         <input type=range min=0 max=5 step=0.1 bind:value={options.inertiaDurationMax}>
         <input type=text bind:value={options.inertiaDurationMax} readonly>
      </label>
   </div>

   <div>
      <label>Resistance:
         <input type=range min=0 max=10000 bind:value={options.inertiaResistance}>
         <input type=text bind:value={options.inertiaResistance} readonly>
      </label>

      <label>Velocity Scale:
         <input type=range min=0 max=3 step=0.1 bind:value={options.inertiaVelocityScale}>
         <input type=text bind:value={options.inertiaVelocityScale} readonly>
      </label>
   </div>

   <div>
      <span>End on 100 x 100 grid:</span>
      <input type=checkbox bind:checked={endOnGrid} />
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      input[type=text] {
         max-width: 3.5em;
         pointer-events: none;
         text-align: center;
      }

      div {
         display: flex;
         align-items: center;
         gap: 0.75em;
      }

      label {
         display: flex;
         align-items: center;
         flex: 1;
         gap: 0.5em;
         text-align: right;
      }

      hr { width: 96% }
   }
</style>
