<script>
   import { slideFade }    from '#runtime/svelte/transition';

   import { rippleFocus }  from '#standard/action/animate/composable/ripple';
   import { TJSInput }     from '#standard/component/form';

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
      <TJSInput type={'range'} label={'Playback rate:'} store={videoPlaybackRate} min={0.1} max={4} step={0.01} efx={rippleFocus()} />
      <TJSInput type={'number'} store={videoPlaybackRate} step={0.01} efx={rippleFocus()} />
      <TJSInput type={'checkbox'} label={'Play on hover:'} store={videoPlayOnHover} />
   </div>
 {/if}

<style>
   div {
      display: flex;
      align-items: center;
      gap: 0.5em;

      --tjs-input-number-width: fit-content;
      --tjs-input-number-text-align: center;

      background: var(--tjs-input-background);
      border: var(--tjs-input-border);
      border-radius: var(--tjs-input-border-radius);

      margin-bottom: 0.5em;
      padding: 0.5em;

      grid-column: span 3;  /* Span across all columns. */
   }
</style>
