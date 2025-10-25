import { GameSettingArrayObject }   from '#runtime/svelte/store/fvtt/settings/array-object';
import { DynReducerHelper }         from '#runtime/svelte/store/reducer';

import { constants, settings }      from "#constants";
import { gameSettings }             from '#gameSettings';

/**
 * It is best practice to configure and initialize data sources separately from your UI facing components.
 * `ItemArrayStores` automatically configures the reactive `GameSettingArrayObject` stores associated with reactive
 * game settings for both `user` and `world` scope demos.
 */
export class ItemConfiguration
{
   /**
    * @type {GameSettingArrayObject<ItemEntryStore>}
    */
   static #userItemStore;

   /**
    * @type {GameSettingArrayObject<ItemEntryStore>}
    */
   static #worldItemStore;

   /**
    * Provides search filters for both `name` and `category` properties.
    *
    * @type {({
    *    user: DynReducerHelper.FilterFn.regexObjectQuery,
    *    world: DynReducerHelper.FilterFn.regexObjectQuery
    * })}
    */
   static #searchFilters =
   {
      user: DynReducerHelper.filters.regexObjectQuery(['name', 'category']),
      world: DynReducerHelper.filters.regexObjectQuery(['name', 'category'])
   };

   static initialize()
   {
      if (ItemConfiguration.#userItemStore !== void 0) { return; }

      ItemConfiguration.#userItemStore = new GameSettingArrayObject({
         gameSettings,
         namespace: constants.moduleId,
         key: settings.userItemsArray,
         scope: 'user',
         StoreClass: ItemEntryStore,
         dataReducer: true
      });

      ItemConfiguration.#userItemStore.dataReducer.filters.add(ItemConfiguration.#searchFilters.user);

      ItemConfiguration.#worldItemStore = new GameSettingArrayObject({
         gameSettings,
         namespace: constants.moduleId,
         key: settings.worldItemsArray,
         scope: 'world',
         StoreClass: ItemEntryStore,
         dataReducer: true
      });

      ItemConfiguration.#worldItemStore.dataReducer.filters.add(ItemConfiguration.#searchFilters.world);
   }

   /**
    * @param {string}   scope - Setting scope; `user` or `world`.
    *
    * @returns {{ itemContext: ItemContext }} The item context loaded into Svelte components.
    */
   static getContext(scope)
   {
      if (scope !== 'user' && scope !== 'world') { throw new Error(`'scope' must be 'user' or 'world'.`); }

      return {
         itemContext: {
            scope,
            canEdit: ItemConfiguration.#canEdit(scope),
            categories,
            createRandomItem,
            description: ItemConfiguration.#getDescription(scope),
            itemStore: ItemConfiguration.#getStore(scope),
            searchFilter: ItemConfiguration.#getSearchFilter(scope)
         }
      };
   }

   // Internal Implementation ----------------------------------------------------------------------------------------

   /**
    * Can the current user edit / modify the ItemArrayObjectStore for the given scope.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {boolean} Current user edit / modify state.
    */
   static #canEdit(scope)
   {
      switch (scope)
      {
         case 'user':
            return true;
         case 'world':
            return globalThis.game.user.isGM;
      }
   }

   static #getDescription(scope)
   {
      switch (scope)
      {
         case 'user':
            return `User testing`;
         case 'world':
            return `World testing`;
      }
   }

   /**
    * Get the reducer search filter.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {DynReducerHelper.FilterFn.regexObjectQuery}  The associated search filter for the given scope.
    */
   static #getSearchFilter(scope)
   {
      switch (scope)
      {
         case 'user':
            return ItemConfiguration.#searchFilters.user;
         case 'world':
            return ItemConfiguration.#searchFilters.world;
      }
   }

   /**
    * Get the ItemArrayStore for the given game setting scope.
    *
    * @param {'world' | 'user'}  scope - Game setting scope.
    *
    * @returns {ItemArrayObjectStore}  The associated item array object game settings store for the given scope.
    */
   static #getStore(scope)
   {
      switch (scope)
      {
         case 'user':
            return ItemConfiguration.#userItemStore;
         case 'world':
            return ItemConfiguration.#worldItemStore;
      }
   }
}

/**
 * Extends `ObjectEntryStore` which is conveniently exported as `EntryStore`.
 *
 * This provides the store implementation for serialized {@link ItemEntryData} with accessors
 * for the item properties that update the underlying subscribers.
 *
 * @see https://typhonjs-fvtt-lib.github.io/api-docs/classes/_runtime_svelte_store_reducer_array-object.ObjectEntryStore.html
 *
 * @augments GameSettingArrayObject.EntryStore<ItemEntryData>
 */
export class ItemEntryStore extends GameSettingArrayObject.EntryStore
{
   /**
    * @param {Partial<ItemEntryData>}   data - Item data to set.
    */
   set(data)
   {
      if (typeof data.name === 'string') { this._data.name = data.name; }
      if (typeof data.category === 'string') { this._data.category = data.category; }
   }

   /**
    * @returns {string} Item category.
    */
   get category()
   {
      return this._data.category ?? '';
   }

   /**
    * @param {string} category - Item category.
    */
   set category(category)
   {
      if (typeof category === 'string')
      {
         this._data.category = category;
         this._updateSubscribers();
      }
   }

   /**
    * @returns {string} Item name.
    */
   get name()
   {
      return this._data.name ?? '';
   }

   /**
    * @param {string} name - Item name.
    */
   set name(name)
   {
      if (typeof name === 'string')
      {
         this._data.name = name;
         this._updateSubscribers();
      }
   }
}

/**
 * Automatically initialize and register the item array object stores when Foundry is `ready`.
 */
Hooks.once('ready', () => ItemConfiguration.initialize());

// Random data generation --------------------------------------------------------------------------------------------

const categories = [
   'Arcane Trinkets',
   'Cursed Relics',
   'Dungeon Snacks',
   'Heroic Tools',
   'Mystic Home Goods',
   'Royal Fashion'
];

/**
 * @returns {ItemEntryData} Random item.
 */
function createRandomItem()
{
   const adjectives = [
      'Singing', 'Cursed', 'Invisible', 'Dancing', 'Fuming', 'Shimmering', 'Laughing', 'Weeping',
      'Eldritch', 'Enchanted', 'Rusty', 'Glittering', 'Polka-Dotted', 'Slimy', 'Howling', 'Melancholy',
      'Giggling', 'Explosive', 'Sticky', 'Bubbling', 'Haunted', 'Gilded', 'Soggy', 'Irritable', 'Moss-Covered',
      'Frothy', 'Winged', 'Smoldering', 'Hypnotic', 'Drunken', 'Trembling', 'Radiant', 'Sneezing', 'Golden',
      'Ancient', 'Electric', 'Wobbly', 'Mumbling', 'Sparkling', 'Oozing', 'Crooked', 'Gossamer', 'Cranky',
      'Iridescent', 'Spectral', 'Dusty', 'Perpetually-Moist', 'Vexed', 'Hungry', 'Grumpy', 'Fidgeting',
      'Purring', 'Blazing', 'Frozen', 'Squeaking', 'Boiling', 'Tattered', 'Fragrant', 'Snoozing',
      'Unstable', 'Cackling', 'Vorpal', 'Shivering', 'Groaning', 'Cheerful', 'Tarnished', 'Wicked',
      'Ethereal', 'Unseen', 'Burping', 'Warty', 'Sacred', 'Profane', 'Stumbling', 'Whirling', 'Enraged',
      'Mischievous', 'Soporific', 'Radiating', 'Bouncing', 'Sleep-Deprived', 'Jittery', 'Gaseous', 'Cryptic',
      'Sulking', 'Fermented', 'Venomous', 'Blessed', 'Repentant', 'Overcooked', 'Snoring', 'Unhinged',
      'Heroic', 'Suspicious', 'Arcane', 'Vibrating', 'Draconic', 'Noble', 'Miniature', 'Terrified'
   ];

   const nouns = [
      'Teapot', 'Boots', 'Toad', 'Helmet', 'Mirror', 'Goblet', 'Muffin', 'Amulet', 'Lute', 'Cauldron',
      'Ferret', 'Umbrella', 'Broom', 'Trousers', 'Tome', 'Candle', 'Feather', 'Pan', 'Cloak', 'Pumpkin',
      'Key', 'Bell', 'Spoon', 'Gem', 'Mask', 'Slippers', 'Scroll', 'Compass', 'Lantern', 'Ring',
      'Whistle', 'Flask', 'Pillow', 'Sandwich', 'Wig', 'Glove', 'Potato', 'Mushroom', 'Sock', 'Frog',
      'Quill', 'Bootlace', 'Harp', 'Chair', 'Statue', 'Apple', 'Orb', 'Fish', 'Bookend', 'Sausage',
      'Sword', 'Axe', 'Dagger', 'Mace', 'Shield', 'Bow', 'Arrow', 'Spear', 'Hammer', 'Crossbow',
      'Gauntlet', 'Helmet', 'Breastplate', 'Greaves', 'Cuirass', 'Buckler', 'Halberd', 'Flail', 'Staff', 'Katana',
      'Trident', 'Whip', 'Boomerang', 'Morningstar', 'Scythe', 'Wand', 'Saber', 'Glaive', 'Claymore', 'Rapier',
      'Torch', 'Potion', 'Elixir', 'Crystal', 'Relic', 'Totem', 'Idol', 'Horn', 'Chalice', 'Banner',
      'Crown', 'Brooch', 'Chainmail', 'Talisman', 'Cape', 'Horseshoe', 'Pipe', 'Censer', 'Anvil', 'Drum'
   ];

   const category = categories[Math.floor(Math.random() * categories.length)];
   const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
   const noun = nouns[Math.floor(Math.random() * nouns.length)];

   const name = `${adj} ${noun}`;

   return { category, name };
}


/**
 * @typedef {GameSettingArrayObject<ItemEntryStore>} ItemArrayObjectStore Convenience type for item array object store.
 */

/**
 * @typedef {object} ItemContext Defines the `itemContext` object set as external data to the Svelte components.
 *
 * @property {boolean} canEdit - Can the current user edit items?
 *
 * @property {string[]} categories - Item categories.
 *
 * @property {() => ItemEntryData} createRandomItem - Creates random item entry data.
 *
 * @property {string} description - Description based on scope.
 *
 * @property {ItemArrayObjectStore} itemStore - The scoped item store.
 *
 * @property {string} scope - The current scope; `user` or `world`.
 *
 * @property {DynReducerHelper.FilterFn.regexObjectQuery} searchFilter - Search filter / store.
 */

/**
 * @typedef {object} ItemEntryData
 *
 * @property {string} [id] - UUIDv4; automatically assigned.
 *
 * @property {string} category - Item category.
 *
 * @property {string} name - Item name.
 */
