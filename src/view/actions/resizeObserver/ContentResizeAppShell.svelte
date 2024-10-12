<script>
   import { getContext}          from 'svelte';
   import { writable }           from 'svelte/store';

   import { resizeObserver }     from '#runtime/svelte/action/dom/observer';
   import { propertyStore }      from '#runtime/svelte/store/writable-derived';

   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;

   // Creates a store with object properties set by `resizeObserver` action.
   const storeResizeObserved = writable({ offsetWidth: 0 });

   // A property store which only updates with `offsetWidth` of `storeResizeObserved` changes.
   const storeMainWidth = propertyStore(storeResizeObserved, 'offsetWidth');

   // A custom store with `add`, `remove`, `removeAll` update functions.
   // You can create custom stores with additional functions!
   const items = {
      ...writable([]),
      add: () => items.update((array) => { array.push($items.length + 1); return array; }),
      remove: () => items.update((array) => { array.pop(); return array; }),
      removeAll: () => items.update((array) => { array.length = 0; return array; })
   };

   // Retrieves the external `SvelteApplication` reference.
   const { application } = getContext('#external');

   // Reactively updates the `SvelteApplication` `position` minimum width with the `main` element offset width.
   // An additional `16` pixels is added for the default Foundry left / right padding of `.window-content`.
   $: application.position.set({ minWidth: $storeMainWidth + 16 });
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <!-- Apply `resizeObserver` action updating `storeResizeObserved`. -->
   <main use:resizeObserver={{ resizeObserved: storeResizeObserved }}>
      <!-- Buttons to invoke `items` array manipulation. -->
      <section>
         <button on:click={items.add}>Add</button>
         <button on:click={items.remove}>Remove</button>
         <button on:click={items.removeAll}>Remove All</button>
      </section>

      <!-- Show items when available extending `main` element width. -->
      {#if $items.length}
         <section>
            {#each $items as item (item)}
               <div>{item}</div>
            {/each}
         </section>
      {/if}
   </main>
</ApplicationShell>

<style>
   button {
      white-space: nowrap;
   }

   div {
      width: 50px;
      height: 25px;

      background: rgba(0, 0, 255, 0.1);
   }

   main {
      display: flex;
      flex-direction: column;

      background: rgba(255, 0, 0, 0.1);
      gap: 1rem;
      width: fit-content;
   }

   section {
      display: flex;
      gap: 0.25rem;
      flex-wrap: nowrap;
      width: fit-content;
   }
</style>
