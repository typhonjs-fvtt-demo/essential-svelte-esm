<script>
   import { getContext }            from 'svelte';

   import { EmptyApplicationShell } from '#runtime/svelte/component/application';
   import { draggable }             from '#runtime/svelte/store/position';

   export let elementRoot = void 0;

   const { application } = getContext('#external');

   // Store position reference.
   const position = application.position;

   const storeResizable = application.reactive.storeAppOptions.resizable;
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
    *
    * Also note the use of the core style `scrollable`.
   -->
   <div class="drag-target scrollable" use:draggable={{ position, hasTargetClassList: ['drag-target'] }}
        on:contextmenu={() => application.close()}
        role=application>
      <h3 class=drag-target>Context click to close</h3>
      <input type=text placeholder="An input showing focus control" />
      <label>Resizable: <input type=checkbox bind:checked={$storeResizable}></label>
   </div>
</EmptyApplicationShell>

<style>
   div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;
      width: 100%;
      padding: 8px;
      touch-action: none;
   }

   /* Change background color based on core theme - `light` */
   :global(body.theme-light) div {
      background: rgba(200, 200, 200, 0.9);
   }

   /* Change background color based on core theme - `dark` */
   :global(body.theme-dark) div {
      background: rgba(50, 50, 50, 0.9);
   }

   label {
      /* This can be removed once Foundry core updates styles for themed labels */
      color: var(--color-text-primary);

      flex: 0 1 auto;
      width: max-content;
   }
</style>
