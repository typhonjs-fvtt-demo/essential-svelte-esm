<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { TJSDocument }        from '@typhonjs-fvtt/runtime/svelte/store';

   export let elementRoot = void 0;

   // Create a document wrapper that is updated with document dropped on section.
   const doc = new TJSDocument();

   /**
    * Handles parsing the drop event and sets the new `uuid` or undefined.
    *
    * @param {DragEvent}   event -
    */
   function onDrop(event)
   {
      try
      {
         doc.setFromDataTransfer(JSON.parse(event.dataTransfer.getData('text/plain')))
      }
      catch (err) { /**/ }
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   Drop a document below:
   <section on:drop|preventDefault|stopPropagation={onDrop}>
      Document name: {$doc?.name}
   </section>
</ApplicationShell>

<style>
   section {
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      border-radius: 0.25em;
      border: 2px solid rgba(0, 0, 0, 0.2);
      padding: 0.25em;
   }
</style>