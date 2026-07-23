import { writable }              from 'svelte/store';

import { draggable }             from '#runtime/svelte/store/position';
import { draggableGsap }         from '#runtime/svelte/animate/gsap';

import OptionsDraggable          from './OptionsDraggable.svelte';
import OptionsDraggableGsap      from './OptionsDraggableGsap.svelte';

/** 
 * @import { SvelteComponent }   from 'svelte';
 * 
 * @import { 
 *    Readable, 
 *    Writable }                 from 'svelte/store';
 */

/**
 * Stores the associated Svelte components for manipulating respective draggable options.
 * 
 * @type {Record<string, typeof SvelteComponent<any>}
 */
export const optionComponents = {
  'draggable': OptionsDraggable,
  'draggableGsap': OptionsDraggableGsap,
};

/**
 * Stores respective draggable options stores for easy UI manipulation. The default values match the SvelteApp
 * defaults.
 * 
 * @type {Record<string, Readable<unknown>>}
 */
export const optionStores = {
   'draggable': draggable.options({ tween: true, tweenOptions: { duration: 0.06 } }),
   'draggableGsap': draggableGsap.options({ tween: true, tweenOptions: { duration: 0.06 } }),
};

/**
 * Stores the draggable and draggableGsap options for selection.
 * 
 * @type {Record<string, Function>}
 */
export const optionFnValues = {
   'draggable': draggable,
   'draggableGsap': draggableGsap
};

/**
 * @type {Writable<string>}
 */
export const storeDraggable = writable('draggable');
