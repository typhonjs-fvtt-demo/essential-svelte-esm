import type {
   Readable,
   Writable }                 from 'svelte/store';

import type { TJSPosition }   from '#runtime/svelte/store/position';

import type { Merge }         from '#runtime/util/types';

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
    * A unique string or number for `#each` usage in Svelte template.
    */
   id: string | number;

   /**
    * The initial bounds of the box.
    */
   initialBounds: { width: number, height: number };

   /**
    * Position instance controlling box location.
    */
   position: TJSPosition;
}

/**
 * Defines the serialized {@link BoxData} for save state.
 */
export type BoxDataSerialized = Merge<BoxData, { position: Partial<TJSPosition.API.Data.TJSPositionData> }>;

/**
 * Defines the current box control settings / underlying box store data.
 */
export interface BoxStoreData {
   /**
    * Use auto width / height boxes.
    */
   auto: boolean;

   /**
    * Use debug boxes.
    */
   debug: boolean;

   /**
    * Show labels for debug boxes.
    */
   labels: boolean;

   /**
    * Enable app window validation.
    */
   validatorEnabled: boolean;

}

/**
 * Defines the general property box stores
 */
export interface BoxStores
{
   /**
    * Use auto width / height boxes.
    */
   get auto(): Writable<BoxStoreData['auto']>;

   /**
    * Use debug boxes.
    */
   get debug(): Writable<BoxStoreData['debug']>;

   /**
    * Show labels for debug boxes.
    */
   get labels(): Writable<BoxStoreData['labels']>;

   /**
    * Enable app window validation.
    */
   get validatorEnabled(): Writable<BoxStoreData['validatorEnabled']>;
}

/**
 * Defines the save / restore state of all box controls and box positional data.
 */
export interface BoxSaveData {
   /**
    * Serialized box data.
    */
   boxData: BoxDataSerialized[];

   /**
    * State of the box store data.
    */
   boxStoreData: BoxStoreData;
}
