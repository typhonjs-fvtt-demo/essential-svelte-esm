import * as easingFuncs    from 'svelte/easing';
import { get, writable }   from 'svelte/store';

import { Position }        from '@typhonjs-fvtt/runtime/svelte/application';
import {
   gsap,
   CustomEase,
   CustomWiggle,
   MotionPathPlugin,
   GsapPosition }          from '@typhonjs-fvtt/runtime/svelte/gsap';

gsap.registerPlugin(CustomEase, CustomWiggle, MotionPathPlugin);

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

boxStore.gsapTimeline = () =>
{
   const width = validator.width;
   const height = validator.height;

   const width6 = width / 6;
   const height6 = height / 6;

   // Kill & stop any existing timeline.
   if (gsapTimeline !== void 0) { gsapTimeline.kill(); }

   // GSAP duration is in seconds not milliseconds.
   const duration = get(boxStore.duration) / 1000;
   const doubleDuration = duration * 2;

   // Stagger start time of each box in the timeline.
   const stagger = get(boxStore.stagger);

   // GSAP is loaded w/ the Svelte easing functions and are accessible by prepending `svelte-` and the function name.
   const ease = `svelte-${get(boxStore.easing)}`;

   // Defines the Bézier curve to animate along which will vary from the starting position of each box.
   // This data is for the MotionPathPlugin.
   const motionVars = {
      motionPath: {
         // path: [{ left: 200, top: 200 }, { left: 300, top: 100 }, { left: 400, top: 300 }],
         path: [
            { left: width6 * 3, top: height6 * 3 },
            { left: width6, top: height6 * 4 },
            { left: width6 * 3, top: height6 },
            { left: width6 * 4, top: height6 * 3 }
         ],
         alignOrigin: [0.5, 0.5],
      },
      duration,
      ease
   };

   // Create new GSAP timeline.
   gsapTimeline = gsap.timeline({ paused: true });

   let staggerTime = 0;

   // Create and add unique timelines for each position instance to main timeline.
   for (const entry of data)
   {
      // Composes a GSAP timeline from data. Note: the `rotation` alias is used instead of rotateZ as this
      // timeline includes use of CustomWiggle & MotionPathPlugin that output data to `rotation`.
      gsapTimeline.add(GsapPosition.timeline(entry.position, [
         { type: 'to', vars: { left: getRandomInt(0, width), duration, ease }, position: '<' },
         { type: 'to', vars: { rotation: getRandomInt(0, 360), duration, ease }, position: '<' },
         { type: 'to', target: 'element', vars: { opacity: 0.4, duration, ease }, position: '<-=50%' },
         { type: 'to', vars: { top: getRandomInt(0, height), duration, ease } },
         { type: 'to', vars: { rotation: '+=20', duration: doubleDuration, ease: customWiggle() }, position: '<+=50%' },
         { type: 'to', vars: motionVars },
         { type: 'to', target: 'element', vars: { opacity: 1, duration, ease }, position: '<+=10%' },
         { type: 'to', vars: { rotation: getRandomInt(540, 720), duration, ease }, position: '<' }
      ]), stagger ? staggerTime : '<');

      staggerTime += 0.1;
   }
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