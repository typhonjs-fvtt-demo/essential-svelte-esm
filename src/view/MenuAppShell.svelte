<script>
   import { scale }                 from 'svelte/transition';

   import { TJSApplicationShell }   from '#runtime/svelte/component/application';

   import MenuAppSection            from './MenuAppSection.svelte';

   // ApplicationShell Contract
   export let elementRoot = void 0;

   // Menu section demo data.
   export let sections = void 0;
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
         <a href="https://learn.svelte.dev/tutorial/welcome-to-svelte" target=_blank>Interactive Svelte tutorial</a>
         <br>
         <a href="https://typhonjs.io/discord/" target=_blank>TyphonJS Discord (Support)</a>
      </div>
   </main>
</TJSApplicationShell>

<style lang="scss">
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
