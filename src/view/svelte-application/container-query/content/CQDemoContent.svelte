<script>
   import { getContext }      from 'svelte';

   import CQDemoColorBars     from './CQDemoColorBars.svelte';

   /** 
    * @import { SvelteApp }   from '#runtime/svelte/application';
    * @import { AppShell }    from '#runtime/svelte/component/application';
    */

   /**
    * When a component is embedded in an app shell there is an `#internal` context w/ additional stores. `cqEnabled`
    * has the enabled state for container queries.
    *
    * @type {AppShell.Context.InternalAppStores}
    */
   const { cqEnabled } = getContext('#internal').stores;

   // Create a dynamic CQ disabled message based on CQ state ---------------------------------------------------------

   /** @type {SvelteApp.Context.External} */
   const { application } = getContext('#external');

   const { containerQueryType } = application.reactive.storeAppOptions;

   let cqDisabledMsg = '';

   $: {
      switch ($containerQueryType) {
         case 'inline-size':
            cqDisabledMsg = 'Container queries are disabled due to indeterminate state as `width` is `auto`.';
            break;

         case 'size':
            cqDisabledMsg =
              'Container queries are disabled due to indeterminate state as `width` and / or `height` is `auto`.';
            break;

         default:
            cqDisabledMsg = 'Container queries are disabled.';
            break;
      }
   }
</script>

<!-- When CQ is enabled `font-size` is modified based on app width. -->
<p class=header>All app shells provides support for container queries out of the box.</p>

<!-- When CQ is enabled display color bar components otherwise a disabled message. -->
{#if $cqEnabled}
   <!-- Horizontal color bars that depending on app width column 2 & 3 will be set to `display: none` via CQ. -->
   <section class=colors>
      <CQDemoColorBars />

      <!-- When CQ type `size` is set the `height` queries will progressively set the `display` of these `divs`. -->
      <div class="tjs-hidden row-2"><CQDemoColorBars /></div>
      <div class="tjs-hidden row-3"><CQDemoColorBars /></div>
      <div class="tjs-hidden row-4"><CQDemoColorBars /></div>
      <div class="tjs-hidden row-5"><CQDemoColorBars /></div>
      <div class="tjs-hidden row-6"><CQDemoColorBars /></div>
   </section>
{:else}
   <p>{cqDisabledMsg}</p>
{/if}

<style lang=scss>
   // CQ `inline-size` queries including `width`; these are also enabled when CQ is `size` ---------------------------

   // Adjusts font size based on min of 2em or 0.28em + 2 percent of app width (cqi).
   @container tjs-app-content (min-width: 0) {
      p.header {
         font-size: min(2em, 0.28em + 2cqi);
      }
   }

   // Width < 400px set `color` CSS variable to red. Used in `CQDemoColorBars` component.
   @container tjs-app-content (width < 400px) {
      section.colors {
         --color: red;
      }
   }

   // Width >= 400px set `color` CSS variable to orange. Used in `CQDemoColorBars` component.
   @container tjs-app-content (width >= 400px) {
      section.colors {
         --color: orange;
      }
   }

   // Width >= 500px set `color` CSS variable to yellow. Used in `CQDemoColorBars` component.
   @container tjs-app-content (width >= 500px) {
      section.colors {
         --color: yellow;
      }
   }

   // Width >= 600px set `color` CSS variable to green. Used in `CQDemoColorBars` component.
   @container tjs-app-content (width >= 600px) {
      section.colors {
         --color: green;
      }
   }

   // CQ `size` queries including `height`; these are not enabled when CQ is `inline-size` ---------------------------

   // Hides the additional component color rows until revealed with `size` queries.
   // Note: when overriding styles w/ CQ order matters and this rule needs to be before the CQ statements.
   div.tjs-hidden {
      display: none;
   }

   // Reveal `row-2` when `height` is greater than 265px.
   @container tjs-app-content (height >= 265px) {
      div.row-2 {
         display: block;
      }
   }

   // Reveal `row-3` when `height` is greater than 265px.
   @container tjs-app-content (height >= 300px) {
      div.row-3 {
         display: block;
      }
   }

   // Reveal `row-4` when `height` is greater than 265px.
   @container tjs-app-content (height >= 350px) {
      div.row-4 {
         display: block;
      }
   }

   // Reveal `row-5` when `height` is greater than 265px.
   @container tjs-app-content (height >= 400px) {
      div.row-5 {
         display: block;
      }
   }

   // Reveal `row-6` when `height` is greater than 265px.
   @container tjs-app-content (height >= 450px) {
      div.row-6 {
         display: block;
      }
   }

   // General styles -------------------------------------------------------------------------------------------------

   section.colors {
      display: flex;
      flex-direction: column;

      gap: 1rem;
      margin: 20px 0 20px 0
   }

   p {
      text-align: center;
   }
</style>
