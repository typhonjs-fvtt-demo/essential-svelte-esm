import { writable }        from 'svelte/store';

import { propertyStore }   from '@typhonjs-fvtt/runtime/svelte/store';

export class ControlStore
{
   #component;

   #data = writable({
      isPrimary: false,
      resizing: false,
      selected: false
   });

   #position;

   #stores;

   constructor(component)
   {
      this.#component = component;

      // To accomplish bidirectional updates Must ignore updates from the control position when set from the
      // target component position.
      let ignoreRoundRobin = false;

      // TODO duplicate to take additional options or perhaps a copy constructor is better.
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
         isPrimary: propertyStore(this.#data, 'isPrimary'),
         resizing: propertyStore(this.#data, 'resizing'),
         selected: propertyStore(this.#data, 'selected')
      };

      Object.freeze(this.#stores);
   }

   get component() { return this.#component; }

   get id() { return this.#component.id; }

   get position() { return this.#position; }

   get stores() { return this.#stores; }

   set isPrimary(isPrimary)
   {
      this.#stores.isPrimary.set(isPrimary);
   }

   set resizing(resizing)
   {
      this.#stores.resizing.set(resizing);
   }

   set selected(selected)
   {
      this.#stores.selected.set(selected);
   }
}