<script>
   /**
    * Example fixed secondary menubar with an overflow menu. Most menu items are configured by `createMenuItems`. This
    * demo also shows how to use slots to embed custom menu items and prevent the click propagation. The last menu item
    * is a slot locally defined in the template below.
    */

   import { getContext }            from 'svelte';

   import { ripple }                from '#standard/action/animate/composable';
   import { TJSToggleIconButton }   from '#standard/component/button';
   import { TJSInputRange }         from '#standard/component/form';
   import { TJSMenu }               from '#standard/component/menu';

   import { createMenuItems }       from './createMenuItems.js';

   import { sessionConstants }      from "#constants";

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   /**
    * Defines the configuration object for `TJSToggleButton` to show / hide a slotted `TJSMenu`.
    */
   const overflowMenuButton = {
      icon: 'fas fa-ellipsis-v',
      tooltip: 'TJSMenu',
      tooltipDirection: 'RIGHT',
      efx: ripple()
   };

   /**
    * Defines the configuration object for `TJSMenu`.
    */
   const menu = {
      // Offset menu down 4px.
      offset: { y: 4 }
   }

   /**
    * Defines the configuration object for `TJSInputRange` which is in the `after` slot of `TJSMenu`.
    */
   const scaleMenuItem = {
      label: 'Scale:',
      min: 200,
      max: 500,
      store: application.reactive.sessionStorage.getStore(sessionConstants.menuScale, 200)
   }

   /**
    * Defines the configuration object for `TJSToggleButton` enabling keyboard navigation of `TJSScrollContainer`.
    */
   const scrollKeyFocusButton = {
      icon: 'fas fa-keyboard',
      efx: ripple(),
      store: application.reactive.sessionStorage.getStore(sessionConstants.menuContainerFocus, false),
      tooltip: 'Enable Container Key Focus',
      tooltipSelected: 'Disable Container Key Focus'
   };

   /**
    * Defines the configuration object for `TJSToggleButton` enabling scroll key propagation of `TJSScrollContainer`.
    * Foundry does not respect keyboard accessibility for scrolling containers.
    */
   const scrollKeyPropagateButton = {
      icon: 'fas fa-circle-play',
      efx: ripple(),
      store: application.reactive.sessionStorage.getStore(sessionConstants.menuKeyPropagate, false),
      tooltip: 'Allow Container Key Propagation',
      tooltipSelected: 'Stop Container Key Propagation'
   };
</script>

<section class=top-bar>
   <span>Example Secondary Fixed Menu Bar</span>

   <TJSToggleIconButton button={scrollKeyFocusButton} />

   <TJSToggleIconButton button={scrollKeyPropagateButton} />

   <TJSToggleIconButton button={overflowMenuButton}>
      <TJSMenu menu={{ ...menu, items: createMenuItems({ application, trailingHR: true }) }}>
         <!-- Example of adding adhoc menu item in `after` slot.  -->
         <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
         <div class=range
              on:click|stopPropagation
              slot=after>
            <TJSInputRange input={scaleMenuItem} />
            (Slot)
         </div>
      </TJSMenu>
   </TJSToggleIconButton>
</section>

<style lang=scss>
   // Defines the top fixed menu bar container.
   .top-bar {
      display: flex;
      padding: 0.25rem 0.5rem;
      gap: 0.5rem;

      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, rgba(48, 48, 48, 0.25) 0%, rgba(9, 9, 121, 0.25) 35%, rgba(0, 212, 255, 0.25) 100%);
      border-bottom: solid 1px #444;
      max-height: fit-content;
   }

   // Menubar title.
   span {
      margin-right: auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   // For slotted `after` menu item implemented inline above in the template.
   .range {
      // Set the `TJSInputRange` height to the menu item line height.
      --tjs-input-height: var(--tjs-menu-item-line-height);

      cursor: var(--tjs-cursor-default, default);
      display: flex;
      width: 115px;
      font-size: 0.8em;
      justify-content: center;
      align-items: center;
   }
</style>
