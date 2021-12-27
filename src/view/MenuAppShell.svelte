<script>
   import { scale }                 from 'svelte/transition';
   import { TJSApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
   export let buttons;

   const apps = new Map();

   function onClick(button)
   {
      const NewApplication = button.class;
      const existingApp = apps.get(NewApplication.defaultOptions.id);

      if (existingApp)
      {
         existingApp.render(true, { focus: true });
      }
      else
      {
         const app = new NewApplication().render(true, { focus: true });
         apps.set(NewApplication.defaultOptions.id, app);
      }
   }
</script>

<svelte:options accessors={true}/>

<TJSApplicationShell bind:elementRoot transition={scale} transitionOptions={{duration: 1000}}>
   <main>
      <h1>Launch demo apps below:</h1>
      <section>
      {#each buttons as button}
         <button on:click={() => onClick(button)}>{button.title}</button>
      {/each}
      </section>
      <div class=bottom>
         <hr>
         <a href="https://svelte.dev/tutorial">Interactive Svelte tutorial</a>
         <br>
         <a href="https://www.youtube.com/playlist?list=PLoKaNN3BjQX3mxDEVG3oGJx2ByXnue_gR">Svelte tutorial videos</a>
      </div>
   </main>
</TJSApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      button, div.bottom {
         margin-top: auto;
      }

      button:not(:last-child) {
         margin-bottom: 8px;
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