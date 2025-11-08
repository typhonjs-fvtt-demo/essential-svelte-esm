<script>
   import { getContext } from 'svelte';

   /** @type {import('#runtime/svelte/application').SvelteApp.Context.External} */
   const { application } = getContext('#external');

   /**
    * You can retrieve the custom panel folder store from the storage provider supplied to `TJSSettingsSwap` or
    * `TJSSettingsEdit`. Usually this is `application.reactive.sessionStorage`. The storage key is:
    * `The setting / package namespace` + `-settings-folder-` + `The folder label / lang key`.
    *
    * This allows you to potentially provide a custom summary end component that is stateful. IE perhaps some custom
    * buttons related to the custom panel added.
    *
    * @type {import('svelte/store').Writable<boolean>}
    */
   const storeFolder = application.reactive.sessionStorage.getStore(
    'essential-svelte-esm-settings-folder-Custom Svelte Panel');
</script>

<section>{$storeFolder ? 'Opened' : 'Closed'}</section>

<style lang=scss>
   section {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: auto;
      margin-right: 0.5rem;

      height: 20px;
      width: 50px;

      background: rgba(255, 0, 0, 0.2);
   }
</style>
