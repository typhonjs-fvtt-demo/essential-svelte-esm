<!-- Horizontal color bars that depending on app width column 2 & 3 will be set to `display: none` via CQ. -->
<section class=color-bars>
   <div class=color-bar></div>
   <div class="color-bar column-2"></div>
   <div class="color-bar column-3"></div>
</section>

<style lang=scss>
   // Below width of 600px the `column-2` div is is hidden.
   @container tjs-app-content (width < 400px) {
      div.column-2 {
         display: none;
      }
   }

   // Below width of 600px the `column-3` div is is hidden.
   @container tjs-app-content (width < 600px) {
      div.column-3 {
         display: none;
      }
   }

   div.color-bar {
      // The `color` CSS variable is set by CQ in the `CQDemoContent` component.
      background: var(--color);
      width: 100%;
      height: 20px;
   }

   section.color-bars {
      display: flex;
      justify-content: center;
      gap: 2rem;
   }
</style>
