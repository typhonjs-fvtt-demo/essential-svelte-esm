import { writable } from 'svelte/store';

import * as easings from 'svelte/easing';

/**
 * Defines the stores shared between TJSInput components and TJSSideSlideLayer.
 *
 * @type {object}
 */
export const stores = {
   allowLocking: writable(true),
   clickToOpen: writable(false),
   duration: writable(200),
   easingIn: writable(easings.linear),
   easingOut: writable(easings.linear),
   side: writable('right'),
   top: writable(40)
};

/**
 * Defines the data for all TJSInput components in the demo UI.
 *
 * @type {object}
 */
export const inputs = {
   allowLocking: {
      type: 'checkbox',
      label: 'Allow locking:',
      store: stores.allowLocking
   },

   clickToOpen: {
      type: 'checkbox',
      label: 'Click to open:',
      store: stores.clickToOpen
   },

   duration: {
      type: 'range',
      label: 'Duration:',
      min: 200,
      max: 1000,
      store: stores.duration
   },

   easingIn: {
      type: 'select',
      label: 'Easing In:',
      options: Object.keys(easings).map((key) => ({ value: easings[key], label: key })),
      store: stores.easingIn
   },

   easingOut: {
      type: 'select',
      label: 'Easing Out:',
      options: Object.keys(easings).map((key) => ({ value: easings[key], label: key })),
      store: stores.easingOut
   },

   side: {
      type: 'select',
      label: 'Side:',
      options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }],
      store: stores.side
   },

   top: {
      type: 'range',
      label: 'Top (vertical position):',
      min: 40,
      max: 250,
      store: stores.top
   },
};
