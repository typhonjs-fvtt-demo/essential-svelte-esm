<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { TJSDocument }        from '#runtime/svelte/store/fvtt/document';

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
   Drop a document below (change the doc name to see reactivity):

   <!-- `preventDefault` on `dragover` is necessary for cross browser window drag & drop -->
   <section on:drop|preventDefault|stopPropagation={onDrop}
            on:dragover|preventDefault
            aria-dropeffect=none
            aria-label="Document drop target">
      {#if $doc}
         Document name: {$doc?.name}
      {/if}
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
      min-height: 2em;
   }
</style>
