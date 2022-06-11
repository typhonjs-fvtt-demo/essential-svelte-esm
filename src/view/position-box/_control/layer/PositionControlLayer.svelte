<script>
   import { setContext }      from 'svelte';

   import PositionControl     from '../control/PositionControl.svelte';
   import { ControlsStore }   from './ControlsStore.js';

   const [controlsStore, selectedDragAPI] = new ControlsStore();

   export let controls = controlsStore;

   export let components;

   export let active = true;
   export let boundingRect = void 0;
   export let validate = true;

   setContext('pclControls', controls);
   setContext('pclSelectedDragAPI', selectedDragAPI);

   $: controls.boundingRect = boundingRect;
   $: controls.validate = validate
   $: controls.updateComponents(components);

   function onKeyDown(event)
   {
      if (event.key === 'Control' && !event.repeat) { controls.enabled = true; }
   }

   function onKeyUp(event)
   {
      if (event.key === 'Control' && !event.repeat) { controls.enabled = false; }
   }

   function onMouseDown(event)
   {
      if (!event.ctrlKey) { controls.selected.clear(); }
   }
</script>

<svelte:body on:keydown={onKeyDown} on:keyup={onKeyUp} />

{#if active}
<div on:mousedown|capture={onMouseDown}>
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