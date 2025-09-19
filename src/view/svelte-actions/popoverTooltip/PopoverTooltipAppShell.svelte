<script>
   /**
    * This demo shows off the `popoverTooltip` action that allows reactive control of the Foundry popover tooltip.
    */

   import { writable }           from 'svelte/store';

   import { popoverTooltip }     from '#runtime/svelte/action/dom/tooltip';
   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { propertyStore }      from '#runtime/svelte/store/writable-derived';

   export let elementRoot = void 0;

   /**
    * Writable store of all tooltip options reactively passed to `popoverTooltip`.
    *
    * @type {import('svelte/store').Writable<import('#runtime/svelte/action/dom/tooltip').TooltipOptions>}
    */
   const tooltipData = writable({
      tooltip: void 0,
      tooltipHTML: void 0,

      cssClass: void 0,
      direction: void 0,
      locked: false
   });

   // Individual property stores that update `tooltipData` reactively.
   const tooltip = propertyStore(tooltipData, 'tooltip');
   const tooltipHTML = propertyStore(tooltipData, 'tooltipHTML');
   const cssClass = propertyStore(tooltipData, 'cssClass');
   const direction = propertyStore(tooltipData, 'direction');
   const locked = propertyStore(tooltipData, 'locked');

   // Local state for setting `tooltip` or `tooltipHTML` in the reactive statement below.
   let isHTML = false;

   // Click count used in button `on:click` callback.
   let clickCount = 0;

   // Tooltip message.
   let message = 'Hello!';

   // Reactive statement that triggers whenever `message` or `isHTML` changes updating the `tooltip` / `tooltipHTML`
   // properties of `tooltipData` which reactively updates the `popoverTooltip` action attached to the button element.
   $: {
      $tooltipHTML = isHTML ?
       `<i class="fas fa-champagne-glasses"></i>&nbsp;<span style="color: green;">${message}</span>` : void 0;

      $tooltip = !isHTML ? message : void 0;
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <p>
         The `popoverTooltip` action allows platform independent reactive tooltip control. The TRL Foundry
         implementation integrates with the Foundry tooltip support. All `#runtime` and `#standard` components use this
         action and it is available for any custom components that you create. A big benefit of the action is that it
         is data oriented and can update tooltip state reactively and serializes the data attributes changed on the
         element. Note: A locked tooltip is cloned and changes in tooltip content is not updated by Foundry.
      </p>

      <!-- Reset message on `pointerenter` and update message w/ dynamic click count -->
      <button use:popoverTooltip={$tooltipData}
         on:click={() => message = `Clicked: ${clickCount++}!`}
         on:pointerenter={() => { clickCount = 0; message = 'Hello!'; }}>
            Hover Over / Click Me!
      </button>

      <!-- Use `standard-form` class from Foundry / core styles -->
      <section class=standard-form>
         <fieldset>
            <legend>Action controls</legend>
            <div class=grid>
               <label>
                  <span>Direction:</span>
                  <select bind:value={$direction}>
                     <option value={void 0}>Default (none)</option>
                     <option value={'UP'}>Up</option>
                     <option value={'DOWN'}>Down</option>
                     <option value={'LEFT'}>Left</option>
                     <option value={'RIGHT'}>Right</option>
                     <option value={'CENTER'}>Center</option>
                  </select>
               </label>
               <label>
                  <span>Add Class:</span>
                  <select bind:value={$cssClass}>
                     <option value={void 0}>Default (none)</option>
                     <option value={'tjs-tooltip-blue-background'}>Blue Background</option>
                     <option value={'tjs-tooltip-red-background'}>Red Background</option>
                  </select>
               </label>
            </div>
            <div class=row>
               <label>
                  <span>Locked:</span>
                  <input type=checkbox bind:checked={$locked} />
               </label>
               <label>
                  <span style="margin-left: auto">Use HTML:</span>
                  <input type=checkbox bind:checked={isHTML} />
               </label>
            </div>
         </fieldset>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   // For custom classes added to tooltip.
   :global(#tooltip.tjs-tooltip-blue-background), :global(.locked-tooltip.tjs-tooltip-blue-background) {
      background: blue;
   }

   // For custom classes added to tooltip.
   :global(#tooltip.tjs-tooltip-red-background), :global(.locked-tooltip.tjs-tooltip-red-background) {
      background: red;
   }

   button {
      max-width: 200px;
   }

   div {
      &.grid {
         display: grid;
         grid-template-columns: auto 1fr;
         align-items: center;
         gap: 0.5em;

         span {
            text-align: right;
         }
      }

      &.row {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
   }

   label {
      display: contents;
   }

   main {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5em;
      height: 100%;
   }

   p {
      text-align: center;
   }

   .standard-form {
      margin: 40px auto 0 auto;
      height: fit-content;
      width: fit-content;
   }
</style>
