<script>
   import { setContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { TJSDocument }        from '#runtime/svelte/store/fvtt/document';

   import { TJSDocDataField }    from '#standard/component/fvtt/datafield';

   export let elementRoot = void 0;

   // Create a document wrapper that is updated with document dropped on section.
   const doc = new TJSDocument();

   setContext('rootDocument', doc);

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
   <main>
      <!-- `preventDefault` on `dragover` is necessary for cross browser window drag & drop -->
      <section class=tjs-panel-content
               on:drop|preventDefault|stopPropagation={onDrop}
               on:dragover|preventDefault
               aria-dropeffect=none
               aria-label="Document drop target">
         Drop a document here (change the doc name to see reactivity)
      </section>

      <section class="tjs-panel-content tjs-panel-content--flex-row">
         <!-- svelte-ignore a11y-label-has-associated-control -->
         <label>
            <span>Name:</span>
            <TJSDocDataField path={'name'} />
         </label>
      </section>

      <section class="tjs-panel-content tjs-panel-content--flex-row">
         <!-- svelte-ignore a11y-label-has-associated-control -->
         <label>
            <span>HP:</span>
<!--            <TJSDocDataField path={'system.attributes.hp.value'} />-->
            <TJSDocDataField path={['system', 'attributes', 'hp', 'value']} />
         </label>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }

   section {
      display: flex;
      flex-direction: column;
      min-height: 2em;
   }

   label {
      display: flex;
      align-items: center;
      gap: 0.5em;
   }
</style>
