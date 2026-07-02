<script>
   /**
    * Defines an example header component for `TJSGameSettingsWithUI / `TJSSettingsEdit` / `TJSSettingsSwap`.
    *
    * This is a basic example simply showing that you can embed a custom Svelte component at the top of the settings
    * edit display.
    *
    * @componentDescription
    */
</script>

<div>
    <span>Example `Header component`</span>
</div>

<style>
   div {
      display: flex;
      background: var(--tjs-component-background-alt);
      border-bottom: var(--tjs-component-border);

      align-items: center;
      justify-content: center;
      height: 2rem;
      min-height: 2rem;
      padding: 0 0.5rem;
      font-weight: bold;
   }

   span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
</style>
