import { writable }     from 'svelte/store';

import { gsapEasingFunc }   from '#runtime/svelte/gsap';

import { TJSPosition }  from '#runtime/svelte/store/position';

const s_CELL_WIDTH = 190;
const s_CELL_HEIGHT = 120;

/**
 * Create a random integer between min & max.
 *
 * @param {number} min - Minimum lower bound.
 *
 * @param {number} max - Maximum upper bound.
 *
 * @returns {number} Random integer.
 */
function getRandomInt(min, max)
{
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return a random linear gradient.
 *
 * @returns {string} Random linear gradient.
 */
function getRandomColor()
{
   return `linear-gradient(337deg, rgba(2,0,36,0.75) 0%, rgba(${getRandomInt(100, 255)}, ${getRandomInt(100, 255)}, ${
    getRandomInt(100, 255)}, 0.5) 50%, rgba(149,171,176,0.75) 100%)`;
}

/**
 * Creates a new position instance.
 *
 * @returns {TJSPosition} TJSPosition instance.
 */
function getPosition()
{
   return new TJSPosition(void 0, {
      top: 10,
      left: 10,
      width: s_CELL_WIDTH,
      height: s_CELL_HEIGHT,
      ortho: false
   });
}

const data = [];

const carouselStore = writable(data);

carouselStore.selectedIndex = writable(1);
carouselStore.duration = writable(0.5);
carouselStore.ease = writable(gsapEasingFunc.linear);
carouselStore.perspective = writable(1000);

carouselStore.theta = 0;
carouselStore.radius = 0;

carouselStore.setCells = (count) =>
{
   carouselStore.update((array) =>
   {
      if (count > array.length)
      {
         for (let cntr = count - array.length; --cntr >= 0;)
         {
            array.push({ id: array.length, position: getPosition(), color: getRandomColor() });
         }
      }
      else if (count < array.length)
      {
         array.splice(count, array.length);
      }

      // Update cell data
      carouselStore.theta = array.length ? 360 / array.length : 0;
      carouselStore.radius = array.length ? Math.round((s_CELL_WIDTH / 2) / Math.tan(Math.PI / array.length)) : 0;

      for (let cntr = 0; cntr < array.length; cntr++)
      {
         const cellAngle = carouselStore.theta * cntr;
         array[cntr].position.set({ rotateY: cellAngle, translateZ: carouselStore.radius });
      }

      return array;
   });
};

// Set initial cells
carouselStore.setCells(10);

export { carouselStore };
