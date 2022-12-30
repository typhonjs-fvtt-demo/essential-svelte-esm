<script>
   import { getContext }            from 'svelte';

   import { EmptyApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { draggable }             from '@typhonjs-fvtt/runtime/svelte/action';

   export let elementRoot = void 0;

   const context = getContext('external');

   // Store position reference.
   const position = context.application.position;
</script>

<svelte:options accessors={true}/>

<EmptyApplicationShell bind:elementRoot>
   <!-- width & height will be what you set in app options -->
   <div use:draggable={{position}}
        on:contextmenu={() => context.application.close()}>
      Context click to close
   </div>
</EmptyApplicationShell>

<style>
   div {
      height: 100%;
      width: 100%;
      background: rgba(255, 100, 100, 0.5);
      font-size: 2em;
   }
</style>