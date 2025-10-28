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

<section class=grid-row role=row tabindex=-1 on:contextmenu={onContextMenu}>
   <div class=grid-cell>{i + 1}</div>
   <ItemName {item} />
   <ItemCategory {item} />
   {#if canEdit}
      <div class=grid-cell><TJSIconButton {button} /></div>
   {/if}
</section>
