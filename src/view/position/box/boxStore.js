import { get, writable }   from 'svelte/store';

import { MathRandom }      from '#runtime/math/util';

import { TJSPosition }     from '#runtime/svelte/store/position';

import {
   getGsapEasingFunc,
   GsapCompose }           from '#runtime/svelte/gsap';

import { isObject }        from '#runtime/util/object';

// Imports the loading code / automatic GSAP plugin registration.
import '#runtime/svelte/gsap/plugin/CustomEase';
import '#runtime/svelte/gsap/plugin/MotionPathPlugin';
import '#runtime/svelte/gsap/plugin/bonus/CustomWiggle';
import '#runtime/svelte/gsap/plugin/bonus/InertiaPlugin';

// Defines a custom ease w/ the CustomWiggle plugin. This is used below to set a variable amount of wiggle count
// depending on the duration of the animation; more wiggles the lower the duration.
const customWiggle = (count = 10, type = 'anticipate') => `wiggle({ wiggles: ${count}, type: ${type} })`;

let idCntr = 0;

/** @type {import('#runtime/util/animate').BasicAnimation} */
let animateScaleRot, animateTo;

let gsapTimeline;

let savedComponentData;

const validator = new TJSPosition.Validators.TransformBounds({ constrain: false });

/**
 * Return a random rgba color.
 *
 * @returns {string} Random color.
 */
function getRandomColor()
{
   return `rgba(${MathRandom.getInt(100, 255)}, ${MathRandom.getInt(100, 255)}, ${MathRandom.getInt(100, 255)}, 0.5)`;
}

/**
 * @typedef {object} BoxData Defines the data stored in `boxStore`.
 *
 * @property {number} id - A unique ID for each box required by TJSPositionControlLayer.
 *
 * @property {import('#runtime/svelte/store/position').TJSPosition} position - The associated position store.
 *
 * @property {string} color - The CSS color string for the box.
 *
 * @property {{ width: number, height: number }} initialBounds - The initial bounds of the box.
 */

/** @type {BoxData[]} */
let data = [];

const boxStore = writable(data);

boxStore.stagger = writable(false);

boxStore.auto = writable(false);
boxStore.debug = writable(false);
boxStore.labels = writable(false);
boxStore.pclEnabled = writable(false);

boxStore.ease = writable('linear');
boxStore.duration = writable(1);

boxStore.validator = writable(true);

boxStore.add = (count = 1) =>
{
   const width = validator.width;
   const height = validator.height;

   boxStore.update((array) =>
   {
      for (let cntr = count; --cntr >= 0;)
      {
         const bounds = MathRandom.getInt(90, 140);

         const position = new TJSPosition({
            top: MathRandom.getInt(0, height),
            left: MathRandom.getInt(0, width),
            width: bounds,
            height: bounds,
            validator
         });

         array.push({
            id: idCntr++,
            position,
            color: getRandomColor(),
            initialBounds: { width: bounds, height: bounds }
         });
      }

      return array;
   });
};

boxStore.animateToCancel = () =>
{
   TJSPosition.Animate.cancelAll();
   animateTo = animateScaleRot = void 0;
};

boxStore.animateToLocation = () =>
{
   const width = validator.width;
   const height = validator.height;

   const duration = get(boxStore.duration);
   const ease = getGsapEasingFunc(get(boxStore.ease));

   // Stagger enabled state and cumulative time.
   const stagger = get(boxStore.stagger);

   const createPositionData = () => ({ top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) });
   const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

   if (animateTo) { animateTo.cancel(); }

   animateTo = TJSPosition.Animate.to(data, createPositionData, stagger ? createOptionsData : { duration, ease });

   // animateTo = TJSPosition.Animate.from(data, createPositionData, stagger ? createOptionsData : { duration, ease });

   // animateTo = TJSPosition.Animate.fromTo(data, createPositionData, createPositionData,
   //  stagger ? createOptionsData : { duration, ease });

   // if (!quickTo) { quickTo = TJSPosition.Animate.quickTo(data, ['top', 'left']); }
   //
   // quickTo.options({ duration, ease })(createPositionData);

   // animateTo.finished.then(() => console.log(`!! Animation Location Finished`));

   // for (const entry of data)
   // {
   //    entry.position.animate.fromTo({ top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) }, { top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) }, { duration, ease });
   // }
};

boxStore.animateToScaleRot = () =>
{
   const duration = get(boxStore.duration);
   const ease = getGsapEasingFunc(get(boxStore.ease));

   // Stagger enabled state and cumulative time.
   const stagger = get(boxStore.stagger);

   const createPositionData = () => ({ scale: MathRandom.getInt(50, 200) / 100, rotateZ: MathRandom.getInt(0, 360) });
   const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

   if (animateScaleRot) { animateScaleRot.cancel(); }

   animateScaleRot = TJSPosition.Animate.to(data, createPositionData, stagger ? createOptionsData : { duration, ease });

   // Example of cancelling animation after 500ms; the result for the Promise below will show `cancelled` state.
   // setTimeout(() => animateScaleRot.cancel(), 500);

   // Example of using finished Promise.
   animateScaleRot.finished.then((result) =>
    console.log(`!! Animation Scale / Rotate Finished: ${JSON.stringify(result)}`));
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
   const ease = getGsapEasingFunc(get(boxStore.ease));

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
      { type: 'to', vars: { left: MathRandom.getInt(0, width), duration, ease }, position: '<' },
      { type: 'to', vars: { rotation: MathRandom.getInt(0, 360), duration, ease }, position: '<' },
      { type: 'to', target: 'element', vars: { opacity: 0.4, duration, ease }, position: duration / 2 },
      { type: 'to', vars: { top: MathRandom.getInt(0, height), duration, ease } },
      { type: 'to', vars: { rotation: '+=20', duration: doubleDuration, ease: customWiggle() }, position: '<+=50%' },
      { type: 'to', vars: motionVars },
      { type: 'to', target: 'element', vars: { opacity: 1, duration, ease }, position: `-=${duration}` },
      { type: 'to', vars: { rotation: MathRandom.getInt(540, 720), duration, ease }, position: '<' }
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
         const index = MathRandom.getInt(0, array.length - 1);
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

boxStore.save = (componentData) =>
{
   savedComponentData = componentData;
};

boxStore.restore = () =>
{
   if (isObject(savedComponentData))
   {
      const newData = [];

      for (const component of savedComponentData.components)
      {
         // Must add a new TJSPosition and a new unique ID.
         const position = new TJSPosition({ ...component.position, validator });
         newData.push({ ...component, id: idCntr++, position });
      }

      boxStore.set(newData);
      data = newData;
   }
};

export { boxStore, validator };
