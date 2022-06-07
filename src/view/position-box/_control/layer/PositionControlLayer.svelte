<script>
   import { setContext }   from 'svelte';

   import PositionControl  from '../control/PositionControl.svelte';

   import { controls }     from './ControlsStore.js';

   export let position;
   export let components;

   $: controls.updateComponents(components);

   let el;

   const boundingRect = { top: 0, left: 0, bottom: 0, right: 0 };

   setContext('pclBoundingRect', boundingRect);

   $:
   {
      // If outer "application" position moves this causes an update.
      if (position) { $position; }

      const rect = el?.getBoundingClientRect();

      if (rect)
      {
         boundingRect.top = rect.top;
         boundingRect.left = rect.left;
         boundingRect.bottom = rect.bottom;
         boundingRect.right = rect.right;
      }
   }
</script>

<div bind:this={el}
     on:mousedown={() => controls.selected.clear()}
     >
   {#each $controls as control (control.id)}
      <PositionControl {control} />
   {/each}
   <slot />
</div>

<style>
   div {
      width: 100%;
      height: 100%;
   }
</style>