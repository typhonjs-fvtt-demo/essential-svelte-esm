import { writable } from 'svelte/store';
import { Position } from '@typhonjs-fvtt/runtime/svelte/application';

const s_CELL_WIDTH = 190;
const s_CELL_HEIGHT = 120;

function getRandomInt(min, max)
{
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor()
{
   return `rgba(${getRandomInt(100, 255)}, ${getRandomInt(100, 255)}, ${getRandomInt(100, 255)}, 0.5)`;
}

function getPosition()
{
   return new Position(void 0, {
      top: 10,
      left: 10,
      width: s_CELL_WIDTH,
      height: s_CELL_HEIGHT,
      transformOrigin: 'center',
   });
}

const data = [];

const carouselStore = writable(data);

carouselStore.selectedIndex = writable(1);

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
      carouselStore.theta = data.length ? 360 / data.length : 0;
      carouselStore.radius = data.length ? Math.round((s_CELL_WIDTH / 2) / Math.tan(Math.PI / data.length)) : 0;

      for (let cntr = 0; cntr < data.length; cntr++)
      {
         const cellAngle = carouselStore.theta * cntr;
         data[cntr].position.set({ rotateY: cellAngle, translateZ: carouselStore.radius });
      }

      return array;
   });
};

export { carouselStore };