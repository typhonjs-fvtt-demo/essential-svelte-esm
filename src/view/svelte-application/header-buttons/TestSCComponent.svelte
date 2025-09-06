<script>
   import { popoverTooltip } from '#runtime/svelte/action/dom/tooltip';

   export let label = 'Demo'; // This prop is set in `HeaderButtonApplication` to 'SC'.
</script>

<!-- A simple text element / demo -->
<span use:popoverTooltip={'Svelte Component'}>{label}</span>

<style>
   span {
      flex: none;
      padding: 0 3px;
      cursor: crosshair;
   }
</style>
