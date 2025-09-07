<script>
   import { popoverTooltip }  from '#runtime/svelte/action/dom/tooltip';

   import { getContext }      from 'svelte';

   // Manual tracking of `headerButtonNoLabel` option to apply to custom component.
   const { application } = getContext('#external');
   const headerButtonNoLabel = application.reactive.storeAppOptions.headerButtonNoLabel;
</script>

<!-- Add 'keep-minimized' to maintain the component when app is minimized -->
<!-- This also allows this element to be double clicked to minimize / maximize the app -->
<progress class=keep-minimized max=100
   use:popoverTooltip={$headerButtonNoLabel ? null : 'Kept when minimized'}></progress>

<style>
   progress {
      height: 30px;
      max-width: 150px;
      padding: 0 3px;
      cursor: default;
   }
</style>
