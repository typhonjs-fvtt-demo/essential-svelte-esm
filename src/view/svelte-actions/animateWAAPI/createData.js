import { writable }     from 'svelte/store';

import { rippleFocus }  from '#standard/action/animate/composable';

const efxRipple = rippleFocus();

/**
 * Creates all data for various `TJSInput` usage in `AnimateWAAPIAppShell`.
 */
const inputData = {
   duration: {
      type: 'range-number',
      efx: efxRipple,
      min: 100,
      max: 1000,
      step: 1,
      label: 'Duration (ms):',
      readonly: true,
      store: writable(600)
   },

   enabled: {
      type: 'checkbox',
      label: 'Enabled:',
      store: writable(true)
   },

   event: {
      type: 'select',
      efx: efxRipple,
      label: 'Event:',
      options: [
         { value: 'blur' },
         { value: 'click' },
         { value: 'pointerenter' },
         { value: 'pointerleave' }
      ],
      store: writable('click')
   },

   keyframes: {
      type: 'select',
      efx: efxRipple,
      label: 'Keyframes:',
      options: [
         // `value` is required; you can also specify a separate `label`, but if not defined `value` is used for
         // `label`. The label field is localized automatically, so you can provide a `lang` key for `label`.
         { value: 'opacityFade' },
         { value: 'rotate360' }
      ],
      store: writable('rotate360')
   },

   strategy: {
      type: 'select',
      efx: efxRipple,
      label: 'Strategy:',
      options: [
         { value: 'cancel' },
         { value: 'exclusive' }
      ],
      store: writable('cancel')
   }
};

/**
 * Defines the WAAPI keyframe data to use for animating the button.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
 */
const keyframes = {
   opacityFade: [
      { opacity: 1, easing: 'ease-out' },
      { opacity: 0.1, easing: 'ease-in' },
      { opacity: 1 }
   ],

   rotate360: [{ transform: 'rotate(360deg)' }]
};

export { inputData, keyframes };
