<script>
   import { getContext }      from 'svelte';

   import { TJSContextMenu }  from '#standard/application/menu';
   import { TJSIconButton }   from '#standard/component/button';

   import ItemCategory        from './ItemCategory.svelte';
   import ItemName            from './ItemName.svelte';

   /** @type {number} */
   export let i = 0;

   /** @type {import('#arrayObjectContext').ItemEntryStore} */
   export let item = void 0;

   /** @type {import('#arrayObjectContext').ItemContext} */
   const { canEdit, itemStore, menuItems } = getContext('#external').itemContext;

   const button = {
      icon: 'fas fa-xmark',
      onPress: () => { itemStore.deleteEntry(item.id); }
   }

   /**
    * @param {MouseEvent} event -
    */
   function onContextMenu(event)
   {
      const items = menuItems.createRow(item);

      if (items.length)
      {
         TJSContextMenu.create({ event, items });

         event.preventDefault();
         event.stopPropagation();
      }
   }
</script>

<tr on:contextmenu={onContextMenu}>
   <td>{i + 1}</td>
   <ItemName {item} />
   <ItemCategory {item} />
   {#if canEdit}
      <td><TJSIconButton {button} /></td>
   {/if}
</tr>

<style lang=scss>
   td {
      padding: var(--table-col-padding);
   }

   td:nth-child(1), td:nth-child(4) {
      width: var(--table-col-min-width);
   }

   td:nth-child(2), td:nth-child(3) {
      width: var(--table-cols-width);
   }
</style>
