<script>
   import {
      getContext,
      setContext }            from 'svelte'

   import { applyPosition }   from '@typhonjs-fvtt/runtime/svelte/action'

   import { draggable }       from './draggable.js';

   import ResizeControl       from './resize/ResizeControl.svelte';

   export let control;

   setContext('pcControl', control)

   const controls = getContext('pclControls');

   const storeSelected = control.stores.selected;

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
      if ($storeSelected)
      {
         // Remove selection if <ctrl> key is pressed.
         if (event.ctrlKey)
         {
            controls.selected.remove(control);
         }
      }
      else
      {
         // Add control to selection if <ctrl> key is pressed otherwise set control as only selected item.
         if (event.ctrlKey)
         {
            controls.selected.add(control);
         }
         else
         {
            controls.selected.set(control);
         }
      }
   }

   function onPointerDown(event)
   {
      // Prevent pointer down events when not selected. Prevents pointer / mouse input on the control layer.
      if (!$storeSelected)
      {
         event.preventDefault();
         event.stopPropagation();
      }
   }
</script>

<div use:applyPosition={control.position}
     use:draggable={{ dragging, active: $storeSelected }}
     on:click={onClick}
     on:pointerdown={onPointerDown}
>
   {#if $storeSelected}
      <ResizeControl />
      <div class=border />
   {/if}
</div>

<style>
   div {
      position: absolute;
      z-index: 999999;
   }

   div.border {
      position: absolute;
      border: dotted lightblue 2px;
      width: 100%;
      height: 100%;
      pointer-events: none;
   }
</style>