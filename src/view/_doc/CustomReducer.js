import { DynMapReducer } from "@typhonjs-utils/dynamic-reducer";

/**
 * @template {Item} T
 *
 * @augments {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, T>}
 */
export class CustomReducer extends DynMapReducer
{
   /** @override */
   initialize()
   {
      this.sort.set((a, b) => a.name.localeCompare(b.name));
   }
}
