<script>
   import {
      gsapEasingFunc,
      gsapEasingList }      from '#runtime/svelte/gsap';

   import { boxStore }  from './boxStore.js';

   export let controls = void 0;

   const storeStagger = boxStore.stagger;

   const storeAuto = boxStore.auto;
   const storeDebug = boxStore.debug;
   const storeLabels = boxStore.labels;
   const storePCL = boxStore.pclEnabled;

   const storeDuration = boxStore.duration;
   const storeEase = boxStore.ease;

   const storeValidator = boxStore.validator;
</script>

<div class="header flex">
   <div class="container flex-vert">
      <div class=group>
         <button on:click={() => boxStore.add(5)}>Add 5</button>
         <button on:click={() => boxStore.add(50)}>Add 50</button>
         <button on:click={() => boxStore.removeRandom(50)}>Remove 50</button>
         <button on:click={() => boxStore.removeAll()}>Remove All</button>
      </div>
      <div class=group>
         <button on:click={() => boxStore.animateToLocation()}>AnimateTo Location</button>
         <button on:click={() => boxStore.animateToScaleRot()}>Scale / Rotation</button>
         <button on:click={() => boxStore.animateToCancel()}><i class="fas fa-stop"></i></button>
      </div>
      <div class=group>
         <button on:click={() => boxStore.gsapTimelineCreate()}>New Timeline</button>
         <button on:click={() => boxStore.gsapTimelinePlay()}><i class="fas fa-play"></i></button>
         <button on:click={() => boxStore.gsapTimelineReverse()}><i class="fas fa-backward"></i></button>
         <button on:click={() => boxStore.gsapTimelinePause()}><i class="fas fa-pause"></i></button>
         <button on:click={() => boxStore.gsapTimelineRestart()}><i class="fas fa-arrow-left"></i></button>
         <span style="transform: scale(0.75)"><label><input type=checkbox bind:checked={$storeStagger}>Stagger</label></span>
      </div>
   </div>
   <div class="container flex-vert">
      <div class=flex>
         <span>Set width / height to `auto`:</span>
         <input type=checkbox bind:checked={$storeAuto}>
      </div>
      <div class=flex>
         <span>Debug:</span>
         <label><input type=checkbox bind:checked={$storeDebug}>Enable</label>
         <label><input type=checkbox bind:checked={$storeLabels}>Labels</label>
      </div>
      <div class=flex>
         <span title="Position Control Layer">PCL:</span>
         <label><input type=checkbox bind:checked={$storePCL}>Enable</label>
         <button on:click={() => boxStore.save(controls.export())} style="margin-left: 0.25em">Save</button>
         <button on:click={() => boxStore.restore()}>Restore</button>
      </div>
   </div>
   <div class="container flex-vert">
      <div class=flex>
         <label class=duration>
            Duration (seconds):
            <input type=range min=0 max=3 step=0.1 bind:value={$storeDuration}>
            <input type=text bind:value={$storeDuration} readonly>
         </label>
      </div>
      <div class=flex>
         <label>
            Easing:
            <select bind:value={$storeEase}>
               {#each gsapEasingList as entry}
                  <option value={gsapEasingFunc[entry]}>{entry}</option>
               {/each}
            </select>
         </label>
      </div>
   </div>
   <div class="container flex-vert">
      <span style="width: 6.5em">Count: {$boxStore.length}</span>
      <div class=flex>
         <span>Validation:</span>
         <input type=checkbox bind:checked={$storeValidator}/>
      </div>
   </div>
</div>

<style lang="scss">
   button {
      width: fit-content;
      height: 22px;
      line-height: 20px;
   }

   div.container {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25em;
      border: 2px solid rgba(60,60,207,0.8);
      padding: 0 0.25em;
      height: 95%;
      margin-left: 0.25em
   }

   div.header {
      background: linear-gradient(337deg, rgba(2,0,36,0.75) 0%, rgba(40,40,207,0.5) 48%, rgba(149,171,176,0.75) 100%);
      border-bottom: solid black 1px;
      white-space: nowrap;
   }

   div.group {
      display: flex;
      padding-top: 0.25em;
   }

   input { color: white; margin: 3px 3px }
   input[type=range] { max-width: 3.75em }
   input[type=text] { max-width: 2em; pointer-events: none; }

   select {
      color: white;
      margin: 3px 6px;
   }

   select option {
      background: rgba(60,60,207,0.8);
      color: inherit;
   }

   .flex {
      display: flex;
      height: fit-content;
      align-items: center;
   }

   .flex-vert {
      display: flex;
      flex-direction: column;
      height: fit-content;
      justify-content: center;
      align-items: center;
   }

   label {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
   }

   span {
      color: white;
   }
</style>
