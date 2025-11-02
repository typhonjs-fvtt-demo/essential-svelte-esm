/**
 * Provides `ItemEntryData` creation of randomized whimsical mock items for the game setting array object demo.
 */
export class ItemGenerator
{
   /**
    * @returns {Readonly<string[]>} Item categories.
    */
   static get categories()
   {
      return this.#categories;
   }

   /**
    * @returns {import('#arrayObjectContext').ItemEntryData} Random item data.
    */
   static createRandom()
   {
      const category = this.#categories[Math.floor(Math.random() * this.#categories.length)];
      const adj = this.#adjectives[Math.floor(Math.random() * this.#adjectives.length)];
      const noun = this.#nouns[Math.floor(Math.random() * this.#nouns.length)];

      const name = `${adj} ${noun}`;

      return { category, name, cost: this.#generateCurrency() };
   }

   // Internal Implementation ----------------------------------------------------------------------------------------

   /**
    * Generate a realistic D&D 5e-style currency string.
    *
    * Typical ratios:
    *   1 pp = 10 gp = 100 sp = 1000 cp
    *
    * Value ranges chosen for believable game economy.
    *
    * @returns {string} Item cost.
    */
   static #generateCurrency()
   {
      const denominations = [
         { unit: 'cp', max: 100, weight: 3 },
         { unit: 'sp', max: 50,  weight: 2.5 },
         { unit: 'gp', max: 20,  weight: 2.5 },
         { unit: 'pp', max: 10,  weight: 2 },
      ];

      // Weighted random pick (copper most common, platinum rarest)
      const totalWeight = denominations.reduce((a, d) => a + d.weight, 0);
      let roll = Math.random() * totalWeight;
      let selected = denominations[0];

      for (const denom of denominations)
      {
         if (roll < denom.weight)
         {
            selected = denom;
            break;
         }
         roll -= denom.weight;
      }

      const amount = Math.floor(Math.random() * selected.max) + 1;
      return `${amount} ${selected.unit}`;
   }

   static #adjectives = [
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

   static #categories = Object.freeze([
      'Arcane Trinkets',
      'Cursed Relics',
      'Dungeon Snacks',
      'Heroic Tools',
      'Mystic Home Goods',
      'Royal Fashion'
   ]);

   static #nouns = [
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
}
