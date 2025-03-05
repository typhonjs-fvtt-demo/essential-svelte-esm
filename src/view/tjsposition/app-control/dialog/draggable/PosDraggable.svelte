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

      border: 0.1em solid var(--content-link-border-color);
      border-radius: 1em;
      background: var(--section-background-color);

      padding: 0.5em;

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
