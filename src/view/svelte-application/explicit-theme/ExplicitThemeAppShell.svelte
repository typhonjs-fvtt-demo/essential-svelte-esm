<script>
   import { getContext }         from 'svelte';

   import { ApplicationShell }   from '#runtime/svelte/component/application';
   import { ThemeObserver }      from '#runtime/util/dom/theme';

   export let elementRoot = void 0;

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   // Readable store for global Foundry theme name.
   const globalThemeName = ThemeObserver.stores.themeName;

   // Writable store for explicit app theme override.
   const appThemeName = application.reactive.storeAppOptions.themeName;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <main>
      <section class=text>
         <p>
            SvelteApp allows easy reactive explicit theme overrides via the `application.reactive.themeName` accessor
            and a writable store via `application.reactive.storeAppOptions.themeName`. You may also set a default theme
            override in SvelteApp options via the `themeName` property. Presently `dark` / `light` are the two options
            available. To reset the explicit app theme just set `themeName` to `undefined`. All of the heavy lifting
            of managing Foundry core app classes required are handled automatically.
         </p>
         <p>
            ThemeObserver from `#runtime/util/dom/theme` also allows you to observe if desired the current global
            platform theme. It is used in this example to show the name of the platform theme in the select options
            below.
         </p>
      </section>

      <fieldset class=tjs-panel-content>
         <legend class=tjs-panel-legend>Explicit App Theme</legend>
         <div class=row>
            <label>
               <span>Choose theme:</span>
               <select bind:value={$appThemeName}>
                  <option value={void 0}>Global Theme ({$globalThemeName})</option>
                  <option value={'dark'}>Dark (app override)</option>
                  <option value={'light'}>Light (app override)</option>
               </select>
            </label>
         </div>
      </fieldset>
   </main>
</ApplicationShell>

<style lang=scss>
   div {
      &.row {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
   }

   label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
   }

   main {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      height: 100%;
   }

   section {
      display: flex;
      justify-content: center;

      &.text {
         flex-direction: column;
      }
   }

   fieldset {
      margin: auto auto 0 auto;
   }
</style>
