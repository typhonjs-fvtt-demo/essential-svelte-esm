import { MathRandom }         from '#runtime/math/util';
import { getGsapEasingFunc }  from '#runtime/svelte/animate/gsap';
import { TJSPosition }        from '#runtime/svelte/store/position';
import { isFinite }           from '#runtime/util/predicate';

/**
 * @import { BasicAnimation } from '#runtime/util/animate';
 *
 * @import { AnimateData }    from './AnimateControl';
 *
 * @import { BoxData }        from '../types-local';
 */

/**
 * Controls built-in TJSPosition animation. The built-in animation capabilities provide all essential tweening
 * operations and is completely independent of GSAP or other animation libraries. The built-in animation performance is
 * about 33% faster than GSAP.
 */
export class PositionAnimation
{
   /** @type {AnimateData} */
   #animData;

   /**
    * Stores all the active box data.
    *
    * @type {BoxData[]}
    */
   #boxData;

   /**
    * The box position validator attached to the app window bounds.
    *
    * @type {TJSPosition.API.System.Validator.ValidatorSystem}
    */
   #validator;

   /**
    * Used by commented out example of `quickTo` scheduling below.
    *
    * @type {TJSPosition.API.Animation.GroupQuickToCallback | undefined}
    */
   #quickTo;

   /**
    * @param {BoxData[]} boxData -
    *
    * @param {TJSPosition.API.System.Validator.ValidatorSystem} validator -
    *
    * @param {AnimateData} animData -
    */
   constructor(boxData, validator, animData)
   {
      this.#boxData = boxData;
      this.#validator = validator;
      this.#animData = animData;
   }

   /**
    * Cancels any current animation in progress.
    */
   cancel()
   {
      TJSPosition.Animate.cancel(this.#boxData);
   }

   /**
    * Animate all boxes to a random location.
    */
   toLocation()
   {
      const width = this.#validator.width;
      const height = this.#validator.height;

      if (!isFinite(width) || !isFinite(height))
      {
         console.warn(`PositionAnimation warning: validator width or height not a number.`);
         return;
      }

      const duration = this.#animData.duration;
      const ease = getGsapEasingFunc(this.#animData.ease);

      // Stagger enabled state and cumulative time.
      const stagger = this.#animData.stagger;

      /**
       * A positional callback invoked for each box in `#boxData` returning a random `top` / `left` value.
       *
       * @type {TJSPosition.API.Animation.GroupDataCallback}
       */
      const createPositionData = () => ({ top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) });

      /**
       * Tween options callback invoked for each box in `#boxData`. This is utilized to implement the stagger capability
       * with the TJSPosition animation API.
       *
       * @type {TJSPosition.API.Animation.GroupTweenOptionsCallback}
       */
      const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

      /**
       * Group animation: To new position from current position.
       */
      TJSPosition.Animate.to(this.#boxData, createPositionData, stagger ? createOptionsData :
       { duration, ease, strategy: 'cancel' });

      // The following are commented out examples of other animation capabilities such as `from`, `fromTo`, `quickTo`.

      /* ---------------- */

      // /**
      //  * Group animation: From random position to current position animation.
      //  */
      // TJSPosition.Animate.from(this.#boxData, createPositionData, stagger ? createOptionsData :
      //  { duration, ease, strategy: 'cancel' });

      /* ---------------- */

      // /**
      //  * Group animation: Random start / end `fromTo`.
      //  */
      // TJSPosition.Animate.fromTo(this.#boxData, createPositionData, createPositionData,
      //  stagger ? createOptionsData : { duration, ease, strategy: 'cancel' });

      /* ---------------- */

      // /**
      //  * Initialized once; you can continuously invoke additional `quickTo` changes.
      //  * This is a trivial demo and the `quickTo` boxes tracked are not refreshed.
      //  */
      // if (!this.#quickTo) { this.#quickTo = TJSPosition.Animate.quickTo(this.#boxData, ['top', 'left']); }

      // this.#quickTo.options({ duration, ease })(createPositionData);

      /* ---------------- */

      // /**
      //  * Direct and independent `fromTo` box animation. Random start / finish.
      //  */
      // for (const entry of this.#boxData)
      // {
      //    entry.position.animate.fromTo({ top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) },
      //     { top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) },
      //      { duration, ease, strategy: 'cancel' });
      // }
   }

   /**
    * Animate the scale / rotation of all boxes randomly.
    *
    * Example of using the `finished` Promise to log to console when animation is done.
    */
   toScaleRot()
   {
      const duration = this.#animData.duration;
      const ease = getGsapEasingFunc(this.#animData.ease);

      // Stagger enabled state and cumulative time.
      const stagger = this.#animData.stagger;

      /**
       * A positional callback invoked for each box in `#boxData` returning a random `scale` / `rotateZ` value.
       *
       * @type {TJSPosition.API.Animation.GroupDataCallback}
       */
      const createPositionData = () => ({ scale: MathRandom.getInt(50, 200) / 100, rotateZ: MathRandom.getInt(0, 360) });

      /**
       * Tween options callback invoked for each box in `#boxData`. This is utilized to implement the stagger capability
       * with the TJSPosition animation API.
       *
       * @type {TJSPosition.API.Animation.GroupTweenOptionsCallback}
       */
      const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

      /** @type {BasicAnimation} */
      const animateScaleRot = TJSPosition.Animate.to(this.#boxData, createPositionData, stagger ? createOptionsData :
       { duration, ease, strategy: 'cancel' });

      // /* Example of cancelling animation after 500ms; the result for the Promise below will show `cancelled` state. */
      // setTimeout(() => animateScaleRot.cancel(), 500);

      // Example of using finished Promise.
      animateScaleRot.finished.then((result) =>
       console.log(`!! Animation Scale / Rotate Finished: ${JSON.stringify(result)}`));
   }
}
