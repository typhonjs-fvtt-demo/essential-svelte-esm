<script>
   import { popoverTooltip }  from '#runtime/svelte/action/dom/tooltip';

   import { getContext }      from 'svelte';

   export let label = 'Demo'; // This prop is set in `HeaderButtonApplication` to 'SC'.

   // Manual tracking of `headerButtonNoLabel` option to apply to custom component.
   const { application } = getContext('#external');
   const { headerButtonNoLabel } = application.reactive.storeAppOptions;
</script>

<!-- A simple text element / demo -->
<span use:popoverTooltip={{ tooltip: $headerButtonNoLabel ? void 0 : 'Svelte Component' }}>{label}</span>

<style>
   span {
      flex: none;
      padding: 0 3px;
      cursor: crosshair;
   }
</style>
