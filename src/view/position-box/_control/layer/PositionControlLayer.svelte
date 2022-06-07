<script>
   import PositionControl  from '../control/PositionControl.svelte';

   import { controls }     from './ControlsStore.js';

   export let components;

   $: controls.updateComponents(components);
</script>

<div on:mousedown={() => controls.selected.clear()}>
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