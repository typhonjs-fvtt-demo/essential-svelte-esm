import * as easingFuncs    from 'svelte/easing';
import { get, writable }   from 'svelte/store';

import { Position }        from '@typhonjs-fvtt/runtime/svelte/application';

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
   const bound = getRandomInt(90, 140);

   return new Position(void 0, {
      top: getRandomInt(0, height),
      left: getRandomInt(0, width),
      width: bound,
      height: bound,
      ortho: true,
      validator
   });
}

let data = [];

const boxStore = writable(data);

boxStore.easing = writable(easingFuncs.linear);
boxStore.duration = writable(1000);
boxStore.debug = writable(false);
boxStore.labels = writable(false);

boxStore.add = (count = 1) =>
{
   const width = validator.width;
   const height = validator.height;

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
   const width = validator.width;
   const height = validator.height;

   const duration = get(boxStore.duration);
   const easing = get(boxStore.easing);

   for (const entry of data)
   {
      entry.position.animateTo({ top: getRandomInt(0, height), left: getRandomInt(0, width) }, { duration, easing });
   }
};

boxStore.randomScaleRot = () =>
{
   const duration = get(boxStore.duration);
   const easing = get(boxStore.easing);

   for (const entry of data)
   {
      const scale = getRandomInt(50, 200) / 100;
      entry.position.animateTo({ scale, rotateZ: getRandomInt(0, 360) }, { duration, easing });
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