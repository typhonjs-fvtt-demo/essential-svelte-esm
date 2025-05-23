<script>
   import { getContext }   from 'svelte';

   import { TJSSvgFolder } from '#standard/component/folder';

   export let section = void 0;

   const { application } = getContext('#external');

   /**
    * @type {import('#standard/component/folder').TJSFolderData}
    */
   const folder = {
      label: section.title,
      options: { focusChevron: true },
      store: application.reactive.sessionStorage.getStore(`trl-essential-esm-folder-${section.title}`)
   }

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

<section>
   <TJSSvgFolder {folder}>
      <div>
         {#each section.entries as entry}
            <button on:click={() => onClick(entry)}>{entry.title}</button>
         {/each}
      </div>
   </TJSSvgFolder>
</section>

<style lang=scss>
   // Due to how the theming system works one must explicitly provide a static theme for elements like `button` that
   // are affected by global theming changes. The styles below hard lock `button` to the default dark theme.
   button {
      background-color: var(--color-cool-5-50);
      border-color: var(--color-light-5);
      color: var(--color-light-3);
   }

   button:hover {
      background: var(--color-warm-2);
      color: var(--color-light-1);
      border-color: var(--color-light-3);
   }

   button:focus {
      outline: 1px solid var(--color-warm-2);
      box-shadow: 0 0 4px var(--color-warm-2);
   }

   div {
      display: flex;
      flex-direction: column;
      gap: 8px;

      padding-top: 0.5rem;
      margin-top: 0.1rem;
      border-top: 1px solid rgba(0, 0, 0, 0.75);
   }

   section {
      --tjs-folder-contents-margin: 0;
      --tjs-folder-contents-padding: 0;
      --tjs-folder-details-margin-left: 0;
      --tjs-folder-details-padding-left: 0;
      --tjs-folder-summary-margin: 0;
      --tjs-folder-summary-font-size: 1.05rem;
      --tjs-folder-summary-width: 100%;

      // See `./styles/init.scss` for `themed` alterations.
      // See `./src/view/MenuApplication.js` default options `classes`; uncomment / add `themed` to classes for the
      // dark & light themes to be applied to `TJSApplicationShell`.
      background: var(--menu-section-background, rgba(255, 255, 255, 0.15));

      border-radius: 0.25rem;
      padding: 0.25rem;

      button:focus-visible {
         outline: var(--tjs-default-outline-focus-visible);
      }
   }
</style>
