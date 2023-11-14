<script>
   import { getContext }            from 'svelte';

   import { EmptyApplicationShell } from '#runtime/svelte/component/core';

   import { draggable }             from '#runtime/svelte/store/position';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   // Store position reference.
   const position = application.position;
</script>

<svelte:options accessors={true}/>

<EmptyApplicationShell bind:elementRoot>
   <!--
    * width & height will be what you set in app options.
    *
    * You are in control of adding the draggable action to whatever element that you want to be the drag handle.
    * In this case it is added to the entire `drag-target` content div therefore to allow focusable elements like the
    * included input element you should limit draggable targets by `hasTargetClassList`.
    *
    * You may choose to have a specific drag handle element that is smaller than the content area and can apply the
    * draggable action to that without the need for `hasTargetClassList`.
   -->
   <div class=drag-target use:draggable={{ position, hasTargetClassList: ['drag-target'] }}
        on:contextmenu={() => application.close()}
        role=application>
      <h2 class=drag-target>Context click to close</h2>
      <input type=text placeholder="An input showing focus control" />
   </div>
</EmptyApplicationShell>

<style>
   div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;
      width: 100%;
      background: rgba(255, 100, 100, 0.5);
      padding: 8px;
      touch-action: none;
   }

   input {
      background: rgba(255, 0, 0, 0.5);
      color: white;
   }

   input::placeholder {
      color: lightgray;
   }
</style>
