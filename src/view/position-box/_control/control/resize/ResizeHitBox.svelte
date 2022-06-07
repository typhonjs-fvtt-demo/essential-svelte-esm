<script>
   import { getContext }   from 'svelte';

   import { applyStyles }  from '@typhonjs-fvtt/runtime/svelte/action'

   import { resize }          from './resize.js';
   import { applyResizeData } from './applyResizeData.js';

   export let data;

   const control = getContext('pcControl');
   const controls = getContext('pclControls');

   const capture = () => null;

   function resizeCallback(id, dX, dY, event)
   {
      if (event.shiftKey)
      {
         for (const control of controls.selected.values())
         {
            control.position.set(applyResizeData(id, dX, dY, control));
         }
      }
      else
      {
         control.position.set(applyResizeData(id, dX, dY, control));
      }
   }
</script>

<div use:applyStyles={data.styles}
     use:resize={{ id: data.id, resizeCallback }}
     on:pointerdown|preventDefault|stopPropagation={() => control.resizing = true}
     on:pointermove|preventDefault|stopPropagation={capture}
     on:pointerover|preventDefault|stopPropagation={capture}
     on:pointerup|preventDefault|stopPropagation={() => control.resizing = false}
/>

<style>
   div {
      position: absolute;
   }
</style>