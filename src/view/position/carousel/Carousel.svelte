<script>
   import { applyPosition }   from '@typhonjs-fvtt/runtime/svelte/action';
   import { TJSPosition }     from '@typhonjs-fvtt/runtime/svelte/store/position';

   import { easingFunc }      from '@typhonjs-fvtt/runtime/svelte/gsap';

   import { carouselStore }   from './carouselStore.js';

   // We can use TJSPosition to control the outer carousel rotational changes to keep the current selected index visible.
   // Using TJSPosition allows us to solve several issues from resetting the rotation / selected index when cell length
   // changes and animating when just selected index changes.
   const position = new TJSPosition(void 0, {
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
   const quickTranslateZ = position.animate.quickTo(['translateZ'], { duration: 0.5, ease: easingFunc['power3.out'] });

   let currentLength = $carouselStore.length;

   let animateRotateY;

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

         position.set({ rotateY: resetAngle });

         quickTranslateZ(-carouselStore.radius);

         $selectedIndex = cappedIndex;
      }
      else // Just animate to new selected index.
      {
         const angle = -carouselStore.theta * $selectedIndex;

         // Cancel existing animation and start a new one. This is done instead of quickTo because animation options may
         // change from user input.
         if (animateRotateY) { animateRotateY.cancel(); }

         animateRotateY = position.animate.to({ rotateY: angle }, { duration: $storeDuration, ease: $storeEase });
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