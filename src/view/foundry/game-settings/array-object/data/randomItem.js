export const categories = [
   'Arcane Trinkets',
   'Cursed Relics',
   'Dungeon Snacks',
   'Heroic Tools',
   'Mystic Home Goods',
   'Royal Fashion'
];

/**
 * @returns {import('#itemArrayStores').ItemEntryData} Random item.
 */
export function getRandomItem()
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
