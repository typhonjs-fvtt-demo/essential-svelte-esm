import { writable }        from 'svelte/store';

import { propertyStore }   from '@typhonjs-fvtt/runtime/svelte/store';

export class ControlStore
{
   #component;

   #data = writable({
      selected: false
   });

   #position;

   #stores;

   #selected = new Map();

   constructor(component)
   {
      this.#component = component;

      const position = component.position.duplicate();
      position.subscribe((data) => component.position.set({ ...data, immediateElementUpdate: true }));

      this.#position = component.position.duplicate();
      this.#position.subscribe((data) => component.position.set({ ...data, immediateElementUpdate: true }));

      this.#stores = {
         selected: propertyStore(this.#data, 'selected')
      };

      Object.freeze(this.#stores);
   }

   get stores() { return this.#stores; }

   get component() { return this.#component; }

   get id() { return this.#component.id; }

   get position() { return this.#position; }

   /**
    * @returns {boolean} Component selected.
    */
   get selected() { return this.#data.selected; }

   set selected(selected)
   {
      this.#stores.selected.set(selected);
   }
}