<script>
   import { getContext }            from 'svelte';

   import { ApplicationShell }      from '#runtime/svelte/component/application';

   import { TJSScrollContainer }    from '#standard/component/container';

   import MenuBar                   from './MenuBar.svelte';

   import { sessionConstants }      from '#constants';

   export let elementRoot = void 0;

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   // ----------------------------------------------------------------------------------------------------------------

   const storeScroll = application.reactive.sessionStorage.getStore(sessionConstants.scrollbarState, 0);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot stylesContent={{ padding: 0 }}>
   <MenuBar />

   <TJSScrollContainer scrollTop={storeScroll}>
      <section class=text>
         <p>
            This demo shows off `TJSMenu` and `TJSContextMenu` providing two separate menu options. Additionally,
            several other supporting components are also included such as a toggle button and an example of how to
            configure a fixed top menu bar and a scrolling container content area.
         </p>
         <p>
            Context / right click the main scrolling area to display `TJSContextMenu`.
         </p>
      </section>
   </TJSScrollContainer>
</ApplicationShell>

<style lang=scss>
   section {
      display: flex;
      justify-content: center;

      &.text {
         flex-direction: column;
         padding: 0 1rem;
      }
   }
</style>
