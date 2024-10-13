<script>
   /**
    * This demo shows how the `useTinykeys` Svelte action works. `tinykeys` is a handy way to configure advanced key
    * bindings in components and available in TRL directly at `#runtime/util/dom/input/tinykeys`, but it is recommended
    * to use the pre-made Svelte action `useTinykeys` for simplicity.
    *
    * For more in-depth documentation on `tinykeys` please see:
    * @see https://www.npmjs.com/package/tinykeys
    *
    * @componentDescription
    */

   import { onMount }            from 'svelte';
   import { writable }           from 'svelte/store';

   import { useTinykeys }        from '#runtime/svelte/action/dom/input';
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   // ApplicationShell contract.
   export let elementRoot = void 0;

   // Stores a message from the key binding maps below.
   const message = writable('');

   /**
    * `KeyBindingMap` for when the app frame / `elementRoot` is focused.
    *
    * When the key sequence of "f" "o" "o" is pressed in order the `message` store is updated.
    */
   const keyBindingMapAppWindow = {
      'f o o': () => $message = 'App frame "FOO"'
   };

   /**
    * `KeyBindingMap` for when the `main` element is focused.
    *
    * When the key sequence of "b" "a" "r" is pressed in order the `message` store is updated.
    */
   const keyBindingMapMain = {
      'b a r': () => $message = 'Main element "BAR"'
   };

   // Stores the timeout ID to cancel any previous `setTimeout` invocation.
   let timeoutId;

   // A simple timeout to reset message after it changes.
   $: if ($message)
   {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => $message = '', 3000);
   }

   // Shows how to activate `useTinykeys` on the app frame.
   // You can apply actions directly to an HTML element.
   // Not saying you should ever do this, but this is how to do it.
   onMount(() =>
   {
      const actionReturn = useTinykeys(elementRoot, { keyBindingMap: keyBindingMapAppWindow });
      return () => actionReturn.destroy();
   });
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <!-- When clicked / focused by tab key `tinykeys` is active for `keyBindingMapMain`. -->

   <!-- Note: `on:keydown|stopPropagation={() => null}` stops key event propagation from `main`. -->

   <!-- THIS IS A DEMO / DESIGN BETTER A11Y SUPPORT IN YOUR COMPONENTS / NOT MOBILE FRIENDLY -->
   <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
   <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <main
      tabindex={0}
      on:keydown|stopPropagation={() => null}
      on:click={(event) => event.target.focus()}
      use:useTinykeys={{ keyBindingMap: keyBindingMapMain }}>

      <section>
         <p>
         This demo shows the `useTinykeys` action to provide complex key bindings on the `main` element
         (light red background) and the application frame.
         </p>
         <p>
            - Type "f" "o" "o" when app frame is dragged / focused.<br>
            - Type "b" "a" "r" when main element is focused.
         </p>
      </section>

      <section class=message>
         {$message}
      </section>
   </main>
</ApplicationShell>

<style>
   main {
      display: flex;
      flex-direction: column;

      background: rgba(255, 0, 0, 0.1);
      gap: 1rem;
      padding: 0 0.25rem;
   }

   main:focus {
      /* This variable is set in `./styles/init.scss` */
      outline: var(--tjs-default-outline-focus-visible, revert);
   }

   section.message {
      font-size: 1.5rem;
      color: blue;
   }
</style>
