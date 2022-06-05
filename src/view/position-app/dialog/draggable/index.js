import { writable }           from 'svelte/store';

import { draggable }          from '@typhonjs-fvtt/runtime/svelte/action';
import { draggableGsap }      from '@typhonjs-fvtt/runtime/svelte/gsap';

import OptionsDraggable       from './OptionsDraggable.svelte';
import OptionsDraggableGsap   from './OptionsDraggableGsap.svelte';

export const optionComponents = {
  [draggable]: OptionsDraggable,
  [draggableGsap]: OptionsDraggableGsap,
};

export const optionStores = {
   [draggable]: draggable.options({ ease: true }),
   [draggableGsap]: draggableGsap.options({ ease: true }),
};

export const optionValues = {
   draggable,
   draggableGsap
};

export const storeDraggable = writable(draggable);
