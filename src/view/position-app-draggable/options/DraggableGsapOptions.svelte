<script>
   import { easingList } from '@typhonjs-fvtt/runtime/svelte/gsap';

   export let options;
   export let position;

   const tweenEnd = () =>
   {
// const test = { top: Math.round(position.top / 100) * 100, left: Math.round(position.left / 100) * 100 };
// console.log(`! tweenEnd - test: `, test);

      return { top: Math.round(position.top / 100) * 100, left: Math.round(position.left / 100) * 100 };
   }

   let endOnGrid = false;

   $: options.inertiaEnd = endOnGrid ? tweenEnd : void 0;
</script>

<section>
   <div class=flex>
      <input type=checkbox bind:checked={options.ease}/>
      <span>Ease:</span>
      <button on:click={() => options.resetEase()}>Reset</button>
   </div>

   <div class=flex>
      <label for=duration>Duration:</label>
      <input type=range min=0 max=3 step=0.1 id=duration bind:value={options.easeDuration}>
      <input type=text bind:value={options.easeDuration} readonly>
   </div>

   <div class=flex>
      <label for=easing>Easing:</label>
      <select id=easing bind:value={options.easeValue}>
         {#each easingList as entry}
            <option value={entry}>{entry}</option>
         {/each}
      </select>
   </div>

   <div class=flex>
      <input type=checkbox bind:checked={options.inertia}/>
      <span>Inertia:</span>
      <button on:click={() => options.resetInertia()}>Reset</button>
   </div>

   <div class=flex>
      <label for=inertiaDurationMin>Duration (min):</label>
      <input type=range min=0 max=3 step=0.1 id=inertiaDurationMin bind:value={options.inertiaDurationMin}>
      <input type=text bind:value={options.inertiaDurationMin} readonly>
   </div>

   <div class=flex>
      <label for=inertiaDurationMax>Duration (max):</label>
      <input type=range min=0 max=3 step=0.1 id=inertiaDurationMax bind:value={options.inertiaDurationMax}>
      <input type=text bind:value={options.inertiaDurationMax} readonly>
   </div>

   <div class=flex>
      <label for=inertiaResistance>Resistance:</label>
      <input type=range min=-100 max=100 id=inertiaResistance bind:value={options.inertiaResistance}>
      <input type=text bind:value={options.inertiaResistance} readonly>
   </div>

   <div class=flex>
      <label for=inertiaVelocity>Velocity:</label>
      <input type=range min=0 max=3 step=0.1 id=inertiaVelocity bind:value={options.inertiaVelocity}>
      <input type=text bind:value={options.inertiaVelocity} readonly>
   </div>

   <div class=flex>
      <input type=checkbox bind:checked={endOnGrid} />
      <span>End on 100 x 100 grid</span>
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;
   }

   .flex {
      display: flex;
      height: fit-content;
      align-items: center;
   }
</style>