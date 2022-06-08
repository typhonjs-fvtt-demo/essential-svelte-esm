import { writable }        from 'svelte/store';

import { propertyStore }   from '@typhonjs-fvtt/runtime/svelte/store';

import { ControlStore }    from '../control/ControlStore.js';

export class ControlsStore
{
   #controls = [];

   /**
    * @type {Map<*, ControlStore>}
    */
   #controlMap = new Map();

   #data = writable({
      enabled: false
   });

   /**
    * @type {Map<*, ControlStore>}
    */
   #selectedMap = new Map();

   #selectedAPI = new SelectedAPI(this.#selectedMap);

   #stores;

   /**
    * Stores the subscribers.
    *
    * @type {(function(ControlStore[]): void)[]}
    */
   #subscriptions = [];

   constructor()
   {
      this.#stores = {
         enabled: propertyStore(this.#data, 'enabled')
      };

      Object.freeze(this.#stores);
   }

   /**
    * @returns {SelectedAPI} Selected API
    */
   get selected() { return this.#selectedAPI; }

   /**
    * @returns {*} Stores.
    */
   get stores() { return this.#stores; }

   /**
    * @param {boolean}  enabled - New enabled state.
    */
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
      const selected = this.#selectedAPI;

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
         selected.removeById(id);
         controlMap.delete(id);
      }

      this.#controls = [...controlMap.values()];

      this.#updateSubscribers();
   }

   /**
    * @returns {IterableIterator<ControlStore>} All controls.
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
    * @type {Map<*, ControlStore>}
    */
   #selectedMap;

   /**
    * @type {ControlStore}
    */
   #primaryControl;

   /**
    * @param {Map<*, ControlStore>} selectedMap - Main store selected map.
    */
   constructor(selectedMap)
   {
      this.#selectedMap = selectedMap;
   }

   /**
    * @param {ControlStore}   control - A control store.
    */
   add(control)
   {
      this.#selectedMap.set(control.id, control);

      if (this.#primaryControl)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      this.#primaryControl = control;
      control.isPrimary = true;
      control.selected = true;
   }

   clear()
   {
      if (this.#primaryControl)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      for (const control of this.#selectedMap.values()) { control.selected = false; }
      this.#selectedMap.clear();
   }

   /**
    * @returns {IterableIterator<[*, ControlStore]>} Selected control entries iterator.
    */
   entries()
   {
      return this.#selectedMap.entries();
   }

   /**
    * @returns {ControlStore} The primary control store.
    */
   getPrimary()
   {
      return this.#primaryControl;
   }

   /**
    * @returns {IterableIterator<*>} Selected control keys iterator.
    */
   keys()
   {
      return this.#selectedMap.keys();
   }

   /**
    * @param {ControlStore}   control - A control store.
    */
   remove(control)
   {
      if (this.#primaryControl === control)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      if (this.#selectedMap.delete(control.id)) { control.selected = false; }
   }

   /**
    * @param {*}   controlId - An ID for a control store to remove.
    */
   removeById(controlId)
   {
      if (this.#primaryControl?.id === controlId)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      const control = this.#selectedMap.get(controlId);

      if (control)
      {
         control.selected = false;
         this.#selectedMap.delete(controlId);
      }
   }

   /**
    * @param {ControlStore}   control - A control store.
    */
   set(control)
   {
      if (this.#primaryControl && this.#primaryControl !== control)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      // Remove this control from the selected set.
      this.#selectedMap.delete(control.id);

      // Set all other selected controls to false.
      for (const entry of this.#selectedMap.values()) { entry.selected = false; }

      this.#selectedMap.clear();

      this.#selectedMap.set(control.id, control);

      this.#primaryControl = control;
      control.isPrimary = true;

      control.selected = true;
   }

   setPrimary(control)
   {
      if (this.#primaryControl && this.#primaryControl !== control)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      this.#primaryControl = control;
      control.isPrimary = true;
   }

   /**
    * @returns {IterableIterator<Object>} Selected controls iterator.
    */
   values()
   {
      return this.#selectedMap.values();
   }
}