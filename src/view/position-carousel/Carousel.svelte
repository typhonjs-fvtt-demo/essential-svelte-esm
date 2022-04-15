<script>
   import { applyPosition }         from '@typhonjs-fvtt/runtime/svelte/action';
   import { applyStyles }           from '@typhonjs-fvtt/runtime/svelte/action';
   import { Position }              from '@typhonjs-fvtt/runtime/svelte/application';

   import { carouselStore }         from './carouselStore.js';

   const position = new Position(void 0, {
      top: 0,
      left: 0,
      width: 'auto',
      height: 'auto',
      translateZ: -288,
      transformOrigin: 'center'
   })

   const selectedIndex = carouselStore.selectedIndex;
   const storeDuration = carouselStore.duration;
   const storeEasing = carouselStore.easing;

   const storeTransform = position.stores.transform;

   let stylesDebug;

   $:
   {
      const boundingRect = $storeTransform.boundingRect;

      stylesDebug = {
         left: `${boundingRect.x}px`,
         top: `${boundingRect.y}px`,
         width: `${boundingRect.width}px`,
         height: `${boundingRect.height}px`
      }

      console.log(`!! stylesDebug: `, stylesDebug)
   }


   let currentLength = $carouselStore.length;

   let carouselTransform = 'none';

   /**
    * TODO: Note: Left to the reader. For easy smooth scrolling backward and forward `selectedIndex` may diverge quite
    * a bit from the range of cells causing an increasing negative or positive rotation for the `div.carousel` element.
    * When cell count is changed the indexing will be off and depending on how far away
    */

   $: if ($carouselStore)
   {
      const length = $carouselStore.length;

      if (currentLength !== length)
      {
         console.log(`! Carousel - new length - current selectedIndex: ${$selectedIndex}`);

         const direction = currentLength - length;

         // selectedIndex = (selectedIndex % length + length) % length
         const newIndex = ($selectedIndex % currentLength + currentLength) % currentLength

         $selectedIndex = newIndex >= length ? length - 1 : newIndex;

         currentLength = length;

         console.log(`! Carousel - new length - new selectedIndex: ${$selectedIndex}`);

         // const angle = carouselStore.theta * selectedIndex * -1;
         const resetAngle = carouselStore.theta * ($selectedIndex + direction > 0 ? -1 : 1) * -1;

         position.set({ translateZ: -carouselStore.radius, rotateY: resetAngle }).elementUpdated.then(() =>
         {
            const angle = carouselStore.theta * $selectedIndex * -1;
            position.animateTo({ translateZ: -carouselStore.radius, rotateY: angle })
         });

         // position.set({ translateZ: -carouselStore.radius, rotateY: angle });

         // position.animateTo({ translateZ: -carouselStore.radius, rotateY: angle }, { duration: 750, easing: easing.elasticOut });
      }
      else
      {
         console.log(`! Carousel - same length`);

         const angle = carouselStore.theta * $selectedIndex * -1;
         position.animateTo({ translateZ: -carouselStore.radius, rotateY: angle },
          { duration: $storeDuration, easing: $storeEasing });
      }
   }
</script>

<div class=carousel use:applyPosition={position}>
   <slot></slot>
</div>
<div class=debug use:applyStyles={stylesDebug}></div>

<style>
   .carousel {
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      transform-style: preserve-3d;
   }

   /* TODO: Remove; testing */
   div.debug {
      position: absolute;
      background: rgba(100, 200, 255, 0.2);
      pointer-events: none;
   }
</style>