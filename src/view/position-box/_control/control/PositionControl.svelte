<script>
   import {
      getContext,
      setContext }            from 'svelte'

   import { applyPosition }   from '@typhonjs-fvtt/runtime/svelte/action'

   import { draggable }       from './draggable.js';

   import ResizeControl       from './resize/ResizeControl.svelte';
   import SelectedBorder      from './SelectedBorder.svelte';

   export let control;

   setContext('pcControl', control)

   const controls = getContext('pclControls');

   const { enabled } = controls.stores;

   const { resizing, selected } = control.stores;

   // Must store position as control is a store and will trigger updates to applyPosition action.
   const position = control.position;

   const dragUpdate = { left: '', top: '' };

   function dragging(dX, dY)
   {
      for (const control of controls.selected.values())
      {
         dragUpdate.left = `${dX >= 0 ? '+' : '' }${dX}`;
         dragUpdate.top = `${dY >= 0 ? '+' : '' }${dY}`;

         control.position.set(dragUpdate);
      }
   }

   function onClick(event)
   {
      // Only handle click events when <ctrl> key pressed.
      if (!event.ctrlKey) { return; }

      // Remove selection if <ctrl> key is pressed.
      if ($selected)
      {
         controls.selected.remove(control);
      }
      else // Add control to selection if <ctrl> key is pressed otherwise set control as only selected item.
      {
         controls.selected.add(control);
      }
   }

   function onPointerDown()
   {
      // If already selected set as primary control.
      if ($selected) { controls.selected.setPrimary(control); }
   }
</script>
<div use:applyPosition={position}
     use:draggable={{ dragging, active: $selected && !$enabled }}
     on:click={onClick}
     on:pointerdown={onPointerDown}
     class:enabled={$enabled || $selected}
     class:cursor-default={$enabled && !$resizing}
     class:cursor-grab={$selected && !$enabled}
>
    {#if $selected}
       <ResizeControl />
       <SelectedBorder />
    {/if}
</div>

<style>
   div {
      position: absolute;
      z-index: 999999;
      pointer-events: none;
   }

   .cursor-default {
      cursor: default;
   }

   .cursor-grab {
      cursor: grab;
   }

   .enabled {
      pointer-events: auto;
   }
</style>