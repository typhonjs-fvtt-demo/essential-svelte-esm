<script>
   import { getContext }         from 'svelte';

   import { TJSDialog }          from '#runtime/svelte/application';
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;
   export let message = void 0;

   const application = getContext('#external').application;

   // Provides one-way bindings to application options. If changed externally updates will not be received here.
   // Below in the `input element` for draggable you could also just set it to `{application.reactive.draggable}` and
   // omit the reactive statement below.
   let draggable = application.reactive.draggable;

   // This is a reactive statement. When `draggable` changes `application.reactive.draggable` is set.
   $: application.reactive.draggable = draggable;

   // Provides two-way bindings to application options. By using the stores external updates will be received here.
   const storeMinimizable = application.reactive.storeAppOptions.minimizable;
   const storeResizable = application.reactive.storeAppOptions.resizable;
   const storeTitle = application.reactive.storeAppOptions.title;

   async function onClick()
   {
      /**
       * TJSDialog.prompt returns true when the button is selected or null if the dialog is closed without user
       * selection.
       *
       * @type {boolean|null}
       */
      const result = await TJSDialog.prompt({
         title: 'A modal dialog!',
         draggable: false,
         minimizable: false,
         modal: true,
         content: 'A cool modal dialog!',  // You can set content with a Svelte component configuration object too!
         label: 'Ok'
      }, { classes: ['tjs-essential-svelte-esm'] });

      console.log(`Modal dialog result: `, result);
   }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <!-- You may use the core style `scrollable` to make the main content scrollable. Another option is
        `TJSScrollContainer`. -->
   <main class=scrollable>
      <h1>Hello {message}!</h1>
      <section>
         <label>
            <span>Message:</span>
            <input type=text bind:value={message}>
         </label>
         <label>
            <span>Change title:</span>
            <input type=text bind:value={$storeTitle}>
         </label>
      </section>
      <button on:click={onClick}>Launch a modal dialog</button>
      <div class=container>
         Make application:
         <label><input type=checkbox bind:checked={draggable}> Draggable</label>
         <label><input type=checkbox bind:checked={$storeMinimizable}> Minimizable</label>
         <label><input type=checkbox bind:checked={$storeResizable}> Resizable</label>
      </div>
      <div class=bottom>
         <a href="https://learn.svelte.dev/tutorial/welcome-to-svelte" target=_blank>Interactive Svelte tutorial (highly recommended)</a>
         <br>
         <a href="https://typhonjs.io/discord/" target=_blank>TyphonJS Discord (Support)</a>
      </div>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      div.bottom {
         margin-bottom: 3px; // For keyboard nav / link outline.
      }

      div.container {
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 10px;
         padding: 10px;
         margin-top: auto;

         /* You can use an existing core CSS variable that has dark / light theme changes. Try `--color-border` too. */
         border: 1px solid var(--content-link-border-color);

         /* For Sass you can alternatively use the `@at-root` directive to apply nested alternates */
         //@at-root body.theme-dark & {
         //   border: 2px solid red;
         //}
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 4em;
         font-weight: 100;
      }

      label {
         display: contents;

         span {
            text-align: right;
         }
      }

      section {
         display: grid;
         grid-template-columns: auto 1fr;
         align-items: center;
         gap: 0.5rem;
      }
   }
</style>
