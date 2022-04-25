import * as easingFuncs    from 'svelte/easing';
import { get, writable }   from 'svelte/store';

import { Position }        from '@typhonjs-fvtt/runtime/svelte/application';

import { resizeObserver }  from '@typhonjs-fvtt/runtime/svelte/action';

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

function getPosition(width, height, auto)
{
   const bounds = getRandomInt(90, 140);

   const position = new Position(void 0, {
      top: getRandomInt(0, height),
      left: getRandomInt(0, width),
      width: auto ? 'auto' : bounds,
      height: auto ? 'auto' : bounds,
      ortho: true,
      validator
   });

   // Store initial bounds to swap between `auto` and `bounds`.
   position._initialBounds = bounds;

   return position;
}

let data = [];

const boxStore = writable(data);

boxStore.auto = writable(false);
boxStore.easing = writable(easingFuncs.linear);
boxStore.duration = writable(1000);
boxStore.validator = writable(true);
boxStore.debug = writable(false);
boxStore.labels = writable(false);

boxStore.add = (count = 1) =>
{
   const width = validator.width;
   const height = validator.height;

   const auto = get(boxStore.auto);

   boxStore.update((array) =>
   {
      for (let cntr = count; --cntr >= 0;)
      {
         array.push({ id: idCntr++, position: getPosition(width, height, auto), color: getRandomColor() });
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

boxStore.setDimension = (offsetWidth, offsetHeight) =>
{
   validator.setDimension(offsetWidth, offsetHeight);

   // Force validation for all Position instances.
   for (const entry of data) { entry.position.set(); }
};

boxStore.changePadding = () =>
{
   for (const entry of data)
   {
      const el = entry.position.element;
      if (el instanceof HTMLElement)
      {
         el.style.padding = '5px';
         resizeObserver.updateCache(el);
         entry.position.set();
      }
   }
};

export { boxStore, validator };