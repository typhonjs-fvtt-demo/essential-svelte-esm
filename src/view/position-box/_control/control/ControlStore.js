import { writable }        from 'svelte/store';

import { propertyStore }   from '@typhonjs-fvtt/runtime/svelte/store';

export class ControlStore
{
   #component;

   #data = writable({
      resizing: false,
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

      // To accomplish bidirectional updates Must ignore updates from the control position when set from the
      // target component position.
      let ignoreRoundRobin = false;

      this.#position = component.position.duplicate();

      /**
       * Update component position, but only when ignoring round-robin callback.
       */
      this.#position.subscribe((data) =>
      {
         if (!ignoreRoundRobin)
         {
            component.position.set({ ...data, immediateElementUpdate: true });
         }
      });

      /**
       * Sets the local control position store, but temporarily sets ignoreRoundRobin callback;
       */
      component.position.subscribe((data) =>
      {
         ignoreRoundRobin = true;
         this.#position.set({ ...data, immediateElementUpdate: true });
         ignoreRoundRobin = false;
      });

      this.#stores = {
         resizing: propertyStore(this.#data, 'resizing'),
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