<script>
   import { getContext }      from 'svelte';

   /** 
    * @import { SvelteApp }   from '#runtime/svelte/application';
    * @import { AppShell }    from '#runtime/svelte/component/application';
    */

   // The following is to support this demo showcasing the dynamic application of CQ and protection the app shells
   // have to enable / disable CQ when positional `width` or `height` changes to `auto`. `inline-size` CQ is
   // indeterminate when `width` is `auto`. `size` CQ is indeterminate when either `width` or `height` is `auto`.

   /** @type {SvelteApp.Context.External} */
   const { application } = getContext('#external');

   /** @type {AppShell.Context.InternalAppStores} */
   const {
      contentWidth,
      contentHeight } = getContext('#internal').stores;

   const {
      intrinsicHeight,
      intrinsicWidth } = application.position.stores;

   const { containerQueryType } = application.reactive.storeAppOptions;

   let heightAuto = $intrinsicHeight;
   let widthAuto = $intrinsicWidth;

   $: application.position.height = heightAuto ? 'auto' : null;
   $: application.position.width = widthAuto ? 'auto' : null;
</script>

<fieldset class="tjs-panel-content tjs-panel-content--flex-col">
   <legend class=tjs-panel-legend>App Window Content Constraints</legend>
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

   fieldset {
      margin: auto auto 0 auto;
      justify-content: center;
   }
</style>
