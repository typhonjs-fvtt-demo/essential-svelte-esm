<script>
   // TODO TEMPORARY
   import {
      easingFunc,
      easingList }      from '@typhonjs-fvtt/runtime/svelte/gsap';

   import { slideFade }    from '@typhonjs-fvtt/runtime/svelte/transition';

   export let options;
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
            <option value={easingFunc[entry]}>{entry}</option>
         {/each}
      </select>
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