<script>
   import { slideFade } from '#runtime/svelte/transition';


   export let filepath = void 0;

   /**
    * Bound to TJSMediaContent
    *
    * @type {number}
    */
   export let videoPlaybackRate = void 0;

   /**
    * Bound to TJSMediaContent
    *
    * @type {boolean}
    */
   export let videoPlayOnHover = void 0;

   // Only show media controls with a test of the filepath ending with `webm`.
   $: visible = typeof $filepath === 'string' && $filepath.toLowerCase().endsWith('webm');
</script>

{#if visible}
   <div transition:slideFade={{ duration: 100 }}>
      <input type=range step="0.01" min=0 max=4 bind:value={videoPlaybackRate} />
      <input type=checkbox bind:checked={videoPlayOnHover} />
   </div>
{/if}

<style>
   div {
      display: flex;
      align-items: center;

      background: var(--tjs-input-background);
      border: var(--tjs-input-border);
      border-radius: var(--tjs-input-border-radius);

      margin-bottom: 0.5em;
      padding: 0.5em;

      grid-column: span 3;  /* Span across all columns. */
   }
</style>