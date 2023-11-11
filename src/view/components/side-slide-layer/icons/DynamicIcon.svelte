<script>
   /**
    * This is a basic demo to show that you can load a Svelte component as the side slide layer item icon.
    *
    * This is potentially useful to provide a stateful icon. Perhaps you need to draw a users attention to the panel by
    * changing the display of the icon or overlaying an additional element.
    *
    * In this basic example a div element takes the entire icon space and there is CSS to change the icon color when
    * it is hovered over.
    */
</script>

<div>
   <i class="fas fa-wrench"></i>
</div>

<style>
   /* Make div full size of the inner size of the item button */
   div {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
   }

   div:hover {
      color: red;
   }
</style>
