import { MathRandom }      from '#runtime/math/util';

import {
   getGsapEasingFunc,
   GsapCompose }           from '#runtime/svelte/animate/gsap';

// Imports the loading code / automatic GSAP plugin registration.
import '#runtime/svelte/animate/gsap/plugin/CustomEase';
import '#runtime/svelte/animate/gsap/plugin/MotionPathPlugin';
import '#runtime/svelte/animate/gsap/plugin/bonus/CustomWiggle';
import '#runtime/svelte/animate/gsap/plugin/bonus/InertiaPlugin';

/**
 * Controls GSAP animation as facilitated through `GsapCompose`. `GsapCompose` is a bridge between TJSPosition and GSAP.
 * It is rather handy because it allows GSAP animations to be defined by data / declaratively rather than the functional
 * API that GSAP provides.
 */
export class GsapAnimation
{
   #animData;

   /**
    * Stores all the active box data.
    *
    * @type {BoxData[]}
    */
   #boxData;

   /**
    * The GSAP timeline.
    */
   #gsapTimeline;

   /**
    * The box position validator attached to the app window bounds.
    *
    * @type {import('#runtime/svelte/store/position').System.Validator.ValidatorSystem}
    */
   #validator;

   constructor(boxData, validator, animData)
   {
      this.#boxData = boxData;
      this.#validator = validator;
      this.#animData = animData;
   }

   /**
    * Creates a new GSAP timeline via GsapCompose.
    */
   timelineCreate()
   {
      const width = this.#validator.width;
      const height = this.#validator.height;

      // width & height divided by 6; used for motion path.
      const width6 = width / 6;
      const height6 = height / 6;

      const duration = this.#animData.duration;
      const doubleDuration = duration * 2;

      // Stagger enabled state and cumulative time.
      const stagger = this.#animData.stagger;

      // GSAP is loaded w/ the Svelte easing functions and are accessible by prepending `svelte-` and the function name.
      const ease = getGsapEasingFunc(this.#animData.ease);

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
      if (this.#gsapTimeline !== void 0) { this.#gsapTimeline.kill(); }

      // Create new GSAP timeline; in paused state.
      this.#gsapTimeline = GsapCompose.timeline({ paused: true });

      // Note: the `rotation` alias is used instead of rotateZ as this timeline includes use of CustomWiggle &
      // MotionPathPlugin that output data to `rotation`.
      const createTimelineData = () => [
         { type: 'to', vars: { left: MathRandom.getInt(0, width), duration, ease }, position: '<' },
         { type: 'to', vars: { rotation: MathRandom.getInt(0, 360), duration, ease }, position: '<' },
         { type: 'to', target: 'element', vars: { opacity: 0.4, duration, ease }, position: duration / 2 },
         { type: 'to', vars: { top: MathRandom.getInt(0, height), duration, ease } },
         { type: 'to', vars: { rotation: '+=20', duration: doubleDuration, ease: this.#getCustomWiggle() },
           position: '<+=50%' },
         { type: 'to', vars: motionVars },
         { type: 'to', target: 'element', vars: { opacity: 1, duration, ease }, position: `-=${duration}` },
         { type: 'to', vars: { rotation: MathRandom.getInt(540, 720), duration, ease }, position: '<' }
      ];

      const staggerFunc = (time = 0.1) => ({ index }) => index * time;

      this.#gsapTimeline.add(GsapCompose.timeline(this.#boxData, createTimelineData,
       { position: stagger ? staggerFunc() : '<' }));
   }

   /**
    * Pause an existing GSAP timeline.
    */
   timelinePause()
   {
      this.#gsapTimeline?.pause();
   }

   /**
    * Play an existing GSAP timeline.
    */
   timelinePlay()
   {
      this.#gsapTimeline?.play();
   }

   /**
    * Restart an existing GSAP timeline.
    */
   timelineRestart()
   {
      this.#gsapTimeline?.restart();
   }

   /**
    * Reverse an existing GSAP timeline.
    */
   timelineReverse()
   {
      this.#gsapTimeline?.reverse();
   }

   /**
    * Defines a custom ease w/ the CustomWiggle plugin. This is used below to set a variable amount of wiggle count
    * depending on the duration of the animation; more wiggles the lower the duration.
    *
    * @param {number}   count - Wiggle count.
    *
    * @param {string}   type - Wiggle type.
    *
    * @returns {string} Custom wiggle data.
    */
   #getCustomWiggle(count = 10, type = 'anticipate')
   {
      return `wiggle({ wiggles: ${count}, type: ${type} })`;
   }
}
