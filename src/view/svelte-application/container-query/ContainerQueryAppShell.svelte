<script>
   /**
    * All app shells support container queries (CQ) out of the box with the following container names:
    * - `tjs-app-window` (For the entire app window size including header bar)
    * - `tjs-app-window-content` (For the app window content size)
    *
    * This is a basic demo as CQ are a nuanced topic. They are like media queries, but allow
    * significantly more control over dynamic app window layout.
    *
    * Of note is that you can not have the app `width` as `auto` and also use CQ at the same time. TRL will disable
    * CQ when the app position width is 'auto'. You may however set `height` as `auto`.
    */

   import {
      getContext,
      onMount }                  from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   const { width, height } = application.position.stores;

   // What is all this below? Well CQ works by the inner width of an element so that is the width of the element minus
   // the left / right border width. Most Foundry apps have a total border width constraint of 2px. The width / height
   // display shows the app inner constraints and that makes it easier to reason about what the container queries are
   // doing with whole numbers.

   let innerWidth = 0;
   let innerHeight = 0;
   let borderConstraintW = 0;
   let borderConstraintH = 0;

   onMount(() =>
   {
      const styles = getComputedStyle(elementRoot);
      borderConstraintW = Math.ceil(parseFloat(styles.borderLeftWidth) + parseFloat(styles.borderRightWidth));
      borderConstraintH = Math.ceil(parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth));

      application.position.minWidth = 300 + borderConstraintH;
      application.position.minHeight = 300 + borderConstraintH;
      application.position.maxHeight = 300 + borderConstraintH;
   });

   $: innerWidth = $width - borderConstraintW;
   $: innerHeight = $height - borderConstraintH;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=text>
         <p>
            All app shells provides support for container queries out of the box.
         </p>
      </section>

      <!-- Horizontal color bars that depending on app width column 2 & 3 will be set to `display: none` -->
      <section class=colors>
         <div class=color-bar></div>
         <div class="color-bar column2"></div>
         <div class="color-bar column3"></div>
      </section>

      <!-- Use `standard-form` class from Foundry / core styles -->
      <section class=standard-form>
         <fieldset>
            <legend>App Inner Constraints</legend>
            <div class=row>
               <label>
                  <span>Width:</span>
                  <input type=text bind:value={innerWidth} readonly />
               </label>
               <label>
                  <span>Height:</span>
                  <input type=text bind:value={innerHeight} readonly />
               </label>
            </div>
         </fieldset>
      </section>
   </main>
</ApplicationShell>

<style lang=scss>
   // Adjusts font size based on min of 2em or 0.28em + 2 percent of app width (cqi).
   @container tjs-app-window (min-width: 0) {
      section.text {
         font-size: min(2em, 0.28em + 2cqi);
      }
   }

   // Below width of 450px the left color box is removed.
   @container tjs-app-window (width < 450px) {
      div.column2 {
         display: none;
      }
   }

   // Below width of 400px the left color box is removed.
   @container tjs-app-window (width < 600px) {
      div.column3 {
         display: none;
      }
   }

   // Width >= 300px set color to red.
   @container tjs-app-window (width >= 300px) {
      main {
         --color: red;
      }
   }

   // Width >= 400px set color to orange.
   @container tjs-app-window (width >= 400px) {
      main {
         --color: orange;
      }
   }

   // Width >= 500px set color to yellow.
   @container tjs-app-window (width >= 500px) {
      main {
         --color: yellow;
      }
   }

   // Width >= 500px set color to green.
   @container tjs-app-window (width >= 500px) {
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

      input {
         width: 4em;
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
