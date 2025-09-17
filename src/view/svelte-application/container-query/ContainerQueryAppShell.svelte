<script>
   /**
    * All app shells support container queries (CQ) out of the box with the following container names:
    * - `tjs-app-content` (For the app window content inline-size)
    *
    * This is a basic demo as CQ are a nuanced topic. They are like media queries, but allow
    * significantly more control over dynamic app window layout.
    *
    * Of note is that you can not have the app `width` as `auto` and also use CQ at the same time. TRL will disable
    * CQ when the app position width is 'auto'. You may however set `height` as `auto`.
    */
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   // ----------------------------------------------------------------------------------------------------------------

   // The following is to support this demo showcasing the dynamic application of CQ and protection the app shells
   // have to enable / disable CQ when width changes to `auto`.

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   // CQ works by the inner width of an element so that is the offset width of the element minus the left / right
   // border & padding constraints. Most Foundry apps have a window content padding of 16px on both left / right sides
   // in addition to 1px left / right app border. TRL can automatically monitor the width of the window content by
   // binding to `contentWidth` and setting an initial truthy value.

   let contentWidth = true;

   const { resizeObservable } = application.position.stores;

   let widthAuto = $resizeObservable;

   $: application.position.width = widthAuto ? 'auto' : elementRoot?.offsetWidth ?? void 0;

   $: if (!$resizeObservable) { widthAuto = false; }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot bind:contentWidth>
   <main>
      <section class=text>
         <p>
            All app shells provides support for container queries out of the box.
         </p>
      </section>

      <!-- Horizontal color bars that depending on app width column 2 & 3 will be set to `display: none` via CQ. -->
      <section class=colors>
         <div class=color-bar></div>
         <div class="color-bar column2"></div>
         <div class="color-bar column3"></div>
      </section>

      <!-- Use `standard-form` class from Foundry / core styles -->
      <section class=standard-form>
         <fieldset>
            <legend>App Window Content Constraints</legend>
            <div class=row>
               <label>
                  <span>Width:</span>
                  <input type=text value={`${Math.floor(contentWidth)}px`} readonly />
               </label>
            </div>
            <div class=row>
               <label>
                  <span>Width (auto):</span>
                  <input type=checkbox bind:checked={widthAuto} />
               </label>
            </div>
         </fieldset>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   // Adjusts font size based on min of 2em or 0.28em + 2 percent of app width (cqi).
   @container tjs-app-content (min-width: 0) {
      section.text {
         font-size: min(2em, 0.28em + 2cqi);
      }
   }

   // Below width of 450px the left color box is removed.
   @container tjs-app-content (width < 450px) {
      div.column2 {
         display: none;
      }
   }

   // Below width of 400px the left color box is removed.
   @container tjs-app-content (width < 600px) {
      div.column3 {
         display: none;
      }
   }

   // Width >= 300px set color to red.
   @container tjs-app-content (width >= 300px) {
      main {
         --color: red;
      }
   }

   // Width >= 400px set color to orange.
   @container tjs-app-content (width >= 400px) {
      main {
         --color: orange;
      }
   }

   // Width >= 500px set color to yellow.
   @container tjs-app-content (width >= 500px) {
      main {
         --color: yellow;
      }
   }

   // Width >= 600px set color to green.
   @container tjs-app-content (width >= 600px) {
      main {
         --color: green;
      }
   }

   div {
      &.color-bar{
         background: var(--color);
         width: 100%;
         height: 30px;
      }

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
   }

   main {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      height: 100%;
   }

   section {
      display: flex;
      justify-content: center;

      &.text {
         min-width: 300px;
      }

      &.colors {
         gap: 2rem;
         margin-top: 20px;
      }
   }

   .standard-form {
      margin: auto auto 0 auto;
      height: fit-content;
      width: fit-content;
   }
</style>
