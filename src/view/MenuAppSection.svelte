<script>
   import { getContext }      from 'svelte';

   import { SvelteApp }       from '#runtime/svelte/application';
   import { isObject }        from '#runtime/util/object';

   import { TJSSvgFolder }    from '#standard/component/folder';

   /** 
    * @import { TJSFolder }   from '#standard/component/folder';
    * 
    * @import { External }    from './types';
    */

   /** @type {Record<string, any>} */
   export let section;

   /** @type {External} */
   const { application, demoApps } = getContext('#external');

   /**
    * @type {TJSFolder.Data}
    */
   const folder = {
      label: section.title,
      options: { focusChevron: true },
      store: application.reactive.sessionStorage.getStore(`trl-essential-esm-folder-${section.title}`, false)
   }

   /**
    * @param {Record<string, any>}  button -
    */
   function onClick(button)
   {
      let app;

      // If `onPress` defined execute the function.
      if (typeof button.onPress === 'function')
      {
         app = button.onPress();

         // If an Application is returned then attempt to select an existing app by ID / render it.
         if (app instanceof SvelteApp)
         {
            const existingApp = demoApps.get(app.id);

            if (existingApp)
            {
               existingApp.render(true, { focus: true });
            }
            else
            {
               demoApps.set(app.id, app.render(true, { focus: true }));
            }
         }
      }

      // If `class` is defined then instantiate a new one or render an existing Application.
      else if (button.class)
      {
         const NewApplication = button.class;

         const options = isObject(button.options) ? button.options : {};
         const id = options.id ?? NewApplication.defaultOptions.id;

         const existingApp = demoApps.get(id);

         if (existingApp)
         {
            existingApp.render(true, { focus: true });
         }
         else
         {
            const app = new NewApplication(options).render(true, { focus: true });
            demoApps.set(id, app);
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

      background: rgba(255, 255, 255, 0.15);

      border-radius: 0.25rem;
      padding: 0.25rem;

      button:focus-visible {
         outline: var(--tjs-default-outline-focus-visible);
      }
   }
</style>
