<script>
   import { setContext }      from 'svelte';

   import PositionControl     from '../control/PositionControl.svelte';
   import { ControlsStore }   from './ControlsStore.js';

   export let components;
   export let active = true;

   const controls = new ControlsStore();
   setContext('pclControls', controls);

   $: controls.updateComponents(components);
</script>

{#if active}
<div on:mousedown={() => controls.selected.clear()}>
   {#each $controls as control (control.id)}
      <PositionControl {control} />
   {/each}
   <slot />
</div>
{/if}

<style>
   div {
      width: 100%;
      height: 100%;
   }
</style>