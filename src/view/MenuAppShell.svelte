<script>
   /**
    * Provides the statically themed main menu to launch demo apps.
    *
    * Note the use of `TJSApplicationShell` which allows static customized theming through CSS variables defined in the
    * component. See `./styles/init.scss` for static and themed app background styling defined.
    */
   import { getContext }            from 'svelte';

   import { scale }                 from 'svelte/transition';

   import { TJSApplicationShell }   from '#runtime/svelte/component/application';
   import { Timing }                from '#runtime/util';

   import MenuAppSection            from './MenuAppSection.svelte';

   // ApplicationShell Contract
   export let elementRoot = void 0;

   // Menu section demo data.
   export let sections = void 0;

   // Game setting store.
   export let settingStore = void 0;

   const { application } = getContext('#external');

   // Application position store reference. Stores need to be a top level variable to be accessible for reactivity.
   const position = application.position;

   // A debounced callback that serializes application state after 500-millisecond delay.
   const storePosition = Timing.debounce(() => $settingStore = application.state.current(), 500);

   // Reactive statement to invoke debounce callback on TJSPosition changes.
   $: storePosition($position);
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot transition={scale} transitionOptions={{duration: 1000}}>
   <main>
      <h1>Launch demo apps below:</h1>
      {#each sections as section}
         <MenuAppSection {section} />
      {/each}
      <div class=bottom>
         <hr>
         <a href="https://v4.svelte.dev/tutorial/basics" target=_blank>Interactive Svelte tutorial</a>
         <br>
         <a href="https://typhonjs.io/discord/" target=_blank>TyphonJS Discord (Support)</a>
      </div>
   </main>
</TJSApplicationShell>

<style lang=scss>
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;

      a:focus-visible {
         outline: var(--tjs-default-outline-focus-visible);
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 1.0em;
         font-weight: 80;
      }

      hr {
         border: 1px solid #ff3e00;
         height: 1px;
      }
   }
</style>
