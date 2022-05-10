import * as easingFuncs       from 'svelte/easing';
import { get, writable }      from 'svelte/store';

import { Position }           from '@typhonjs-fvtt/runtime/svelte/application';

import { GsapCompose }        from '@typhonjs-fvtt/runtime/svelte/gsap';

import { CustomEase }         from '@typhonjs-fvtt/runtime/svelte/gsap/plugin/CustomEase';
import { MotionPathPlugin }   from '@typhonjs-fvtt/runtime/svelte/gsap/plugin/MotionPathPlugin';
import { CustomWiggle }       from '@typhonjs-fvtt/runtime/svelte/gsap/plugin/bonus/CustomWiggle';
import { InertiaPlugin }      from '@typhonjs-fvtt/runtime/svelte/gsap/plugin/bonus/InertiaPlugin';

GsapCompose.registerPlugin(CustomEase, CustomWiggle, MotionPathPlugin, InertiaPlugin);

// Defines a custom ease w/ the CustomWiggle plugin. This is used below to set a variable amount of wiggle count
// depending on the duration of the animation; more wiggles the lower the duration.
const customWiggle = (count = 10, type = 'anticipate') => `wiggle({ wiggles: ${count}, type: ${type} })`;

let idCntr = 0;

let gsapTimeline;

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
      updateImmediate: true,
      validator
   });

   // Store initial bounds to swap between `auto` and `bounds`.
   position._initialBounds = bounds;

   return position;
}

let data = [];

const boxStore = writable(data);

boxStore.stagger = writable(false);
boxStore.auto = writable(false);
boxStore.easing = writable('linear');
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

boxStore.gsapTimelineCreate = () =>
{
   const width = validator.width;
   const height = validator.height;

   // width & height divided by 6; used for motion path.
   const width6 = width / 6;
   const height6 = height / 6;

   // GSAP duration is in seconds not milliseconds.
   const duration = get(boxStore.duration) / 1000;
   const doubleDuration = duration * 2;

   // Stagger enabled state and cumulative time.
   const stagger = get(boxStore.stagger);

   // GSAP is loaded w/ the Svelte easing functions and are accessible by prepending `svelte-` and the function name.
   const ease = `svelte-${get(boxStore.easing)}`;

   // Defines the Bézier curve to animate along which will vary from the starting position of each box. This curve
   // is based on current width / height. This data is for the MotionPathPlugin.
   const motionVars = {
      motionPath: {
         path: [
            { left: width6 * 3, top: height6 * 3 },
            { left: width6, top: height6 * 4 },
            { left: width6 * 3, top: height6 },
            { left: width6 * 4, top: height6 * 3 }
         ],
         alignOrigin: [0.5, 0.5],
      },
      duration: doubleDuration,
      ease
   };

   // Kill & stop any existing timeline.
   if (gsapTimeline !== void 0) { gsapTimeline.kill(); }

   // Create new GSAP timeline; in paused state.
   gsapTimeline = GsapCompose.timeline({ paused: true });

   const allPositions = [];
   for (const entry of data)
   {
      allPositions.push(entry.position);
   }

   // GsapCompose.to(data, {
   //    left: getRandomInt(0, width),
   //    top: getRandomInt(0, height),
   //    duration,
   //    ease
   // });

   // gsapTimeline.add(GsapCompose.to(data, {
   //    left: getRandomInt(0, width),
   //    top: getRandomInt(0, height),
   //    duration,
   //    ease
   // }));

   // gsapTimeline.add(GsapCompose.fromTo(data, {
   //    left: getRandomInt(0, width),
   //    top: getRandomInt(0, height),
   // }, {
   //    left: getRandomInt(0, width),
   //    top: getRandomInt(0, height),
   //    duration,
   //    ease
   // }));

   // // Note: the `rotation` alias is used instead of rotateZ as this timeline includes use of CustomWiggle &
   // // MotionPathPlugin that output data to `rotation`.
   const createTimelineData = () => [
      { type: 'to', vars: { left: getRandomInt(0, width), duration, ease }, position: '<' },
      { type: 'to', vars: { rotation: getRandomInt(0, 360), duration, ease }, position: '<' },
      { type: 'to', target: 'element', vars: { opacity: 0.4, duration, ease }, position: '<-=50%' },
      { type: 'to', vars: { top: getRandomInt(0, height), duration, ease } },
      { type: 'to', vars: { rotation: '+=20', duration: doubleDuration, ease: customWiggle() }, position: '<+=50%' },
      { type: 'to', vars: motionVars },
      { type: 'to', target: 'element', vars: { opacity: 1, duration, ease }, position: '<+=10%' },
      { type: 'to', vars: { rotation: getRandomInt(540, 720), duration, ease }, position: '<' }
   ];

   const staggerFunc = (time = 0.1) => ({ index }) => index * time;

   gsapTimeline.add(GsapCompose.timeline(data, createTimelineData(), { position: stagger ? staggerFunc() : '<' }));

   // gsapTimeline.add(GsapCompose.timeline(allPositions, createTimelineData, { position: stagger ? staggerFunc() : '<' }));
   // gsapTimeline.add(GsapCompose.timeline([data[0], data[1]], createTimelineData));
};

boxStore.gsapTimelinePause = () =>
{
   if (gsapTimeline !== void 0) { gsapTimeline.pause(); }
};

boxStore.gsapTimelinePlay = () =>
{
   if (gsapTimeline !== void 0) { gsapTimeline.play(); }
};

boxStore.gsapTimelineRestart = () =>
{
   if (gsapTimeline !== void 0) { gsapTimeline.restart(); }
};

boxStore.gsapTimelineReverse = () =>
{
   if (gsapTimeline !== void 0) { gsapTimeline.reverse(); }
};

boxStore.randomLocation = () =>
{
   const width = validator.width;
   const height = validator.height;

   const duration = get(boxStore.duration);
   const easing = easingFuncs[get(boxStore.easing)];

   for (const entry of data)
   {
      entry.position.animateTo({ top: getRandomInt(0, height), left: getRandomInt(0, width) }, { duration, easing });
   }
};

boxStore.randomScaleRot = () =>
{
   const duration = get(boxStore.duration);
   const easing = easingFuncs[get(boxStore.easing)];

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

export { boxStore, validator };