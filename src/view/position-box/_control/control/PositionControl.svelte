<script>
   import { getContext }      from 'svelte'

   import { applyPosition }   from '@typhonjs-fvtt/runtime/svelte/action'

   import { controls }        from '../layer/ControlsStore.js';
   import { draggable }       from './draggable.js';

   import ResizeControl       from './resize/ResizeControl.svelte';

   export let control;

   const pclBoundingRect = getContext('pclBoundingRect');

   const storeSelected = control.stores.selected;

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

   function onMouseMove(event)
   {
      const x = event.clientX - pclBoundingRect.left - control.position.left;
      const y = event.clientY - pclBoundingRect.top - control.position.top;

      // console.log(`! mouse - x: ${x} y: ${y}`);
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
     use:draggable={{ active: $storeSelected }}
     on:click={onClick}
     on:pointerdown={onPointerDown}
     on:mousemove={onMouseMove}
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