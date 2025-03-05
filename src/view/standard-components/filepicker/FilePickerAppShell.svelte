<script>
   import { getContext }            from 'svelte';

   import { TJSDialog }             from '#runtime/svelte/application';
   import { ApplicationShell }      from '#runtime/svelte/component/application';

   import { ripple }                from '#standard/action/animate/composable';
   import { TJSButton }             from '#standard/component/form';

   import FilePickerButtonContent   from './FilePickerButtonContent.svelte';

   export let elementRoot = void 0;

   // Used to not render the launch modal dialog section when app is popped out via the `PopOut!` module.
   // IE this is an example use case to show how `activeWindow` works. By using `TJSDialog.prompt`
   // multiple modal dialogs can be opened when popped out. This could easily be prevented as well by not using
   // `TJSDialog.prompt` and storing a reference to any dialog created.
   const { activeWindow } = getContext('#external').application.reactive.storeUIState;

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
      }, {
         classes: ['tjs-essential-svelte-esm'],
         // For modal dialogs / apps. You can pass elements or query strings that should receive focus when the dialog
         // closes. This will return focus to the invoking app.
         focusSource: { focusEl: [elementRoot] },
         width: 500
      });
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <FilePickerButtonContent />

   <!-- Do not show when popped out -->
   {#if $activeWindow === globalThis}
      <h4>Same components invoked from a modal app / dialog:</h4>
      <TJSButton on:press={onPress} efx={ripple()}>Launch modal dialog!</TJSButton>
   {/if}
</ApplicationShell>
