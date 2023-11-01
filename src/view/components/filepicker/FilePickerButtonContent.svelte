<script>
   import { onDestroy }             from 'svelte';

   import { FVTTFilePickerControl } from '#standard/application';

   import {
      TJSFileButton,
      TJSFileIconButton,
      TJSFileSlotButton }           from '#standard/component/fvtt';

   import { createButtonData }      from './createButtonData.js';

   import ImageContent              from './ImageContent.svelte';

   export let idPrepend = '';

   const buttons = createButtonData(idPrepend);

   let filepath = '';
   let filepath2 = '';
   let filepath3 = '';
   let filepath4 = '';
   let filepath5 = '';
   let filepath6 = '';

   // Demo of writable store for button configuration data. Uncomment `store` in the first `button` options.
   const storeFilepath = buttons[0].pickerOptions.store;
   $: if ($storeFilepath !== '') { console.log(`FilePickerButtonContent - storeFilepath set: `, $storeFilepath); }

   // It is always a good idea to close any open file pickers when your app that depends on them closes.
   // By invoking `FVTTFilePickerControl.close` with a list of all app ID names used for file pickers you can close any
   // associated file picker app easily.
   onDestroy(() => FVTTFilePickerControl.close(buttons.map((button) => button?.pickerOptions?.id)));
</script>

<section>
   <h3>TJSFileButton:</h3>
   <label>
      <span>Standard:</span>
      <input type=text bind:value={filepath} readonly />
   </label>
   <TJSFileButton bind:filepath button={buttons[0]} />

   <label>
      <span>Modal:</span>
      <input type=text bind:value={filepath2} readonly />
   </label>
   <TJSFileButton bind:filepath={filepath2} button={buttons[1]} />
</section>

<section>
   <h3>TJSFileButton w/ customization & context menu:</h3>
   <label>
      <span>Standard:</span>
      <input type=text bind:value={filepath3} readonly />
   </label>
   <TJSFileButton bind:filepath={filepath3} button={buttons[2]} />
</section>

<section>
   <h3>TJSFileIconButton:</h3>
   <label>
      <span>Standard:</span>
      <input type=text bind:value={filepath4} readonly />
   </label>
   <TJSFileIconButton bind:filepath={filepath4} button={buttons[3]} />

   <label>
      <span>Modal:</span>
      <input type=text bind:value={filepath5} readonly />
   </label>
   <TJSFileIconButton bind:filepath={filepath5} button={buttons[4]} />
</section>

<section>
   <h3>TJSFileSlotButton w/ efx:</h3>
   <label>
      <span>Standard:</span>
      <input type=text bind:value={filepath6} readonly />
   </label>
   <TJSFileSlotButton bind:filepath={filepath6} button={buttons[5]}>
      <ImageContent />
   </TJSFileSlotButton>
</section>

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