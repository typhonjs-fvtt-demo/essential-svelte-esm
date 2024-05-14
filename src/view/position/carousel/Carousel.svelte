<script>
   import {
      applyPosition,
      TJSPosition }           from '#runtime/svelte/store/position';

   import { carouselStore }   from './carouselStore.js';

   // We can use TJSPosition to control the outer carousel rotational changes to keep the current selected index visible.
   // Using TJSPosition allows us to solve several issues from resetting the rotation / selected index when cell length
   // changes and animating when just selected index changes.
   const position = new TJSPosition({
      top: 0,
      left: 0,
      width: 'auto',
      height: 'auto',
      translateZ: -288  // This is subtle, but we set translateZ here to make it take as the first transformation.
   })

   const selectedIndex = carouselStore.selectedIndex;
   const storeDuration = carouselStore.duration;
   const storeEase = carouselStore.ease;

   // We can use quickTo as the animation options do not change.
   const quickTranslateZ = position.animate.quickTo(['translateZ'], { duration: 0.5, ease: 'linear' });

   let currentLength = $carouselStore.length;

   // This reactive block triggers when the cell array length or selected index changes.
   $:
   {
      const length = $carouselStore.length;

      // Cell count has changed.
      if (currentLength !== length)
      {
         const currentIndex = $selectedIndex;

         // Calculates a circular index `newIndex` within the bounds of the old array, ensuring it handles positive or
         // negative indices correctly.
         const newIndex = (currentIndex % currentLength + currentLength) % currentLength;

         // Adjust index to within bounds of the length in the case that there are fewer cells.
         const cappedIndex = newIndex >= length ? length - 1 : newIndex;

         currentLength = length;

         const resetAngle = -carouselStore.theta * cappedIndex;

         // Apply the reset angle animating w/ `bounceOut` while cancelling any current animation of `rotateY`.
         // A `fromTo` animation is used to reset the current unbounded rotation via the modulus operator of the
         // current `rotateY` preventing "over rotation" regardless how far rotation has progressed outside 360 degrees.
         position.animate.fromTo({ rotateY: position.rotateY % 360 }, { rotateY: resetAngle },
          { duration: 1, ease: 'bounceOut', strategy: 'cancel' });

         quickTranslateZ(-carouselStore.radius);

         $selectedIndex = cappedIndex;
      }
      else // Just animate to new selected index.
      {
         const angle = -carouselStore.theta * $selectedIndex;

         position.animate.to({ rotateY: angle }, { duration: $storeDuration, ease: $storeEase, strategy: 'cancel' });
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
