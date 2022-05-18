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
      <label for=draggableSelect>Draggable Implementation:</label>
      <select id=draggableSelect bind:value={$storeDraggable}>
         {#each Object.entries(optionValues) as [key, value]}
            <option value={value}>{key}</option>
         {/each}
      </select>
   </div>

   <svelte:component this={draggableOptionComp} options={$draggableOptions} />
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

      select { margin: 6px; width: fit-content; }

      label {
         text-align: right;
         width: 6em;
      }
   }
</style>