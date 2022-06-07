import { writable }        from 'svelte/store';

import { propertyStore }   from '@typhonjs-fvtt/runtime/svelte/store';

import { ControlStore }    from '../control/ControlStore.js';

export class ControlsStore
{
   #controls = [];

   #controlMap = new Map();

   #data = writable({
      enabled: false
   });

   #selectedMap = new Map();

   #selectedAPI = new SelectedAPI(this.#selectedMap);

   #stores;

   /**
    * Stores the subscribers.
    *
    * @type {(function(PositionData): void)[]}
    */
   #subscriptions = [];

   constructor()
   {
      this.#stores = {
         enabled: propertyStore(this.#data, 'enabled')
      };

      Object.freeze(this.#stores);
   }

   get enabled() { return this.#data.enabled; }

   /**
    * @returns {SelectedAPI} Selected API
    */
   get selected() { return this.#selectedAPI; }

   /**
    * @returns {*} Stores.
    */
   get stores() { return this.#stores; }

   set enabled(enabled) { this.#stores.enabled.set(enabled); }

   /**
    * @returns {IterableIterator<any>} Keys for all controls.
    */
   keys()
   {
      return this.#controlMap.keys();
   }

   updateComponents(components)
   {
      const controlMap = this.#controlMap;
      const selectedMap = this.#selectedMap;

      const removeIDs = new Set(controlMap.keys());

      for (const component of components)
      {
         if (controlMap.has(component.id))
         {
            removeIDs.delete(component.id);
            continue;
         }

         controlMap.set(component.id, new ControlStore(component));
      }

      for (const id of removeIDs)
      {
         selectedMap.delete(id);
         controlMap.delete(id);
      }

      this.#controls = [...controlMap.values()];

      this.#updateSubscribers();
   }

   /**
    * @returns {IterableIterator<any>} All controls.
    */
   values()
   {
      return this.#controlMap.values();
   }

// -------------------------------------------------------------------------------------------------------------------

   #updateSubscribers()
   {
      const subscriptions = this.#subscriptions;

      // Early out if there are no subscribers.
      if (subscriptions.length > 0)
      {
         for (let cntr = 0; cntr < subscriptions.length; cntr++) { subscriptions[cntr](this.#controls); }
      }
   }

   /**
    *
    * @param {function(ControlStore[]): void} handler - Callback function that is invoked on update / changes.
    *
    * @returns {(function(): void)} Unsubscribe function.
    */
   subscribe(handler)
   {
      this.#subscriptions.push(handler); // add handler to the array of subscribers

      handler(this.#controls);           // call handler with current value

      // Return unsubscribe function.
      return () =>
      {
         const index = this.#subscriptions.findIndex((sub) => sub === handler);
         if (index >= 0) { this.#subscriptions.splice(index, 1); }
      };
   }
}

class SelectedAPI
{
   /**
    * @type {Map<*, object>}
    */
   #selectedMap;

   constructor(selectedMap)
   {
      this.#selectedMap = selectedMap;
   }

   add(control)
   {
      this.#selectedMap.set(control.id, control);
      control.selected = true;
   }

   clear()
   {
      for (const control of this.#selectedMap.values()) { control.selected = false; }
      this.#selectedMap.clear();
   }

   /**
    * @returns {IterableIterator<[*, Object]>} Selected control entries iterator.
    */
   entries()
   {
      return this.#selectedMap.entries();
   }

   /**
    * @returns {IterableIterator<Object>} Selected controls iterator.
    */
   values()
   {
      return this.#selectedMap.values();
   }

   /**
    * @returns {IterableIterator<*>} Selected control keys iterator.
    */
   keys()
   {
      return this.#selectedMap.keys();
   }

   remove(control)
   {
      if (this.#selectedMap.delete(control.id)) { control.selected = false; }
   }

   set(control)
   {
      // Remove this control from the selected set.
      this.#selectedMap.delete(control.id);

      // Set all other selected controls to false.
      for (const entry of this.#selectedMap.values()) { entry.selected = false; }

      this.#selectedMap.clear();

      this.#selectedMap.set(control.id, control);

      control.selected = true;
   }
}