<script>
   import { onMount }            from 'svelte';

   import { useTinykeys }        from '#runtime/svelte/action/dom/input';
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   const keyBindingMapAppWindow = {
      'y e e t': () => console.log('YEET!')
   };

   const keyBindingMapMain = {
      'b o o': () => console.log('Boo!')
   };

   onMount(() =>
   {
      const actionReturn = useTinykeys(elementRoot, { keyBindingMap: keyBindingMapAppWindow });
      return () => actionReturn.destroy();
   });
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <!-- When clicked / focused by tab key `tinykeys` is active for `keyBindingMapMain` -->
   <!-- THIS IS A DEMO / DESIGN BETTER A11Y SUPPORT IN YOUR COMPONENTS -->
   <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
   <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <main
      tabindex={0}
      on:keydown|stopPropagation={() => null}
      on:click={(event) => event.target.focus()}
      use:useTinykeys={{ keyBindingMap: keyBindingMapMain }}>
   </main>
</ApplicationShell>

<style>
   main {
      display: flex;
      flex-direction: column;

      background: rgba(255, 0, 0, 0.1);
      gap: 1rem;
   }

   main:focus {
      outline: var(--tjs-default-outline-focus-visible, revert);
   }
</style>
