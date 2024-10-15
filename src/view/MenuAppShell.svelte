<script>
   import { scale }                 from 'svelte/transition';

   import { TJSApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;
   export let buttons = void 0;

   const apps = new Map();

   function onClick(button)
   {
      let app;

      // If `onPress` defined execute the function.
      if (typeof button.onPress === 'function')
      {
         app = button.onPress();

         // If an Application is returned then attempt to select an existing app by ID / render it.
         if (app instanceof Application)
         {
            const existingApp = apps.get(app.id);

            if (existingApp)
            {
               existingApp.render(true, { focus: true });
            }
            else
            {
               apps.set(app.id, app.render(true, { focus: true }));
            }
         }
      }

      // If `class` is defined then instantiate a new one or render an existing Application.
      else if (button.class)
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
         <a href="https://learn.svelte.dev/tutorial/welcome-to-svelte">Interactive Svelte tutorial</a>
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

      a:focus-visible, button:focus-visible {
         outline: 4px dotted orange;
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
