<script>
   import { getContext }   from 'svelte';

   import { localize }     from '#runtime/util/i18n';

   /**
    * Item property to target.
    *
    * @type {'name' | 'category'}
    */
   export let prop = void 0;

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { itemStore } = getContext('#external').itemContext;

   const { sortBy } = itemStore.stores;

   function handleChange()
   {
      itemStore.toggleSortBy(prop);
   }

   function onKeyup(event)
   {
      if (event.code === 'Enter') { handleChange(); }
   }

   /**
    * Gets the current sort icon.
    *
    * @param {{ prop: string, state: 'none' | 'asc' | 'desc' }} data - Sort by data.
    */
   function getIcon(data)
   {
      let icon = 'fas fa-sort';

      if (data.prop !== prop || data.state === 'none') { return icon; }

      return `${icon}${data.state === 'asc' ? '-up' : '-down'}`;
   }
</script>

<span on:click={handleChange}
      on:keyup|stopPropagation={onKeyup}
      tabindex=0
      role=button
      >
   {localize(`EssentialESM.apps.foundry.settings.array-object.item.${prop}`)}
   <i class={getIcon($sortBy)} />
</span>

<style lang=scss>
   span:focus-visible {
      outline: none;
      text-decoration: underline;
   }

   span:hover {
      cursor: var(--tjs-cursor-pointer);
      text-decoration: underline;
   }
</style>
