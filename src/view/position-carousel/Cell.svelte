<script>
   import { fade }            from 'svelte/transition';
   import { applyPosition }   from '@typhonjs-fvtt/runtime/svelte/action';

   import { carouselStore }   from './carouselStore.js';

   export let cell;

   const selectedIndex = carouselStore.selectedIndex;

   /**
    * Tracks whether the mouse is over a given cell; adds / removes the `.highlight` class.
    * @type {boolean}
    */
   let highlight = false;

   /**
    * The trick with the onClick handler is that we want continuous rotation across the base / 0 point. If we simply
    * set the selected index to the given ID this doesn't respect that the selected index is not bounded by the
    * array length.
    *
    * Using a calculation of the absolute value between the difference of the new / adjusted index we can determine
    * if the new index crosses the 0 / base value allowing an adjustment that gives the relative change.
    *
    * @param {number}   newId - The 0 to length ID.
    */
   function onClick(newId)
   {
      const currentIndex = $selectedIndex;
      const currentLength = $carouselStore.length;

      // Since the IDs are 0 indexed add 1.
      let newIndex = newId + 1;

      // Adjust the current selected index to be bounded between 0 and length.
      let adjustedIndex = 1 + (currentIndex % currentLength + currentLength) % currentLength;

      // Detect if there is a click across the 0 index then adjust either the newIndex or adjustedIndex based on
      // current length. This allows a normalized / relative adjustment calculation to be made.
      if (Math.abs(newIndex - adjustedIndex) > currentLength * 0.5)
      {
         if (newIndex > adjustedIndex)
         {
            adjustedIndex += currentLength;
         }
         else if (newIndex < adjustedIndex)
         {
            newIndex += currentLength;
         }
      }

      // Add the relative distance between new and adjusted index and add that to the current index.
      $selectedIndex = currentIndex + (newIndex - adjustedIndex);
   }

</script>

<div use:applyPosition={cell.position}
     transition:fade
     class:highlight={highlight}
     style:background={cell.color}
     on:click={() => onClick(cell.id)}
     on:mouseenter={() => highlight = true}
     on:mouseleave={() => highlight = false}>
   {cell.id}
</div>

<style>
   div {
      position: absolute;
      border: 2px solid black;
      border-radius: 16px;
      line-height: 116px;
      font-size: 80px;
      font-weight: bold;
      color: white;
      text-align: center;
      transition: transform 750ms, border-color 100ms;
   }

   .highlight {
      border-color: rgba(60, 60, 207, 0.8);
   }
</style>