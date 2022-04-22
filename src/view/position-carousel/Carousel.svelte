<script>
   import { applyPosition }         from '@typhonjs-fvtt/runtime/svelte/action';
   import { Position }              from '@typhonjs-fvtt/runtime/svelte/application';

   import { carouselStore }         from './carouselStore.js';

   // We can use Position to control the outer carousel rotational changes to keep the current selected index visible.
   // Using Position allows us to solve several issues from resetting the rotation / selected index when cell length
   // changes and animating when just selected index changes.
   const position = new Position(void 0, {
      top: 0,
      left: 0,
      width: 'auto',
      height: 'auto',
      translateZ: -288  // This is subtle, but we set translateZ here to make it take as the first transformation.
   })

   const selectedIndex = carouselStore.selectedIndex;
   const storeDuration = carouselStore.duration;
   const storeEasing = carouselStore.easing;

   const storeTransform = position.stores.transform;

   let currentLength = $carouselStore.length;

   let carouselTransform = 'none';

   // This reactive block triggers when the cell array length or selected index changes.
   $:
   {
      const length = $carouselStore.length;

      // Cell count has changed.
      if (currentLength !== length)
      {
         const currentIndex = $selectedIndex;

         // Reset selected index by
         const newIndex = (currentIndex % currentLength + currentLength) % currentLength

         // Adjust index to within bounds of the length.
         const cappedIndex = newIndex >= length ? length - 1 : newIndex;

         currentLength = length;

         const resetAngle = -carouselStore.theta * cappedIndex;

         // TODO: in the future when animation is fixed we can potentially animate `translateZ`.
         position.set({ translateZ: -carouselStore.radius, rotateY: resetAngle });

         $selectedIndex = cappedIndex;
      }
      else // Just animate to new selected index.
      {
         const angle = -carouselStore.theta * $selectedIndex;

         position.animateTo({ rotateY: angle }, { duration: $storeDuration, easing: $storeEasing });
      }
   }
</script>

<div class=carousel use:applyPosition={position}>
   <slot></slot>
</div>

<style>
   .carousel {
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      transform-style: preserve-3d;
   }
</style>