<script>
   import { getContext }   from 'svelte';

   // The following is to support this demo showcasing the dynamic application of CQ and protection the app shells
   // have to enable / disable CQ when positional `width` or `height` changes to `auto`. `inline-size` CQ is
   // indeterminate when `width` is `auto`. `size` CQ is indeterminate when either `width` or `height` is `auto`.

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   /** @type {import('#runtime/svelte/component/application').AppShell.Context.InternalAppStores} */
   const {
      contentWidth,
      contentHeight,
      elementRoot } = getContext('#internal').stores;

   const {
      resizeObservableHeight,
      resizeObservableWidth } = application.position.stores;

   const { containerQueryType } = application.reactive.storeAppOptions;

   let heightAuto = $resizeObservableHeight;
   let widthAuto = $resizeObservableWidth;

   $: application.position.height = heightAuto ? 'auto' : $elementRoot?.offsetHeight ?? void 0;
   $: application.position.width = widthAuto ? 'auto' : $elementRoot?.offsetWidth ?? void 0;

   $: if (!$resizeObservableHeight) { heightAuto = false; }
   $: if (!$resizeObservableWidth) { widthAuto = false; }
</script>

<!-- Use `standard-form` class from Foundry / core styles -->
<section class=standard-form>
   <fieldset>
      <legend>App Window Content Constraints</legend>
      <div class=row>
         <label>
            <span>Width:</span>
            <input type=text value={`${Math.floor($contentWidth)}px`} readonly />
         </label>
         <label>
            <span>Height:</span>
            <input type=text value={`${Math.floor($contentHeight)}px`} readonly />
         </label>
      </div>
      <div class=row>
         <label>
            <span>Width (auto):</span>
            <input type=checkbox bind:checked={widthAuto} />
         </label>
         <label>
            <span>Height (auto):</span>
            <input type=checkbox bind:checked={heightAuto} />
         </label>
      </div>
      <div class=row>
         <label>
            <span>Container Query Type:</span>
            <select bind:value={$containerQueryType}>
               <option value={void 0}>None</option>
               <option value={'inline-size'}>inline-size</option>
               <option value={'size'}>size</option>
            </select>
         </label>
      </div>
   </fieldset>
</section>

<style lang=scss>
   div {
      &.row {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
   }

   label {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input[type=text] {
         width: 5em;
      }

      select {
         width: fit-content;
      }
   }

   .standard-form {
      display: flex;
      margin: auto auto 0 auto;

      height: fit-content;
      width: fit-content;

      fieldset {
         justify-content: center;
         gap: 0.25rem;
         padding: 0.5rem;
      }
   }
</style>
