import { writable } from 'svelte/store';
import { Position } from '@typhonjs-fvtt/runtime/svelte/application';

let idCntr = 0;

const validator = new Position.Validators.TransformBounds({ constrain: false });

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

function getPosition(width, height)
{
   const bound = getRandomInt(60, 120);

   return new Position(void 0, {
      top: getRandomInt(0, height),
      left: getRandomInt(0, width),
      width: bound,
      height: bound,
      transformOrigin: 'center',
      validators: validator
   });
}

let data = [];

const boxStore = writable(data);

// Add debug writable to track debug state.
boxStore.debug = writable(false);

boxStore.add = (count = 1) =>
{
   const element = validator.element;
   const width = element.offsetWidth;
   const height = element.offsetHeight;

   boxStore.update((array) =>
   {
      for (let cntr = count; --cntr >= 0;)
      {
         array.push({ id: idCntr++, position: getPosition(width, height), color: getRandomColor() });
      }

      return array;
   });
};

boxStore.randomLocation = () =>
{
   const element = validator.element;
   const width = element.offsetWidth;
   const height = element.offsetHeight;

   for (const entry of data)
   {
      entry.position.animateTo({ top: getRandomInt(0, height), left: getRandomInt(0, width) });
   }
};

boxStore.randomScaleRot = () =>
{
   for (const entry of data)
   {
      const scale = getRandomInt(50, 200) / 100;
      entry.position.animateTo({ scale, rotateZ: getRandomInt(0, 360) });
   }
};

boxStore.remove = (id) =>
{
   boxStore.update((array) =>
   {
      const index = array.findIndex((entry) => entry.id === id);
      if (index >= 0) { array.splice(index, 1); }
      return array;
   });
};

boxStore.removeRandom = (count = 1) =>
{
   boxStore.update((array) =>
   {
      for (; --count >= 0;)
      {
         const index = getRandomInt(0, array.length - 1);
         array.splice(index, 1);
      }

      return array;
   });
};

boxStore.removeAll = () =>
{
   data = [];
   boxStore.set(data);
};

boxStore.validate = () =>
{
   for (const entry of data)
   {
      entry.position.set();
   }
};

export { boxStore, validator };