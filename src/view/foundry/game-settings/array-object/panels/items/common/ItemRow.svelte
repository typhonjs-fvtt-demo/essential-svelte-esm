<script>
   import { getContext }      from 'svelte';

   import { TJSContextMenu }  from '#standard/application/menu';
   import { TJSIconButton }   from '#standard/component/button';

   import ItemCategory        from './ItemCategory.svelte';
   import ItemPropInput       from './ItemPropInput.svelte';

   /** @type {number} */
   export let i = 0;

   /** @type {import('#arrayObjectContext').ItemEntryStore} */
   export let item = void 0;

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { itemStore, menuItems } = getContext('#external').itemContext;

   /**
    * The dynamic table cell tags allowing reuse of this component across grid / table element layouts.
    *
    * @type {import('#arrayObjectContext').TableTags}
    */
   const { cell, row } = getContext('tableTags');

   /**
    * Delete button props.
    */
   const button = {
      icon: 'fas fa-xmark',
      tooltip: 'Delete',
      tooltipDirection: 'RIGHT',
      onPress: () => { itemStore.deleteEntry(item.id); }
   }

   /**
    * @param {MouseEvent} event -
    */
   function onContextMenu(event)
   {
      const items = menuItems.contextRow(item);

      if (items.length)
      {
         TJSContextMenu.create({ event, items });

         event.preventDefault();
         event.stopPropagation();
      }
   }
</script>

<svelte:element this={row} class=grid-row role=row tabindex=-1 on:contextmenu={onContextMenu}>
   <svelte:element this={cell} class=grid-cell>{i + 1}</svelte:element>
   <ItemPropInput {item} prop={'name'} />
   <ItemCategory {item} />
   <ItemPropInput {item} prop={'cost'} />
   {#if item.canUserModify}
      <svelte:element this={cell} class=grid-cell><TJSIconButton {button} /></svelte:element>
   {/if}
</svelte:element>
