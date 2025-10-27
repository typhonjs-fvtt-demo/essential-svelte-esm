<script>
   import { getContext }      from 'svelte';

   import { TJSContextMenu }  from '#standard/application/menu';

   import ItemCategory        from './ItemCategory.svelte';
   import ItemName            from './ItemName.svelte';

   /** @type {number} */
   export let i = 0;

   /** @type {import('#arrayObjectData').ItemEntryStore} */
   export let item = void 0;

   /** @type {import('#arrayObjectData').ItemContext} */
   const itemContext = getContext('#external').itemContext;

   const { createRowMenuItems } = itemContext;

   /** @type {import('#runtime/svelte/component/application').AppShell.Context.InternalAppStores} */
   const { elementContent } = getContext('#internal').stores;

   /**
    * @param {MouseEvent} event -
    */
   function onContextMenu(event)
   {
      const items = createRowMenuItems(itemContext, item, $elementContent);

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
</tr>

<style lang=scss>
   td {
      padding: var(--table-col-padding);
   }

   td:nth-child(1) {
      width: var(--table-col1-width);
   }

   td:nth-child(2), td:nth-child(3) {
      width: var(--table-cols-width);
   }
</style>
