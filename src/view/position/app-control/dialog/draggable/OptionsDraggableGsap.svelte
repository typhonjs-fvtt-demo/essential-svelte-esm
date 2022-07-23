<script>
   import { easingList }   from '@typhonjs-fvtt/runtime/svelte/gsap';
   import { slideFade }    from '@typhonjs-fvtt/runtime/svelte/transition';

   // Imports the loading / automatic GSAP plugin registration.
   import '@typhonjs-fvtt/runtime/svelte/gsap/plugin/bonus/InertiaPlugin';

   export let options = void 0;

   const tweenEnd = ({ top, left }) => ({ top: Math.round(top / 100) * 100, left: Math.round(left / 100) * 100 });

   let endOnGrid = false;

   $: options.inertiaEnd = endOnGrid ? tweenEnd : void 0;

   function resetInertia()
   {
      options.resetInertia();
      endOnGrid = false;
   }
</script>

<section transition:slideFade={{duration: 150}}>
   <hr>

   <div class=flex>
      <input type=checkbox bind:checked={options.ease}/>
      <span>Easing:</span>
      <a on:click={() => options.resetEase()} title="Reset Easing"><i class="fas fa-trash"></i></a>
   </div>

   <div class=flex>
      <label for=duration>Duration:</label>
      <input type=range min=0 max=3 step=0.1 id=duration bind:value={options.easeDuration}>
      <input type=text bind:value={options.easeDuration} readonly>

      <label for=easing>Function:</label>
      <select id=easing bind:value={options.easeValue}>
         {#each easingList as entry}
            <option value={entry}>{entry}</option>
         {/each}
      </select>
   </div>

   <div class=flex>
      <input type=checkbox bind:checked={options.inertia}/>
      <span>Inertia:</span>
      <a on:click={() => resetInertia()} title="Reset Inertia"><i class="fas fa-trash"></i></a>
   </div>

   <div class=flex>
      <span>Duration:</span>

      <label for=inertiaDurationMin>(min):</label>
      <input type=range min=0 max=5 step=0.1 id=inertiaDurationMin bind:value={options.inertiaDurationMin}>
      <input type=text bind:value={options.inertiaDurationMin} readonly>

      <label for=inertiaDurationMax>(max):</label>
      <input type=range min=0 max=5 step=0.1 id=inertiaDurationMax bind:value={options.inertiaDurationMax}>
      <input type=text bind:value={options.inertiaDurationMax} readonly>
   </div>

   <div class=flex>
      <label for=inertiaResistance>Resistance:</label>
      <input type=range min=0 max=10000 id=inertiaResistance bind:value={options.inertiaResistance}>
      <input type=text bind:value={options.inertiaResistance} readonly>

      <label for=inertiaVelocityScale>Velocity Scale:</label>
      <input type=range min=0 max=3 step=0.1 id=inertiaVelocityScale bind:value={options.inertiaVelocityScale}>
      <input type=text bind:value={options.inertiaVelocityScale} readonly>
   </div>

   <div class=flex>
      <span>End on 100 x 100 grid:</span>
      <input type=checkbox bind:checked={endOnGrid} />
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;

      div:not(:last-child) { margin-bottom: 0.25em; }

      a { margin-left: 0.5em; }

      input[type=text] { max-width: 3.5em; pointer-events: none; }

      .flex {
         display: flex;
         height: fit-content;
         align-items: center;

         *:not(:last-child) { margin-right: 0.25em; }

         span:not(:first-child), label:not(:first-child) { margin-left: 0.5em; }
      }

      hr { width: 96% }
   }
</style>