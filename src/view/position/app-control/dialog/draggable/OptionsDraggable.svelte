<script>
   // TODO TEMPORARY
   import {
      easingFunc,
      easingList }      from '#runtime/svelte/gsap';

   import { slideFade }    from '#runtime/svelte/transition';

   export let options = void 0;
</script>

<section transition:slideFade={{duration: 150}}>
   <hr>

   <div>
      <input type=checkbox bind:checked={options.ease}/>
      <span>Easing:</span>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={() => options.resetEase()} title="Reset Easing" role=presentation><i class="fas fa-trash"></i></a>
   </div>

   <div>
      <label>Duration:
         <input type=range min=0 max=3 step=0.1 bind:value={options.easeDuration}>
         <input type=text bind:value={options.easeDuration} readonly>
      </label>

      <label>Function:
         <select bind:value={options.easeValue}>
            {#each easingList as entry}
               <option value={easingFunc[entry]}>{entry}</option>
            {/each}
         </select>
      </label>
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