<script>
   import { ApplicationShell }      from '#runtime/svelte/component/application';

   import {
      TJSColordPicker,
      TJSColordPickerSavedColors }  from '#standard/component/color/picker-colord';

   export let elementRoot = void 0;

   const options = {
      addons: [TJSColordPickerSavedColors],
      enabled: true,
      format: 'hsl',
      formatType: 'string',
      hasAddons: true,
      hasAlpha: true,
      hasButtonBar: true,
      hasTextInput: true,
      isPopup: false,
      lockTextFormat: false,
      precision: 0,
      width: 80
   };

   let color = 'hsl(240 100% 50% / 0.5)';
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=styled>
         <label class=column>Text Input:<input type=checkbox bind:checked={options.hasTextInput}></label>
         <label class=column>Button Bar:<input type=checkbox bind:checked={options.hasButtonBar}></label>
         <label class=column>Addons:<input type=checkbox bind:checked={options.hasAddons}></label>

         <label class=column>Chrome Layout:<input type=checkbox on:change={(e) => options.layout = e.target.checked ? 'chrome' : void 0}></label>
         <label class=column>Enable Alpha:<input type=checkbox bind:checked={options.hasAlpha}></label>
         <label class=column>Lock Text Format:<input type=checkbox bind:checked={options.lockTextFormat}></label>
         <label class=column>Popup:<input type=checkbox bind:checked={options.isPopup}></label>
         <label class=column>Enabled:<input type=checkbox bind:checked={options.enabled}></label>
      </section>

      <section class=styled>
         <label>Format:
            <select bind:value={options.format}>
               <option value=hex>HEX</option>
               <option value=hsl>HSL</option>
               <option value=hsv>HSV</option>
               <option value=rgb>RGB</option>
            </select>
         </label>
         <label>Type:
            <select bind:value={options.formatType}>
               <option value=string>String</option>
               <option value=object>Object</option>
            </select>
         </label>
         <label>Precision: <input type=range min=0 max=10 bind:value={options.precision} style="width: 100px"></label>
         <label>Width: <input type=range min=50 max=400 bind:value={options.width} style="width: 100px"> ({options.width})</label>
      </section>

      <section>
         <span>Value of the main `color` prop: {typeof color === 'object' ? JSON.stringify(color) : color}</span>
      </section>

      <section>
         <TJSColordPicker bind:color options={options} />
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      --tjs-action-ripple-background: linear-gradient(64.5deg, rgba(245, 116, 185, 1) 40%, rgba(89, 97, 223, 1) 60% );
   }

   label {
      display: flex;
      align-items: center;
      gap: 0.5em;
   }

   label.column {
      flex-direction: column;
      justify-content: center;
   }

   input {
      margin: 0 8px;
      vertical-align: bottom;
      position: relative;
      top: 1px;
   }

   input[type=range] {
      vertical-align: center;
   }

   span {
      flex: 2;
   }

   section {
      clear: both;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
   }

   section.styled {
      background: rgba(0, 0, 0, 0.1);
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--content-link-border-color);

      @at-root :global(body.theme-dark) & {
         background: rgba(208, 184, 163, 0.1);
      }
   }
</style>
