<script>
   import { onDestroy }             from 'svelte';

   import { rippleFocus }           from '#runtime/svelte/action/animate';

   import { FVTTFilePickerControl } from '#standard/application';

   import { TJSInput }              from '#standard/component';

   import {
      TJSFileButton,
      TJSFileIconButton,
      TJSFileSlotButton }           from '#standard/component/fvtt';

   import { createButtonData }      from './createButtonData.js';

   import ImageContent              from './ImageContent.svelte';

   // Defines a string to prepend to all file picker app instances to make unique IDs between the normal and
   // modal dialog version.
   export let idPrepend = '';

   // Creates all file picker button data using `idPrepend` to make unique CSS IDs.
   const buttons = createButtonData(idPrepend);

   // It is always a good idea to close any open file pickers when your app that depends on them closes.
   // By invoking `FVTTFilePickerControl.close` with a list of all app ID names used for file pickers you can close any
   // associated file picker app easily.
   onDestroy(() => FVTTFilePickerControl.close(buttons.map((button) => button?.pickerOptions?.id)));

   // Provides default options shared by all TJSInput components.
   const input = {
      efx: rippleFocus(),  // This adds the material design ripple focus effect.
      readonly: false      // Input is read only.
   }
</script>
<main>
   <section>
      <h3>TJSFileButton (modal does not close on glasspane input):</h3>
      <TJSInput {input} label={'Standard:'} store={buttons[0].pickerOptions.store} />
      <TJSFileButton button={buttons[0]} />

      <TJSInput {input} label={'Modal:'} store={buttons[1].pickerOptions.store} />
      <TJSFileButton button={buttons[1]} />
   </section>

   <section>
      <h3>TJSFileButton w/ customization & context menu:</h3>
      <TJSInput {input} label={'Standard:'} store={buttons[2].pickerOptions.store} />
      <TJSFileButton button={buttons[2]} />
   </section>

   <section>
      <h3>TJSFileIconButton (modal does close on glasspane input):</h3>
      <TJSInput {input} label={'Standard:'} store={buttons[3].pickerOptions.store} />
      <TJSFileIconButton button={buttons[3]} />

      <TJSInput {input} label={'Modal:'} store={buttons[4].pickerOptions.store} />
      <TJSFileIconButton button={buttons[4]} />
   </section>

   <section>
      <h3>TJSFileSlotButton w/ efx:</h3>
      <TJSInput {input} label={'Standard:'} store={buttons[5].pickerOptions.store} />
      <TJSFileSlotButton button={buttons[5]}>
         <ImageContent playbackRate={0.1}/> <!-- Uses the 'filepath' context from TJSFileSlotButton to display an image -->
      </TJSFileSlotButton>
   </section>
</main>

<style>
   h3 {
      grid-column: span 3;  /* Span across all columns. */
      text-align: left;
   }

   /* Uncomment to see what the ripple effect looks like w/ a color gradient. */
   /*main {*/
   /*   --tjs-action-ripple-background: linear-gradient(64.5deg, rgba(245, 116, 185, 1) 40%, rgba(89, 97, 223, 1) 60% );*/
   /*}*/

   /* Sets up a three-column grid layout:
      - The first and third columns are sized based on their content (label span / file buttons).
      - The middle column occupies the remaining space (TJSInput). */
   section {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 0.5em;
   }

   section:not(:last-child) {
      margin-bottom: 1em;
   }
</style>