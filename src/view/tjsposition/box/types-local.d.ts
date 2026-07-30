import type {
   Readable,
   Writable }                   from 'svelte/store';

import type {
   TJSPositionControlLayerAPI } from '#standard/component/layer/position';

/**
 * Defines the data stored in `boxStore`. Box color and the TJSPositionControlLayer entry association.
 */
export interface BoxData extends TJSPositionControlLayerAPI.Data.EntryInput
{
   /**
    * The CSS color string for the box.
    */
   color: string;

   /**
    * The initial bounds of the box.
    */
   initialBounds: { width: number, height: number };
}

/**
 * Defines the general property box stores
 */
export interface BoxStores
{
   /**
    * Use auto width / height boxes.
    */
   get auto(): Writable<boolean>;

   /**
    * Use debug boxes.
    */
   get debug(): Writable<boolean>;

   /**
    * Show labels for debug boxes.
    */
   get labels(): Writable<boolean>;

   /**
    * Enable position control layer.
    */
   get pclEnabled(): Writable<boolean>;

   /**
    * Enable app window validation.
    */
   get validatorEnabled(): Writable<boolean>;
}
