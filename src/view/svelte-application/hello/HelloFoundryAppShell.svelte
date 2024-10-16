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
   <main>
      <h1>Hello {message}!</h1>
      <label>
         Message:&nbsp;<input bind:value={message}>
      </label>
      <label>
         Change title:&nbsp;<input bind:value={$storeTitle}>
      </label>
      <button on:click={onClick}>Launch a modal dialog</button>
      <div class=container>
         Make application:
         <label><input type=checkbox bind:checked={draggable}> Draggable</label>
         <label><input type=checkbox bind:checked={$storeMinimizable}> Minimizable</label>
         <label><input type=checkbox bind:checked={$storeResizable}> Resizable</label>
      </div>
      <div class=bottom>
         <a href="https://learn.svelte.dev/tutorial/welcome-to-svelte">Interactive Svelte tutorial (highly recommended)</a>
         <br>
         <a href="https://www.youtube.com/playlist?list=PLoKaNN3BjQX3mxDEVG3oGJx2ByXnue_gR">Svelte tutorial videos</a>
      </div>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      button, div.bottom {
         margin-top: auto;
      }

      div.container {
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 10px;
         border: 2px solid rgba(0, 0, 0, 0.2);
         padding: 10px;
         margin-top: auto;
      }

      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 4em;
         font-weight: 100;
      }

      label {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
</style>
