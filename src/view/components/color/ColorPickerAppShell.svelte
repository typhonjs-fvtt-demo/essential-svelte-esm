<script>
   import { ApplicationShell }      from '@typhonjs-fvtt/runtime/svelte/component/core';

   import {
      TJSColordPicker,
      TJSColordPickerSavedColors }  from '@typhonjs-fvtt/svelte-standard/component';

   export let elementRoot = void 0;

   const options = {
      addons: [TJSColordPickerSavedColors],
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

   // let color = '#ff0000';
   // let color = 'rgba(255, 50, 50, 0.5)';
   // let color = 'hsla(240, 50%, 100%, 0.5)';
   // let color = { h: 180, s: 100, v: 100, a: 0.35 };

   // let color = 'hsla(-0.25turn 50% 100% / 0.5)';
   // let color = 'hsla(-0.25456565656turn 99.456546456456% 50% / 0.5)';

   // let color = 'hsl(240, 100%, 50%, 0.5)';
   // let color = 'hsla(240, 50%, 99%, 0.5)';

   // let color = void 0;

   let color = 'hsl(240 100% 50% / 0.5)';
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <section class=tjs-settings-entry>
      <main>
         <label>Text Input:<input type=checkbox bind:checked={options.hasTextInput}></label>
         <label>Button Bar:<input type=checkbox bind:checked={options.hasButtonBar}></label>
         <label>Addons:<input type=checkbox bind:checked={options.hasAddons}></label>

         <label>Chrome Layout:<input type=checkbox on:change={(e) => options.layout = e.target.checked ? 'chrome' : void 0}></label>
         <label>Enable Alpha:<input type=checkbox bind:checked={options.hasAlpha}></label>
         <label>Lock Text Format:<input type=checkbox bind:checked={options.lockTextFormat}></label>
         <label>Popup:<input type=checkbox bind:checked={options.isPopup}></label>
      </main>
   </section>

   <section class=tjs-settings-entry>
      <main>
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
      </main>
   </section>

   <section class=tjs-settings-entry>
      <span>{typeof color === 'object' ? JSON.stringify(color) : color}</span>
   </section>

   <main>
      <TJSColordPicker bind:color options={options} />
      <TJSColordPicker bind:color options={options} />
   </main>
</ApplicationShell>

<style>
   input {
      margin: 0 8px;
      vertical-align: bottom;
      position: relative;
      top: 1px;
   }

   input[type=range] {
      vertical-align: center;
   }

   /* For testing select elements */
   select {
      color: #b5b3a4
   }

   span {
      /*color: var(--tjs-settings-entry-label-color, inherit);*/
      /*font-size: var(--tjs-settings-entry-label-font-size, inherit);*/
      /*line-height: var(--tjs-settings-entry-label-line-height, var(--form-field-height));*/
      flex: 2;
   }

   main {
      display: flex;
      justify-content: space-between;
   }

   section {
      clear: both;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
   }

   section:not(:last-child) {
      margin: 0 0 1rem 0;
   }
</style>