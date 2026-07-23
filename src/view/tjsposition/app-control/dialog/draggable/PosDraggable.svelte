<script>
   import {
      optionComponents,
      optionFnValues,
      optionStores,
      storeDraggable }              from './index.js';

   /** 
    * @import { SvelteComponent }   from 'svelte';
    * @import { Readable }          from 'svelte/store';
    */

   /** @type {Readable<any>} */
   let draggableOptions;

   /** @type {typeof SvelteComponent<any>} */
   let draggableOptionComp;

   $: {
      draggableOptionComp = optionComponents[$storeDraggable];
      draggableOptions = optionStores[$storeDraggable];
   }
</script>

<section class=tjs-panel-content>
   <div>
      <label>Draggable Implementation:
         <select bind:value={$storeDraggable}>
            {#each Object.keys(optionFnValues) as key}
               <option value={key}>{key}</option>
            {/each}
         </select>
      </label>
   </div>

   <svelte:component this={draggableOptionComp} options={$draggableOptions} />
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;

      select {
         width: fit-content;
      }

      div {
         display: flex;
         align-items: center;
         justify-content: center;
         gap: 0.75em;
      }

      label {
         display: flex;
         align-items: center;
         justify-content: center;
         flex: 1;
         gap: 0.5em;
         text-align: right;
      }
   }
</style>
