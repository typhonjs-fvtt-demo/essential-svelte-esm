<script>
   /**
    * This demo shows off the `popoverTooltip` action that allows reactive control of the Foundry popover tooltip.
    *
    * You can use the keyboard to navigate to options and change them while hovering the tooltip!
    */
   import { popoverTooltip }     from '#runtime/svelte/action/dom/tooltip';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   /**
    * `TooltipOptions` associated with `popoverTooltip`.
    *
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/types/_runtime_svelte_action_dom_tooltip.TooltipOptions.html
    */
   let cssClass, direction, isHTML, locked, tooltip;

   // Click count used in button `on:click` callback.
   let clickCount = 0;

   // Tooltip message.
   let message = 'Hello!';

   // Reactive statement that triggers whenever `message` or `isHTML` changes updating the `tooltip`
   // which reactively updates the `popoverTooltip` action attached to the button element.
   $: tooltip = !isHTML ? message :
    `<i class="fas fa-champagne-glasses"></i>&nbsp;<span style="color: green;">${message}</span>`;
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
      <button use:popoverTooltip={{ cssClass, direction, isHTML, locked, tooltip }}
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
                  <select bind:value={direction}>
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
                  <select bind:value={cssClass}>
                     <option value={void 0}>Default (none)</option>
                     <option value={'tjs-tooltip-blue-background'}>Blue Background</option>
                     <option value={'tjs-tooltip-red-background'}>Red Background</option>
                  </select>
               </label>
            </div>
            <div class=row>
               <label>
                  <span>Locked:</span>
                  <input type=checkbox bind:checked={locked} />
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
