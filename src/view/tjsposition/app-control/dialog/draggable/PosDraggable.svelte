<script>
   import {
      optionComponents,
      optionStores,
      optionValues,
      storeDraggable }     from './index.js';

   let draggableOptions, draggableOptionComp;

   $: {
      draggableOptionComp = optionComponents[$storeDraggable];
      draggableOptions = optionStores[$storeDraggable];
   }
</script>

<section>
   <div>
      <label>Draggable Implementation:
         <select bind:value={$storeDraggable}>
            {#each Object.entries(optionValues) as [key, value]}
               <option value={value}>{key}</option>
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

      background: var(--tjs-content-background);
      border: var(--tjs-content-border);
      border-radius: var(--overlay-border-radius);
      padding: var(--overlay-padding);

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
