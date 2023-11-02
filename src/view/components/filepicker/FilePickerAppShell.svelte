<script>
   import { ripple }                from '#runtime/svelte/action/animate';
   import { TJSDialog }             from '#runtime/svelte/application';
   import { ApplicationShell }      from '#runtime/svelte/component/core';

   import { TJSButton }             from '#standard/component';

   import FilePickerButtonContent   from './FilePickerButtonContent.svelte';

   export let elementRoot = void 0;

   function onPress()
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
               idPrepend: 'dialog-' // Provides unique IDs for all file picker from the dialog.
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
   <TJSButton on:press={onPress} efx={ripple()}>Launch modal dialog!</TJSButton>
</ApplicationShell>