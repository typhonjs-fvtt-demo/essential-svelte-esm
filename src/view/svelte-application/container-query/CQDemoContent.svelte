<script>
   import { getContext }   from 'svelte';

   /** @type {import('#runtime/svelte/component/application').AppShell.Context.InternalAppStores} */
   const { cqEnabled } = getContext('#internal').stores;
</script>

<section class=text>
   <p>
      All app shells provides support for container queries out of the box.
   </p>
</section>

{#if $cqEnabled}
   <!-- Horizontal color bars that depending on app width column 2 & 3 will be set to `display: none` via CQ. -->
   <section class=colors>
      <div class=color-bar></div>
      <div class="color-bar column2"></div>
      <div class="color-bar column3"></div>
   </section>
{:else}
   <p>
      Container queries are disabled due to indeterminate state as `width` and / or `height` is `auto`.
   </p>
{/if}

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
      section.colors {
         --color: red;
      }
   }

   // Width >= 400px set color to orange.
   @container tjs-app-content (width >= 400px) {
      section.colors {
         --color: orange;
      }
   }

   // Width >= 500px set color to yellow.
   @container tjs-app-content (width >= 500px) {
      section.colors {
         --color: yellow;
      }
   }

   // Width >= 600px set color to green.
   @container tjs-app-content (width >= 600px) {
      section.colors {
         --color: green;
      }
   }

   div {
      &.color-bar{
         background: var(--color);
         width: 100%;
         height: 30px;
      }
   }

   section {
      display: flex;
      justify-content: center;

      &.colors {
         gap: 2rem;
         margin-top: 20px;
      }
   }
</style>
