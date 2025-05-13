<script>
   /**
    * This is a demo of an interactive sidebar tab button. It essentially shows that you can create an interactive
    * content as the button content. This is useful for drawing attention to the sidebar. As things go browsers only
    * give the parent button element the `hover` state, so for this demo, an interval timer is used to add / remove a
    * CSS class every second.
    */

   import { onDestroy } from 'svelte';

   import {
      get,
      writable }        from 'svelte/store';

   const storeEnabled = writable(false);

   const unsub = setInterval(() => $storeEnabled = !get(storeEnabled), 1000);

   onDestroy(() => clearInterval(unsub));
</script>

<main class:highlight={$storeEnabled}>
   <i class="fas fa-swords"></i>
</main>

<style>
   main {
      width: 100%;
      height: 100%;
      padding-top: 7px;
   }

   main.highlight {
      color: red;
   }
</style>
