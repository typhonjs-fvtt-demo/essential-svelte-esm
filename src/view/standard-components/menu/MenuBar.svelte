<script>
   import {
      ripple,
      rippleFocus }                 from '#standard/action/animate/composable';

   import { TJSToggleIconButton }   from '#standard/component/button';

   import {
      TJSInput,
      TJSInputRange }               from '#standard/component/form';

   import { TJSMenu }               from '#standard/component/menu';
</script>

<section class=top-bar>
   <span>Top Menu Bar</span>
</section>

<style lang=scss>
   // Defines the top fixed menu bar container.
   .top-bar {
      display: flex;
      padding: 4px;
      gap: 4px;
      justify-content: center;
      border-bottom: solid 1px #444;
      max-height: fit-content;
   }
</style>
