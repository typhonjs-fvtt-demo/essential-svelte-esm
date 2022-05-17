import { writable }           from 'svelte/store';

import { draggable }          from '@typhonjs-fvtt/runtime/svelte/action';
import { draggableGsap }      from '@typhonjs-fvtt/runtime/svelte/gsap';

import DraggableOptions       from './DraggableOptions.svelte';
import DraggableGsapOptions   from './DraggableGsapOptions.svelte';

export const optionComponents = {
  [draggable]: DraggableOptions,
  [draggableGsap]: DraggableGsapOptions,
};

export const optionStores = {
   [draggable]: draggable.options(),
   [draggableGsap]: draggableGsap.options(),
};

export const optionValues = {
   draggable,
   draggableGsap
};

export const storeDraggable = writable(draggable);
