<script>
   import { ripple }                from '#standard/action/animate/composable';
   import { TJSToggleIconButton }   from '#standard/component/button';
   import { TJSMenu }               from '#standard/component/menu';

   import { createMenuItems }   from './createMenuItems.js';

   const overflowMenuButton = {
      icon: 'fas fa-ellipsis-v',
      efx: ripple()
   };

   const menu = {
      // Offset menu down 4px.
      offset: { y: 4 },

      // Element that receives focus automatically on menu item press.
      focusEl: '#tjs-menu-esm',

      // The menu item `onPress` handlers from `createMenuItems` are simple, so auto apply focus source.
      onPressApplyFocus: true
   }
</script>

<section class=top-bar>
   <span>Example Secondary Fixed Menu Bar</span>

   <TJSToggleIconButton button={overflowMenuButton}>
      <TJSMenu menu={{ ...menu, items: createMenuItems() }} />
   </TJSToggleIconButton>
</section>

<style lang=scss>
   // Defines the top fixed menu bar container.
   .top-bar {
      display: flex;
      padding: 0.5rem;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
      border-bottom: solid 1px #444;
      max-height: fit-content;
   }

   span {
      margin-right: auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
</style>
