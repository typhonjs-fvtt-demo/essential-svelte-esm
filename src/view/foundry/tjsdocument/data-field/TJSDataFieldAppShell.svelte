<script>
   import { popoverTooltip }     from '#runtime/svelte/action/dom/tooltip';
   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { isObject }           from '#runtime/util/object';

   import { TJSDataField }       from '#standard/component/fvtt/datafield';

   /**
    * @import { TooltipOptions }          from '#runtime/svelte/action/dom/tooltip';
    * @import { MinimalWritable }         from '#runtime/svelte/store/util';
    *
    * @import {
    *    TJSDataFieldOptions,
    *    TJSDataFieldValidationCallback } from '#standard/component/fvtt/datafield';
    */

   /** @type {HTMLElement} */
   export let elementRoot;

   /**
    * @type {Map<string, fvtt.DataField>}
    */
   const datafields = new Map(/** @type {Array<[string, fvtt.DataField]>} */ ([
      ['StringField', new foundry.data.fields.StringField({ initial: 'Hello to reactive data fields!' })],
      ['NumberField (basic)', new foundry.data.fields.NumberField({ initial: 666 })],
      ['NumberField (range)', new foundry.data.fields.NumberField({ initial: 666, min: 0, max: 1000, step: 1 })],
      ['AlphaField (range)', new foundry.data.fields.AlphaField({ step: 0.01 })],
      ['AngleField (range)', new foundry.data.fields.AngleField({ step: 1 })],
      ['BooleanField', new foundry.data.fields.BooleanField()],
      ['HueField', new foundry.data.fields.HueField({ step: 0.01 })],
      ['ColorField', new foundry.data.fields.ColorField({ initial: '#ff0000' })],
      ['FilePathField (images)', new foundry.data.fields.FilePathField({ categories: ['IMAGE']})],
      ['DocumentUUIDField (single)', new foundry.data.fields.DocumentUUIDField()],
      ['ForeignDocumentField (actor)', new foundry.data.fields.ForeignDocumentField(foundry.documents.BaseActor)],
      ['SetField (strings)', new foundry.data.fields.SetField(
       new foundry.data.fields.StringField({ choices: () => ({ foo: 'foo', bar: 'bar' }) }))],
      ['SetField (doc UUID)', new foundry.data.fields.SetField(new foundry.data.fields.DocumentUUIDField())],
      ['HTMLField', new foundry.data.fields.HTMLField()],
      ['JavaScriptField', new foundry.data.fields.JavaScriptField()],
      ['JSONField', new foundry.data.fields.JSONField()],
      ['GridOffsetsField', new foundry.data.fields.GridOffsetsField()],
      ['ShaderField (not implemented)', new foundry.data.fields.ShaderField()],
   ]));

   /**
    * @type {TooltipOptions}
    */
   const resetInitialTooltip = {
      direction: 'UP',
      isHTML: true,
      tooltip: 'When true and the effective DataField changes, synchronize the store to that field’s initial value. ' +
       'When no valid DataField is available, synchronize the store to undefined. <br><br>When false, the existing ' +
        'store value is preserved across DataField changes whenever it remains compatible with the new DataField. ' +
         'Otherwise, the store is synchronized to the initial value of the new DataField.'
   };

   /**
    * @type {TJSDataFieldOptions}
    */
   let datafieldOptions;

   /**
    * Initial data field key to display.
    *
    * @type {string}
    */
   let datafieldKey = 'StringField';

   /**
    * Bare input or form group selection.
    *
    * @type {'input' | 'group'}
    */
   let datafieldType = 'input';

   /**
    * Enabled state of TJSDataField.
    */
   let enabled = true;

   /**
    * Stacking option for the form group.
    */
   let formgroupStacked = false;

   /**
    * TJSDataField `resetInitial` state.
    */
   let resetInitial = true;

   $:
   {
      // On changes recreate the TJSDataField combined options for reactive updates.
      datafieldOptions = {
         datafield: datafields.get(datafieldKey),

         enabled,

         groupConfig: datafieldType === 'input' ? void 0 : {
            label: datafieldKey,
            hint: `Hint for data field ${datafieldKey}`,
            stacked: formgroupStacked
         },

         /**
          * You may assign a callback that gets invoked from user changes with any validation failure.
          * This simply logs it to the console. You might for instance want to post a UI notification, etc.
          *
          * @type {TJSDataFieldValidationCallback}
          */
         onValidationFailure: (err, context) => console.warn(context, err),

         resetInitial
      };
   }

   /**
    * This demo example binds to the internal store of `TJSDataField`. You may provide an external store as well.
    *
    * @type {MinimalWritable<unknown>}
    */
   let store;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <fieldset class="tjs-panel-content tjs-panel-content--flex-row">
         <legend class=tjs-panel-legend>TJSDataField Options</legend>
         <label>
            <span>DataField:</span>
            <select bind:value={datafieldKey}>
               {#each datafields.keys() as name}
                  <option value={name}>{name}</option>
               {/each}
               <option value={void 0}>None</option>
            </select>
         </label>
         <label>
            <span>Type:</span>
            <select bind:value={datafieldType}>
               <option value={'input'}>Input Only</option>
               <option value={'group'}>As Form Group</option>
            </select>
         </label>
         <label>
            <span>Enabled:</span>
            <input type=checkbox bind:checked={enabled}>
         </label>
         <label>
            <span>Reset Initial:</span>
            <input type=checkbox bind:checked={resetInitial}>
            <i class="fa-regular fa-circle-question" use:popoverTooltip={resetInitialTooltip}></i>
         </label>
         {#if datafieldType === 'group'}
            <label>
               <span>Stacked:</span>
               <input type=checkbox bind:checked={formgroupStacked}>
            </label>
         {/if}
      </fieldset>

      <fieldset class=tjs-panel-content>
         <legend class=tjs-panel-legend>TJSDataField {isObject(datafieldOptions.groupConfig) ? '(as form group w/ label, hint, units)' : '(just the input)'}</legend>
         <TJSDataField bind:store input={datafieldOptions} />
      </fieldset>

      <fieldset class=tjs-panel-content>
         <legend class=tjs-panel-legend>Bound store value (typeof: {typeof $store})</legend>
         {JSON.stringify($store, null, 2)}
      </fieldset>

      <section class=tjs-panel-content>
         `TJSDataField` provides a reactive Svelte wrapper around Foundry VTT DataField instances,
         supporting dynamic DataField changes, bindable stores, and automatic synchronization between DataField cleaned
         values and store-specific runtime representations when required.
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      gap: 2rem;
   }

   label {
      display: flex;
      align-items: center;
      gap: 0.5em;
   }
</style>
