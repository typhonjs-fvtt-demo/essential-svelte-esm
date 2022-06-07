import { get, writable }   from 'svelte/store';

import { Position }        from '@typhonjs-fvtt/runtime/svelte/application';

import {
   easingFunc,
   GsapCompose }           from '@typhonjs-fvtt/runtime/svelte/gsap';

// Imports the loading code / automatic GSAP plugin registration.
import '@typhonjs-fvtt/runtime/svelte/gsap/plugin/CustomEase';
import '@typhonjs-fvtt/runtime/svelte/gsap/plugin/MotionPathPlugin';
import '@typhonjs-fvtt/runtime/svelte/gsap/plugin/bonus/CustomWiggle';
import '@typhonjs-fvtt/runtime/svelte/gsap/plugin/bonus/InertiaPlugin';

// Defines a custom ease w/ the CustomWiggle plugin. This is used below to set a variable amount of wiggle count
// depending on the duration of the animation; more wiggles the lower the duration.
const customWiggle = (count = 10, type = 'anticipate') => `wiggle({ wiggles: ${count}, type: ${type} })`;

let idCntr = 0;

let animateScaleRot, animateTo;

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

   const position = new Position({
      top: getRandomInt(0, height),
      left: getRandomInt(0, width),
      width: auto ? 'auto' : bounds,
      height: auto ? 'auto' : bounds,
      validator
   });

   // Store initial bounds to swap between `auto` and `bounds`.
   position._initialBounds = bounds;

   return position;
}

/** @type {{id: number, position: Position, color: string}[]} */
let data = [];

const boxStore = writable(data);

boxStore.stagger = writable(false);
boxStore.auto = writable(false);
boxStore.ease = writable(easingFunc.linear);
boxStore.duration = writable(1);
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

boxStore.animateToCancel = () =>
{
   Position.Animate.cancelAll();
   animateTo = animateScaleRot = void 0;
};

boxStore.animateToLocation = () =>
{
   const width = validator.width;
   const height = validator.height;

   const duration = get(boxStore.duration);
   const ease = get(boxStore.ease);

   // Stagger enabled state and cumulative time.
   const stagger = get(boxStore.stagger);

   const createPositionData = () => ({ top: getRandomInt(0, height), left: getRandomInt(0, width) });
   const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

   if (animateTo) { animateTo.cancel(); }

   animateTo = Position.Animate.to(data, createPositionData, stagger ? createOptionsData : { duration, ease });

   // animateTo = Position.Animate.from(data, createPositionData, stagger ? createOptionsData : { duration, ease });

   // animateTo = Position.Animate.fromTo(data, createPositionData, createPositionData,
   //  stagger ? createOptionsData : { duration, ease });

   // animateTo.finished.then(() => console.log(`!! Animation Location Finished`));

   // for (const entry of data)
   // {
   //    entry.position.animate.fromTo({ top: getRandomInt(0, height), left: getRandomInt(0, width) }, { top: getRandomInt(0, height), left: getRandomInt(0, width) }, { duration, ease });
   // }
};

boxStore.animateToScaleRot = () =>
{
   const duration = get(boxStore.duration);
   const ease = get(boxStore.ease);

   // Stagger enabled state and cumulative time.
   const stagger = get(boxStore.stagger);

   const createPositionData = () => ({ scale: getRandomInt(50, 200) / 100, rotateZ: getRandomInt(0, 360) });
   const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

   if (animateScaleRot) { animateScaleRot.cancel(); }

   animateScaleRot = Position.Animate.to(data, createPositionData, stagger ? createOptionsData : { duration, ease });

   animateScaleRot.finished.then(() => console.log(`!! Animation Scale / Rotate Finished`));
};

boxStore.gsapTimelineCreate = () =>
{
   const width = validator.width;
   const height = validator.height;

   // width & height divided by 6; used for motion path.
   const width6 = width / 6;
   const height6 = height / 6;

   const duration = get(boxStore.duration);
   const doubleDuration = duration * 2;

   // Stagger enabled state and cumulative time.
   const stagger = get(boxStore.stagger);

   // GSAP is loaded w/ the Svelte easing functions and are accessible by prepending `svelte-` and the function name.
   const ease = get(boxStore.ease);

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

   // // Note: the `rotation` alias is used instead of rotateZ as this timeline includes use of CustomWiggle &
   // // MotionPathPlugin that output data to `rotation`.
   const createTimelineData = () => [
      { type: 'to', vars: { left: getRandomInt(0, width), duration, ease }, position: '<' },
      { type: 'to', vars: { rotation: getRandomInt(0, 360), duration, ease }, position: '<' },
      { type: 'to', target: 'element', vars: { opacity: 0.4, duration, ease }, position: duration / 2 },
      { type: 'to', vars: { top: getRandomInt(0, height), duration, ease } },
      { type: 'to', vars: { rotation: '+=20', duration: doubleDuration, ease: customWiggle() }, position: '<+=50%' },
      { type: 'to', vars: motionVars },
      { type: 'to', target: 'element', vars: { opacity: 1, duration, ease }, position: `-=${duration}` },
      { type: 'to', vars: { rotation: getRandomInt(540, 720), duration, ease }, position: '<' }
   ];

   const staggerFunc = (time = 0.1) => ({ index }) => index * time;

   gsapTimeline.add(GsapCompose.timeline(data, createTimelineData, { position: stagger ? staggerFunc() : '<' }));
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