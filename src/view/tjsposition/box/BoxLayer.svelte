<script>
   import { getContext }               from 'svelte';

   import { resizeObserver }           from '#runtime/svelte/action/dom/observer';
   import { TJSApplicationShell }      from '#runtime/svelte/component/application';

   import { boxStore }                 from './store/boxStore.js';

   import AutoBox                      from './boxes/AutoBox.svelte';
   import AutoBoxDebug                 from './boxes/AutoBoxDebug.svelte';
   import Box                          from './boxes/Box.svelte';
   import BoxDebug                     from './boxes/BoxDebug.svelte';
   import BoxHeader                    from './BoxHeader.svelte';

   /**
    * @import { SvelteComponent }      from 'svelte';
    *
    * @import { SvelteApp }            from '#runtime/svelte/application';
    */

   /** @type {HTMLElement} */
   export let elementRoot;

   /** @type {SvelteApp.Context.External} */
   const { application } = getContext('#external');

   const storeMinimized = application.reactive.storeUIState.minimized;

   const storeAuto = boxStore.stores.auto;
   const storeDebug = boxStore.stores.debug;
   const storeValidator = boxStore.stores.validatorEnabled;

   /**
    * The component instance currently representing the boxes.
    *
    * @type {typeof SvelteComponent<any>}
    */
   let component;

   const boundingRect = new DOMRect(0, 0, 0, 0);

   // Reactive statement to switch the box component between four variations depending on the auto & debug options.
   $: {
      component = $storeAuto ?
       $storeDebug ? AutoBoxDebug : AutoBox :
        $storeDebug ? BoxDebug : Box;
   }

   $: boxStore.validator.enabled = $storeValidator;

   /**
    * Receives resize observer updates for when the `main` / box surface dimensions change.
    *
    * @param {number} offsetWidth -
    *
    * @param {number} offsetHeight -
    */
   function setDimension(offsetWidth, offsetHeight)
   {
      // When the application is minimized do not update the validator / app constraints.
      if ($storeMinimized) { return; }

      // When the PopOut module is enabled and this app is popped out 0 / 0 is received; ignore this.
      if (offsetWidth === 0 && offsetHeight === 0) { return; }

      // Avoid any changes when the application state is not rendered as setting `boundingRect` while the application is
      // closing can cause a loop in the Svelte runtime. This can happen occasionally, so just avoid it entirely.
      if (!application.rendered) { return; }

      // Set the dimensions for the box validator.
      boxStore.validator.setDimension(offsetWidth, offsetHeight);

      boundingRect.width = offsetWidth;
      boundingRect.height = offsetHeight;
   }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <BoxHeader />
   <main use:resizeObserver={setDimension}>
      {#each $boxStore as box (box.id)}
         <svelte:component this={component} {box} />
      {/each}
   </main>
</TJSApplicationShell>

<style lang=scss>
   main {
      position: relative;
      height: 100%;
      overflow: hidden;
   }
</style>
