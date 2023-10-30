<script>
   import { onDestroy }          from 'svelte';
   import { writable }           from 'svelte/store';

   import { ApplicationShell }   from '#runtime/svelte/component/core';

   import {
      FVTTFilePicker,
      TJSContextMenu }           from '#standard/application';

   import { TJSFileButton }      from '#standard/component/fvtt';

   export let elementRoot = void 0;

   let filepath = '';
   let filepath2 = '';
   let filepath3 = '';

   // Demo of writable store for button configuration data. Uncomment `store` in the first `button` options.
   let storeFilepath = writable('');
   $: if ($storeFilepath !== '') { console.log(`FilePickerAppShell - storeFilepath set: `, $storeFilepath); }

   const button = {
      pickerOptions: {
         id: 'test-fp',
         // store: storeFilepath, // You may assign a writable store to receive result changes.
         top: 100
      }
   }

   const button2 = {
      pickerOptions: {
         id: 'test-fp2',
         modal: true,
         modalOptions: {
            // background: 'red',
            closeOnInput: true
         },
         top: 100
      }
   }

   const button3 = {
      label: 'Pick File',
      icon: 'fas fa-wrench',
      title: 'A custom title',
      pickerOptions: {
         id: 'test-fp3',
         top: 100
      }
   }

   // It is always a good idea to close any open file pickers when your app that depends on them closes.
   // By invoking `FVTTFilePicker.close` with a list of all app ID names used for file pickers you can close any
   // associated file picker app easily.
   onDestroy(() => FVTTFilePicker.close(['test-fp', 'test-fp2', 'test-fp3']));
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <section>
      <h3>Basic Button:</h3>
      <label>
         <span>Standard:</span>
         <input type=text bind:value={filepath} readonly />
      </label>
      <TJSFileButton bind:filepath {button} />

      <label>
         <span>Modal:</span>
         <input type=text bind:value={filepath2} readonly />
      </label>
      <TJSFileButton bind:filepath={filepath2} button={button2} />
   </section>

   <section>
      <h3>Basic Button w/ customization & context menu:</h3>
      <label>
         <span>Standard:</span>
         <input type=text bind:value={filepath3} readonly />
      </label>
      <TJSFileButton bind:filepath={filepath3}
                     button={button3}
                     on:contextmenu={(event) => TJSContextMenu.create({ event, items: [{ label: 'A demo menu item'}]})} />
   </section>
</ApplicationShell>

<style>
   section {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 0.5em;
   }

   section:not(:last-child) {
      margin-bottom: 1em;
   }

   h3 {
      grid-column: span 3;  /* Span across all columns. */
      text-align: left;
   }

   input {
      width: 100%;
   }

   label {
      display: contents;
   }

   span {
      text-align: right;
      white-space: nowrap;
   }
</style>