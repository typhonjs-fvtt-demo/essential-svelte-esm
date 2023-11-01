<script>
   import { TJSDialog }          from '#runtime/svelte/application';
   import { ApplicationShell }   from '#runtime/svelte/component/core';

   import FilePickerButtonContent   from './FilePickerButtonContent.svelte';

   export let elementRoot = void 0;

   function onClick()
   {
      TJSDialog.prompt({
         title: 'A modal dialog!',
         draggable: false,
         minimizable: false,
         modal: true,
         // modalOptions: {   // You can set the dialog to close on clicks to the modal / glasspane.
         //   closeOnInput: true
         // },
         content: {
            class: FilePickerButtonContent,
            props: {
               idPrepend: 'dialog-'
            }
         },
         label: 'Ok'
      }, { classes: ['tjs-essential-svelte-esm'], width: 500 });
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <FilePickerButtonContent />

   <h3>Same components invoked from a modal app / dialog:</h3>
   <button on:click={onClick}>Launch modal dialog!</button>
</ApplicationShell>
