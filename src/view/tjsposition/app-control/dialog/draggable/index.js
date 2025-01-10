import { writable }           from 'svelte/store';

import { draggable }          from '#runtime/svelte/store/position';
import { draggableGsap }      from '#runtime/svelte/animate/gsap';

import OptionsDraggable       from './OptionsDraggable.svelte';
import OptionsDraggableGsap   from './OptionsDraggableGsap.svelte';

/**
 * Stores the associated Svelte components for manipulating respective draggable options.
 */
export const optionComponents = {
  [draggable]: OptionsDraggable,
  [draggableGsap]: OptionsDraggableGsap,
};

/**
 * Stores respective draggable options stores for easy UI manipulation. The default values match the SvelteApp
 * defaults.
 *
 * @type {({
 *    draggable: import('#runtime/svelte/store/position').IDraggableOptions
 *    draggableGsap: import('#runtime/svelte/animate/gsap').IDraggableGsapOptions
 * })}
 */
export const optionStores = {
   [draggable]: draggable.options({ tween: true, tweenOptions: { duration: 0.06 } }),
   [draggableGsap]: draggableGsap.options({ tween: true, tweenOptions: { duration: 0.06 } }),
};

/**
 * Stores the draggable and draggableGsap options for selection.
 */
export const optionValues = {
   draggable,
   draggableGsap
};

export const storeDraggable = writable(draggable);
