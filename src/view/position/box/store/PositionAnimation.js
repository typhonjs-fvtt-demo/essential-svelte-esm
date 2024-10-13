import { MathRandom }         from '#runtime/math/util';
import { getGsapEasingFunc }  from '#runtime/svelte/animate/gsap';
import { TJSPosition }        from '#runtime/svelte/store/position';

/**
 * Controls built-in TJSPosition animation. The built-in animation capabilities provide all essential tweening
 * operations and is completely independent of GSAP or other animation libraries. The built-in animation performance is
 * about 33% faster than GSAP.
 */
export class PositionAnimation
{
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

      const duration = this.#animData.duration;
      const ease = getGsapEasingFunc(this.#animData.ease);

      // Stagger enabled state and cumulative time.
      const stagger = this.#animData.stagger;

      const createPositionData = () => ({ top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) });
      const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

      TJSPosition.Animate.to(this.#boxData, createPositionData, stagger ? createOptionsData :
       { duration, ease, strategy: 'cancel' });

      // The following are commented out examples of other animation capabilities such as `from`, `fromTo`, `quickTo`.

      // TJSPosition.Animate.from(this.#boxData, createPositionData, stagger ? createOptionsData :
      //  { duration, ease, strategy: 'cancel' });

      // TJSPosition.Animate.fromTo(this.#boxData, createPositionData, createPositionData,
      //  stagger ? createOptionsData : { duration, ease, strategy: 'cancel' });

      // if (!quickTo) { quickTo = TJSPosition.Animate.quickTo(this.#boxData, ['top', 'left']); }
      //
      // quickTo.options({ duration, ease })(createPositionData);

      // for (const entry of data)
      // {
      //    entry.position.animate.fromTo({ top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) }, { top: MathRandom.getInt(0, height), left: MathRandom.getInt(0, width) }, { duration, ease, strategy: 'cancel' });
      // }
   }

   /**
    * Animate the scale / rotation of all boxes randomly.
    */
   toScaleRot()
   {
      const duration = this.#animData.duration;
      const ease = getGsapEasingFunc(this.#animData.ease);

      // Stagger enabled state and cumulative time.
      const stagger = this.#animData.stagger;

      const createPositionData = () => ({ scale: MathRandom.getInt(50, 200) / 100, rotateZ: MathRandom.getInt(0, 360) });
      const createOptionsData = ({ index }) => ({ delay: index * 0.1, duration, ease });

      /** @type {import('#runtime/util/animate').BasicAnimation} */
      const animateScaleRot = TJSPosition.Animate.to(this.#boxData, createPositionData, stagger ? createOptionsData :
       { duration, ease, strategy: 'cancel' });

      // Example of cancelling animation after 500ms; the result for the Promise below will show `cancelled` state.
      // setTimeout(() => animateScaleRot.cancel(), 500);

      // Example of using finished Promise.
      animateScaleRot.finished.then((result) =>
       console.log(`!! Animation Scale / Rotate Finished: ${JSON.stringify(result)}`));
   }
}
