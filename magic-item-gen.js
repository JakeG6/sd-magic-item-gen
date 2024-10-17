function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function chooseMagicItemType(selectedBonus) {
    console.log("Selected bonus:", selectedBonus);
    const itemTypes = [
        "armor",
        "potion",
        "scroll",
        "utility",
        "clothing",
        "wand",
        "weapon"
    ];

    const roll = rollDie(7);
    const type = itemTypes[roll - 1];

    // Ensure selectedBonus is a number
    selectedBonus = Number(selectedBonus);

    const generatedItem = {
        totalBonus: selectedBonus, // Use the passed-in bonus
        prefix: "",
        suffix: "",
        itemType: type,
        itemSlot: "",
        baseItem: "",
        affixBonuses: []
    };

    if (type === "weapon" || type === "armor" || type === "clothing") {
        return generatePermanentItem(generatedItem);
    }
    else {
        return chooseMagicItemType(selectedBonus); // Pass the selectedBonus in the recursive call
    }
}

function generatePermanentItem(generatedItem) {
    if (generatedItem.itemType === "weapon") {
        generatedItem.baseItem = determineWeaponType();
        // Determine the item slot based on the weapon type
        if (generatedItem.baseItem === "Arrows" || generatedItem.baseItem === "Crossbow Bolts") {
            generatedItem.itemType = "ammunition";
            generatedItem.itemSlot = "Quiver";
        } else {
            generatedItem.itemSlot = "Weapon";
        }
        // Remove this line: generatedItem.totalBonus = determineWeaponBonus();
    }

    if (generatedItem.itemType === "armor") {
        generatedItem.baseItem = determineArmorType();
        // Determine the item slot based on the armor type
        if (generatedItem.baseItem === "Shield") {
            generatedItem.itemSlot = "Shield";
        } else {
            generatedItem.itemSlot = "Armor";
        }
        // Remove this line: generatedItem.totalBonus = determineArmorBonus();
    }

    if (generatedItem.itemType === "clothing") {
        generatedItem.baseItem = determineClothingType();
        // Determine the item slot based on the clothing type
        if (["Goggles", "Lenses", "Spectacles", "Third Eye"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Face";
        }
        if (["Amulet", "Badge", "Brooch", "Collar", "Medal", "Medallion", "Necklace", "Pendant", "Periapt", "Scarab", "Scarf", "Torc"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Throat";
        }
        if (["Gauntlet", "Gloves"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Hands";
        }
        if (["Circlet", "Crown", "Hat", "Headband", "Helmet", "Phylactery"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Head";
        }
        if (["Cape", "Cloak", "Mantle", "Shawl"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Shoulders";
        }
        if (["Boots", "Sandals", "Shoes", "Slippers"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Feet";
        }
        if (["Belt", "Girdle", "Sash"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Waist";
        }
        if (["Shirt", "Tunic", "Vest","Vestment",].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Torso";
        }
        if (["Armband", "Bracelet", "Bracer"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Arms";
        }
        if (["Ring"].includes(generatedItem.baseItem)) {
            generatedItem.itemSlot = "Rings";
        }
        // Remove this line if it exists: generatedItem.totalBonus = determineArmorBonus();
    }

    generateAffixes(generatedItem);

    return generatedItem;
}

function determineWeaponBonus() {
    const roll = rollDie(6) + rollDie(6);
    if (roll <= 3) return 0;
    if (roll <= 9) return 1;
    if (roll <= 11) return 2;
    return 3;
}

function determineArmorBonus() {
    const roll = rollDie(6) + rollDie(6);
    if (roll <= 5) return 0;
    if (roll <= 9) return 1;
    if (roll <= 11) return 2;
    return 3;
}

function determineArmorType() {
    const roll = rollDie(12);
    const armorTypes = [
        { range: [1, 2, 3, 4, 5], type: "Leather Armor" },
        { range: [6, 7], type: "Chainmail" },
        { range: [8, 9], type: "Shield" },
        { range: [10, 11], type: "Plate Mail" },
        { range: [12], type: "Mithral" }
    ];

    let armorType = armorTypes.find(a => a.range.includes(roll)).type;
    
    if (armorType === "Mithral") {
        // Reroll for Mithral
        const reroll = rollDie(11);
        armorType = "Mithral " + armorTypes.find(a => a.range.includes(reroll)).type;
    }

    return armorType;
}

function determineClothingType() {
    const roll = rollDie(42);
    const clothingTypes = [
        "Goggles",
        "Lenses",
        "Spectacles",
        "Third Eye",
        "Amulet",
        "Badge",
        "Brooch",
        "Collar",
        "Medal",
        "Medallion",
        "Necklace",
        "Pendant",
        "Periapt",
        "Scarab",
        "Scarf",
        "Torc",
        "Gauntlet",
        "Gloves",
        "Belt",
        "Girdle",
        "Sash",
        "Boots",
        "Sandals",
        "Shoes",
        "Slippers",
        "Circlet",
        "Crown",
        "Hat",
        "Headband",
        "Helmet",
        "Phylactery",
        "Cape",
        "Cloak",
        "Mantle",
        "Shawl",
        "Shirt",
        "Tunic",
        "Vest",
        "Vestment",
        "Armband",
        "Bracelet",
        "Bracer",
        "Ring"
    ];

    return clothingTypes[roll - 1];
}


function determineWeaponType() {
    const roll = rollDie(20);
    const weaponTypes = [
        { range: [1], type: "Arrows" },
        { range: [2, 3], type: "Bastard sword" },
        { range: [4], type: "Club" },
        { range: [5], type: "Crossbow" },
        { range: [6], type: "Crossbow bolts" },
        { range: [7, 8], type: "Dagger" },
        { range: [9], type: "Greataxe" },
        { range: [10], type: "Greatsword" },
        { range: [11], type: "Javelin" },
        { range: [12], type: "Longbow" },
        { range: [13, 14], type: "Longsword" },
        { range: [15], type: "Mace" },
        { range: [16], type: "Shortbow" },
        { range: [17, 18], type: "Shortsword" },
        { range: [19], type: "Staff" },
        { range: [20], type: "Warhammer" }
    ];

    return weaponTypes.find(w => w.range.includes(roll)).type;
}

const tier1Spells = [
    "Alarm",
    "Burning hands",
    "Charm person",
    "Detect magic",
    "Feather fall",
    "Floating disk",
    "Hold portal",
    "Light",
    "Mage armor",
    "Magic missile",
    "Protection from evil",
    "Sleep"
];

const tier1Miracles = [
    "Cure Wounds",
    "Holy Weapon",
    "Light",
    "Protection From Evil",
    "Shield of Faith",
    "Turn Undead"
];

const tier2Spells = [
    "Acid arrow",
    "Alter self",
    "Detect thoughts",
    "Fixed object",
    "Hold person",
    "Invisibility",
    "Knock",
    "Levitate",
    "Mirror image",
    "Misty step",
    "Silence",
    "Web"
];

const tier2Miracles = [
    "Augury",
    "Bless",
    "Blind/Deafen",
    "Cleansing Weapon",
    "Smite",
    "Zone of Truth"
];

const tier3Spells = [
    "Animate Dead",
    "Dispel Magic",
    "Fabricate",
    "Fireball",
    "Fly",
    "Gaseous Form",
    "Illusion",
    "Lightning Bolt",
    "Magic Circle",
    "Protection from Energy",
    "Sending",
    "Speak with Dead"
];

const tier3Miracles = [
    "Command",
    "Lay To Rest",
    "Mass Cure",
    "Rebuke Unholy",
    "Restoration",
    "Speak With Dead"
];


const tier4Spells = [
    "Arcane Eye",
    "Cloudkill",
    "Confusion",
    "Control Water",
    "Dimension Door",
    "Divination",
    "Passwall",
    "Polymorph",
    "Resilient Sphere",
    "Stoneskin",
    "Telekinesis",
    "Wall of Force"
];

const tier4Miracles = [
    "Commune",
    "Control Water",
    "Flame Strike",
    "Pillar of Salt",
    "Regenerate",
    "Wrath"
];

const tier5Spells = [
    "Antimagic Shell",
    "Create Undead",
    "Disintegrate", 
    "Hold Monster",
    "Plane Shift",
    "Power Word Kill",
    "Prismatic Orb",
    "Scrying",
    "Shapechange",
    "Summon Extraplanar",
    "Teleport",
    "Wish"
];

const tier5Miracles = [
    "Divine Vengeance",
    "Dominion",
    "Heal",
    "Judgment",
    "Plane Shift",
    "Prophecy"
];


const randomTier1Spell = tier1Spells[Math.floor(Math.random() * tier1Spells.length)];
const randomTier2Spell = tier2Spells[Math.floor(Math.random() * tier2Spells.length)];
const randomTier3Spell = tier3Spells[Math.floor(Math.random() * tier3Spells.length)];
const randomTier4Spell = tier4Spells[Math.floor(Math.random() * tier4Spells.length)];
const randomTier5Spell = tier5Spells[Math.floor(Math.random() * tier5Spells.length)];

const randomTier1Miracle = tier1Miracles[Math.floor(Math.random() * tier1Miracles.length)];
const randomTier2Miracle = tier2Miracles[Math.floor(Math.random() * tier2Miracles.length)];
const randomTier3Miracle = tier3Miracles[Math.floor(Math.random() * tier3Miracles.length)];
const randomTier4Miracle = tier4Miracles[Math.floor(Math.random() * tier4Miracles.length)];
const randomTier5Miracle = tier5Miracles[Math.floor(Math.random() * tier5Miracles.length)];

const itemAffixes = [
  {prefix: "+1", suffix: "the warrior", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1 to attack and damage rolls"},
  {prefix: "+2", suffix: "the knight", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+2 to attack and damage rolls"},
  {prefix: "+3", suffix: "the hero", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+3 to attack and damage rolls"},
  {prefix: "flaming", suffix: "fire", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 fire damage"},
  {prefix: "freezing", suffix: "cold", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 cold damage"},
  {prefix: "poisonous", suffix: "poison", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 poison damage"},
  {prefix: "acidic", suffix: "acidity", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 acid damage"},
  {prefix: "lightning", suffix: "lightning", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 lightning damage"},
  {prefix: "psychic", suffix: "psychokinesis", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 psychic damage"},
  {prefix: "necrotic", suffix: "necrosis", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 necrotic damage"},
  {prefix: "radiant", suffix: "radiance", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 radiant damage"},
  {prefix: "thunderous", suffix: "thunder", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d4 thunder damage"},
  {prefix: "greater flaming", suffix: "greater fire", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 fire damage"},
  {prefix: "greater freezing", suffix: "greater cold", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 cold damage"},
  {prefix: "greater lightning", suffix: "greater lightning", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 lightning damage"},
  {prefix: "greater poisonous", suffix: "greater poison", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 poison damage"},
  {prefix: "greater acidic", suffix: "greater acidity", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 acid damage"},
  {prefix: "greater psychic", suffix: "greater psychokinesis", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 psychic damage"},
  {prefix: "greater necrotic", suffix: "greater necrosis", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 necrotic damage"},
  {prefix: "greater radiant", suffix: "greater radiance", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 radiant damage"},
  {prefix: "greater thunderous", suffix: "greater thunder", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d8 thunder damage"},
  {prefix: "supreme flaming", suffix: "supreme fire", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 fire damage"},
  {prefix: "supreme freezing", suffix: "supreme cold", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 cold damage"},
  {prefix: "supreme shocking", suffix: "supreme lightning", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 lightning damage"},
  {prefix: "supreme poisonous", suffix: "supreme poison", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 poison damage"},
  {prefix: "supreme acidic", suffix: "supreme acidity", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 acid damage"},
  {prefix: "supreme lightning", suffix: "supreme lightning", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 electric damage"},
  {prefix: "supreme psychic", suffix: "supreme psychokinesis", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 psychic damage"},
  {prefix: "supreme necrotic", suffix: "supreme necrosis", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 necrotic damage"},
  {prefix: "supreme radiant", suffix: "supreme radiance", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 radiant damage"},
  {prefix: "supreme thunderous", suffix: "supreme thunder", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "+1d12 thunder damage"},
    {prefix: "vampiric", suffix: "vampirism", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "wielder recovers up to 2 hit points from damage dealt"},
    {prefix: "greater vampiric", suffix: "greater vampirism", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "wielder recovers up to 4 hit points from damage dealt"},
    {prefix: "supreme vampiric", suffix: "supreme vampirism", itemTypes: ["weapon", "ammunition"], bonus: 3, bonusType: "wielder recovers up to 6 hit points from damage dealt"},
    {prefix: "merciless", suffix: "mercilessness", itemTypes: ["weapon", "ammunition"], bonus: 1, bonusType: "+1d8 weapon damage to opponents at 50% HP or lower"},
    {prefix: "sadistic", suffix: "the sadist", itemTypes: ["weapon", "ammunition"], bonus: 2, bonusType: "+1d12 weapon damage to opponents at 50% HP or lower"},
    {prefix: "parrying", suffix: "parrying", itemTypes: ["weapon"], bonus: 2, bonusType: "+1 AC while wielding this weapon"},
    {prefix: "greater parrying", suffix: "greater parrying", itemTypes: ["weapon"], bonus: 3, bonusType: "+2 AC while wielding this weapon"},
    {prefix: "speeding", suffix: "speed", itemTypes: ["weapon"], bonus: 3, bonusType: "You may make an extra attack with this weapon"},
    {prefix: "keen", suffix: "keenness", itemTypes: ["weapon, ammunition"], bonus: 1, bonusType: "This weapon or ammunition scores a critical hit on a roll of 19 or 20"},
    {prefix: "greater keen", suffix: "greater keenness", itemTypes: ["weapon, ammunition"], bonus: 2, bonusType: "This weapon or ammunition scores a critical hit on a roll of 18-20"},
    {prefix: "supreme keen", suffix: "supreme keenness", itemTypes: ["weapon, ammunition"], bonus: 3, bonusType: "This weapon or ammunition scores a critical hit on a roll of 17-20"},
  



    //cursed AC affixes
    {prefix: "-1", suffix: "vulnerability", itemTypes: ["armor", "clothing", "shield"], bonus: -1, bonusType: "-1 to AC"},
    {prefix: "-2", suffix: "greater vulnerability", itemTypes: ["armor", "clothing", "shield"], bonus: -2, bonusType: "-2 to AC"},
    {prefix: "-3", suffix: "supreme vulnerability", itemTypes: ["armor", "clothing", "shield"], bonus: -3, bonusType: "-3 to AC"},

    //CURSED ability score affixes
    {prefix: "feeble", suffix: "feebleness", itemTypes: ["armor", "clothing"], bonus: -2, bonusType: "-2 to strength"},
    {prefix: "clumsy", suffix: "clumsiness", itemTypes: ["armor", "clothing"], bonus: -2, bonusType: "-2 to dexterity"},
    {prefix: "sickly", suffix: "sickness", itemTypes: ["armor", "clothing"], bonus: -2, bonusType: "-2 to constitution"},
    {prefix: "stupefying", suffix: "stupefaction", itemTypes: ["armor", "clothing"], bonus: -2, bonusType: "-2 to intelligence"},
    {prefix: "ignorant", suffix: "ignorance", itemTypes: ["armor", "clothing"], bonus: -2, bonusType: "-2 to wisdom"},
    {prefix: "arrogant", suffix: "arrogance", itemTypes: ["armor", "clothing"], bonus: -2, bonusType: "-2 to charisma"},

    //cursed weapon affixes
    {prefix: "-1", suffix: "a curse", itemTypes: ["weapon", "ammunition"], bonus: -1, bonusType: "-1 to attack and damage rolls"},
    {prefix: "-2", suffix: "a greater curse", itemTypes: ["weapon", "ammunition"], bonus: -2, bonusType: "-2 to attack and damage rolls"},
    {prefix: "-3", suffix: "a supreme curse", itemTypes: ["weapon", "ammunition"], bonus: -3, bonusType: "-3 to attack and damage rolls"},

    {prefix: "+1", suffix: "the sturdy", itemTypes: ["armor", "clothing", "shield"], bonus: 1, bonusType: "+1 to AC"},
    {prefix: "+2", suffix: "the strong", itemTypes: ["armor", "clothing", "shield"], bonus: 2, bonusType: "+2 to AC"},
    {prefix: "+3", suffix: "the valiant", itemTypes: ["armor", "clothing", "shield"], bonus: 3, bonusType: "+3 to AC"},

    {prefix: "deflecting", suffix: "deflection", itemTypes: ["armor", "clothing", "shield"], bonus: 1, bonusType: "+2 to AC versus ranged attacks"},
    {prefix: "greater deflecting", suffix: "greater deflection", itemTypes: ["armor", "clothing", "shield"], bonus: 2, bonusType: "+4 to AC versus ranged attacks"},
    {prefix: "supreme deflecting", suffix: "supreme deflection", itemTypes: ["armor", "clothing", "shield"], bonus: 3, bonusType: "+6 to AC versus ranged attacks"},
    //saving throw affixes
  {prefix: "resistant", suffix: "resistance", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to strength checks to avoid harm"},
  {prefix: "reflexive", suffix: "reflex", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to dexterity checks to avoid harm"},
  {prefix: "fortified", suffix: "fortitude", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to constitution checks to avoid harm"},
  {prefix: "outsmarting", suffix: "outsmarting", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to intelligence checks to avoid harm"},
  {prefix: "principled", suffix: "principle", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to wisdom checks to avoid harm"},
  {prefix: "egotistical", suffix: "ego", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to charisma checks to avoid harm"},
  {prefix: "greater resistant", suffix: "greater resistance", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to strength checks to avoid harm"},
  {prefix: "greater reflexive", suffix: "greater reflex", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to dexterity checks to avoid harm"},
  {prefix: "greater fortified", suffix: "greater fortitue", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to constitution checks to avoid harm"},
  {prefix: "greater outsmarting", suffix: "greater outsmarting", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to intelligence checks to avoid harm"},
  {prefix: "greater principled", suffix: "greater principle", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to wisdom checks to avoid harm"},
  {prefix: "greater egotistical", suffix: "greater ego", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to charisma checks to avoid harm"},
  {prefix: "supreme resistant", suffix: "supreme strength", itemTypes: ["armor", "clothing"], bonus: 3, bonusType: "+3 to strength checks to avoid harm"},
  {prefix: "supreme reflexive", suffix: "supreme dexterity", itemTypes: ["armor", "clothing"], bonus: 3, bonusType: "+3 to dexterity checks to avoid harm"},
  {prefix: "supreme fortified", suffix: "supreme constitution", itemTypes: ["armor", "clothing"], bonus: 3, bonusType: "+3 to constitution checks to avoid harm"},
  {prefix: "supreme outsmarting", suffix: "supreme intelligence", itemTypes: ["armor", "clothing"], bonus: 3, bonusType: "+3 to intelligence checks to avoid harm"},
  {prefix: "supreme principled", suffix: "supreme principle", itemTypes: ["armor", "clothing"], bonus: 3, bonusType: "+3 to wisdom checks to avoid harm"},
  {prefix: "supreme egotistical", suffix: "supreme ego", itemTypes: ["armor", "clothing"], bonus: 3, bonusType: "+3 to charisma checks to avoid harm"},

  {prefix: "reflexive", suffix: "initiative", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 to initiative"},
    //ability score affixex
  {prefix: "mighty", suffix: "might", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to strength"},
  {prefix: "greater mighty", suffix: "greater might", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to strength"},
  {prefix: "agile", suffix: "agility", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to dexterity"},
  {prefix: "greater agile", suffix: "greater agility", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to dexterity"},
  {prefix: "vital", suffix: "vitality", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to constitution"},
  {prefix: "greater vital", suffix: "greater vitality", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to constitution"},
  {prefix: "intellectual", suffix: "intellect", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to intelligence"},
  {prefix: "greater intellectual", suffix: "greater intellect", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to intelligence"},
  {prefix: "insightful", suffix: "insight", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to wisdom"},
  {prefix: "greater insightful", suffix: "greater insight", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to wisdom"},
  {prefix: "charming", suffix: "presence", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+1 to charisma"},
  {prefix: "greater charming", suffix: "greater presence", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to charisma"},
    //spellcasting affixes
  {prefix: "apprentice's", suffix: "the apprentice", itemTypes: ["clothing"], bonus: 1, bonusType: "automatically cast a 1st level spell you know once per day if you're a wizard"},
  {prefix: "adept's", suffix: "the adept", itemTypes: ["clothing"], bonus: 1, bonusType: "automatically cast a 2nd level spell you know once per day if you're a wizard"},
  {prefix: "mage's", suffix: "the mage", itemTypes: ["clothing"], bonus: 2, bonusType: "automatically cast a 3rd level spell you know once per day if you're a wizard"},
  {prefix: "wizard's", suffix: "the wizard", itemTypes: ["clothing"], bonus: 2, bonusType: "automatically cast a 4th level spell you know once per day if you're a wizard"},
  {prefix: "archmage's", suffix: "the archmage", itemTypes: ["clothing"], bonus: 3, bonusType: "automatically cast a 5th level spell you know once per day if you're a wizard"},
  {prefix: "apprentice's spellbound", suffix: `${randomTier1Spell}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 1, bonusType: `automatically cast ${randomTier1Spell} once per day`},
  {prefix: "adept's spellbound", suffix: `${randomTier2Spell}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 1, bonusType: `automatically cast ${randomTier2Spell} once per day`},
  {prefix: "mage's spellbound", suffix: `${randomTier3Spell}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 2, bonusType: `automatically cast ${randomTier3Spell} once per day`},
  {prefix: "wizard's spellbound", suffix: `${randomTier4Spell}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 2, bonusType: `automatically cast ${randomTier4Spell} once per day`},
  {prefix: "archmage's spellbound", suffix: `${randomTier5Spell}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 3, bonusType: `automatically cast ${randomTier5Spell} once per day`},    

  {prefix: "Acolyte's", suffix: "the Acolyte", itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 1, bonusType: "automatically cast a 1st level divine spell you prepared once per day if you're a priest"},
  {prefix: "Crusader's", suffix: "the Crusader", itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 1, bonusType: "automatically cast a 2nd level divine spell you prepared once per day if you're a priest"},
  {prefix: "Templar's", suffix: "the Templar", itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 2, bonusType: "automatically cast a 3rd level divine spell you prepared once per day if you're a priest"},
  {prefix: "Champion's", suffix: "the Champion", itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 2, bonusType: "automatically cast a 4th level divine spell you prepared once per day if you're a priest"},
  {prefix: "Paladin's", suffix: "the Paladin", itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 3, bonusType: "automatically cast a 5th level divine spell you prepared once per day if you're a priest"},
  {prefix: "Acolyte's miraclebound", suffix: `${randomTier1Miracle}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 1, bonusType: `automatically cast ${randomTier1Miracle} once per day`},
  {prefix: "Crusader's miraclebound", suffix: `${randomTier2Miracle}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 1, bonusType: `automatically cast ${randomTier2Miracle} once per day`},
  {prefix: "Templar's miraclebound", suffix: `${randomTier3Miracle}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 2, bonusType: `automatically cast ${randomTier3Miracle} once per day`},
  {prefix: "Champion's miraclebound", suffix: `${randomTier4Miracle}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 2, bonusType: `automatically cast ${randomTier4Miracle} once per day`},
  {prefix: "Paladin's miraclebound", suffix: `${randomTier5Miracle}`, itemTypes: ["armor", "clothing", "weapon", "shield"], bonus: 3, bonusType: `automatically cast ${randomTier5Miracle} once per day`}, 
  

  {prefix: "Infiltrator's", suffix: "infiltration", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+3 on dexterity checks to hide and move silently"},
  {prefix: "Investigator's", suffix: "investigation", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on intelligence checks to searching and investigation"},
  {prefix: "Athlete's", suffix: "the athlete", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on strength checks to achieve athletic feats"},
  {prefix: "Acrobat's", suffix: "the acrobat", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on dexterity checks to achieve acrobatic feats"},
  {prefix: "Trickster's", suffix: "the trickster", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on dexterity checks to sleight of hand"},
  {prefix: "Arcanist's", suffix: "the arcanist", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on intelligence checks to recall magic studies"},
  {prefix: "Historian's", suffix: "the historian", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on intelligence checks to recall history"},
  {prefix: "Naturalist's", suffix: "the naturalist", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on intelligence checks to recall natural knowledge"},
  {prefix: "Theologin's", suffix: "the theologin", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on intelligence checks to recall religious knowledge"},
  {prefix: "Physician's", suffix: "the physician", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on wisdom checks to recall medicinal knowledge"},
  {prefix: "Beastmaster's", suffix: "the beastmaster", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on wisdom checks to handle animals"},
  {prefix: "Acute", suffix: "acuity", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on wisdom checks to perceive"},
  {prefix: "Survivalist's", suffix: "the survivalist", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on wisdom checks to survive in the wild"},
  {prefix: "Grifter's", suffix: "the grifter", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on charisma checks to deceive"},
  {prefix: "Diplomat's", suffix: "the diplomat", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: " +2 on charisma checks to persuade"},
  {prefix: "Intimidator's", suffix: "the intimidator", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on charisma checks to intimidate"},
  {prefix: "Performer's", suffix: "the performer", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "+2 on charisma checks to perform"},
  //feat affixes
  {prefix: "Armor-Training", suffix: "Armor-Training", itemTypes: ["armor"], bonus: 2, bonusType: "You are automatically proficient with this armor"},
  {prefix: "Shield-Training", suffix: "Shield-Training", itemTypes: ["shield"], bonus: 1, bonusType: "You are automatically proficient with this shield"},

  {prefix: "Weapon-Training", suffix: "Weapon-Training", itemTypes: ["weapon"], bonus: 2, bonusType: "You are automatically proficient with this weapon"},
  {prefix: "Archer's", suffix: "Archery", itemTypes: ["armor", "clothing"], bonus: 2, bonusType: "+2 to attack rolls with ranged weapons"},
  
  {prefix: "immortal", suffix: "immortality", itemTypes: ["armor", "clothing"], bonus: 1, bonusType: "you can't age while this is worn"},
];

function generateAffixes(item) {
    // Filter affixes that match the item's type
    const validAffixes = itemAffixes.filter(affix => affix.itemTypes.includes(item.itemType));
  
    let selectedAffixes = [];
    let remainingBonus = item.totalBonus;

    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops

    while (attempts < maxAttempts) {
        let tempAffixes = [];
        let currentBonus = 0;

        for (let i = 0; i < 2; i++) {
            let possibleAffixes = validAffixes.filter(affix => 
                (tempAffixes.length === 0 || affix.bonus <= remainingBonus - currentBonus) && !tempAffixes.includes(affix)
            );

            if (possibleAffixes.length === 0) break;

            let randomAffix = possibleAffixes[Math.floor(Math.random() * possibleAffixes.length)];
            tempAffixes.push(randomAffix);
            currentBonus += randomAffix.bonus;

            if (currentBonus === remainingBonus) {
                selectedAffixes = tempAffixes;
                break; // We've found a valid combination
            }
        }

        if (currentBonus === remainingBonus) {
            selectedAffixes = tempAffixes;
            break; // We've found a valid combination
        }

        attempts++;
    }

    if (attempts === maxAttempts) {
        console.log("Couldn't find a valid combination of affixes");
    }

    function capitalizeWords(str) {
        return str.split(' ').map(word => {
            if (word.toLowerCase() === 'the' || word.toLowerCase() === 'of') {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    // Assign affixes to the item
    item.affixes = selectedAffixes;
    item.prefix = selectedAffixes[0] ? capitalizeWords(selectedAffixes[0].prefix) : "";
    item.suffix = selectedAffixes[1] ? `of ${capitalizeWords(selectedAffixes[1].suffix)}`: "";
    item.bonusEffects = selectedAffixes.map(affix => affix.bonusType);

}