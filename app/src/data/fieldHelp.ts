// D&D 5e 2024 Field Help Text
// Information about each field based on the 2024 Player's Handbook rules

export interface HelpInfo {
    title: string
    description: string
    example?: string
}

export const fieldHelp: Record<string, HelpInfo> = {
    // Character Info
    characterName: {
        title: "Character Name",
        description: "Your character's name. This can be anything you like - a traditional fantasy name, something from your character's cultural background, or even a nickname they've earned through their adventures."
    },
    background: {
        title: "Background",
        description: "Your background describes where you came from and what you did before becoming an adventurer. In D&D 2024, backgrounds provide:\n\n• Three Ability Score increases (+2 to one, +1 to another, or +1 to three)\n• Two Skill Proficiencies\n• One Tool Proficiency\n• One Origin Feat\n• 50 GP of starting equipment",
        example: "Examples: Acolyte, Charlatan, Criminal, Entertainer, Guard, Guide, Hermit, Merchant, Noble, Sage, Sailor, Scribe, Soldier, Wayfarer"
    },
    class: {
        title: "Class",
        description: "Your class is your primary adventuring profession and determines most of your abilities. D&D 2024 includes 12 classes:\n\n• Barbarian - Primal warrior with rage\n• Bard - Magical performer and jack-of-all-trades\n• Cleric - Divine spellcaster serving a god\n• Druid - Nature magic and wild shape\n• Fighter - Master of weapons and combat\n• Monk - Martial artist using ki\n• Paladin - Holy warrior with divine magic\n• Ranger - Wilderness warrior and tracker\n• Rogue - Stealthy expert and skill master\n• Sorcerer - Innate magical power\n• Warlock - Magic from a patron\n• Wizard - Studied arcane magic"
    },
    species: {
        title: "Species",
        description: "Your species (formerly 'race') determines your character's physical characteristics and provides certain traits. D&D 2024 species include:\n\n• Aasimar - Celestial-touched humanoids\n• Dragonborn - Dragon-descended humanoids\n• Dwarf - Sturdy mountain or hill folk\n• Elf - Long-lived fey-touched people\n• Gnome - Small, inventive folk\n• Goliath - Giant-kin mountaineers\n• Halfling - Small, lucky folk\n• Human - Versatile and ambitious\n• Orc - Fierce, powerful warriors\n• Tiefling - Fiend-touched humanoids"
    },
    subclass: {
        title: "Subclass",
        description: "Your subclass is a specialization within your class that you typically choose at level 3 (level 1 for Clerics and Warlocks). It provides unique features and shapes how you play your class.",
        example: "Example: A Fighter might choose Champion (critical hits), Battle Master (maneuvers), or Eldritch Knight (magic)"
    },
    level: {
        title: "Level",
        description: "Your character level represents your overall experience and power, ranging from 1 (novice) to 20 (legendary hero). As you gain levels, you get:\n\n• Increased Hit Points\n• New class features\n• Higher Proficiency Bonus (+2 at level 1, up to +6 at level 17)\n• Ability Score Improvements (typically at levels 4, 8, 12, 16, 19)\n• Access to higher-level spells (for spellcasters)"
    },
    xp: {
        title: "Experience Points (XP)",
        description: "XP tracks your progress toward the next level. You earn XP by:\n\n• Defeating monsters\n• Completing quests\n• Achieving story milestones\n• Clever problem-solving\n\nXP needed per level: 0 (1st), 300 (2nd), 900 (3rd), 2,700 (4th), 6,500 (5th), 14,000 (6th), 23,000 (7th), 34,000 (8th), 48,000 (9th), 64,000 (10th)..."
    },

    // Combat Stats
    armorClass: {
        title: "Armor Class (AC)",
        description: "AC represents how hard you are to hit. When an attack is made against you, the attacker rolls a d20 and adds modifiers - if the total equals or exceeds your AC, the attack hits.\n\nAC is calculated based on:\n• No Armor: 10 + DEX modifier\n• Light Armor: Armor base + DEX modifier\n• Medium Armor: Armor base + DEX modifier (max +2)\n• Heavy Armor: Armor base only\n• Shield: +2 to any of the above",
        example: "Example: Leather armor (11) + DEX mod (+3) = AC 14"
    },
    hitPoints: {
        title: "Hit Points (HP)",
        description: "HP represents your health and vitality. When you take damage, subtract it from your current HP. If you reach 0 HP, you fall Unconscious and must make Death Saves.\n\n• Current: Your present HP after damage/healing\n• Maximum: Your full HP when uninjured\n• Temporary: Extra HP that are lost first and don't stack\n\nMax HP = Hit Die max (at 1st level) + CON modifier, plus (Hit Die average + CON mod) per additional level"
    },
    hitDice: {
        title: "Hit Dice",
        description: "Hit Dice are used for healing during Short Rests. During a Short Rest, you can spend Hit Dice to recover HP, rolling the die and adding your CON modifier per die spent.\n\nYou have one Hit Die per level. The die size depends on your class:\n• d6: Sorcerer, Wizard\n• d8: Bard, Cleric, Druid, Monk, Rogue, Warlock\n• d10: Fighter, Paladin, Ranger\n• d12: Barbarian\n\nYou regain spent Hit Dice on a Long Rest (half your total, minimum 1)."
    },
    deathSaves: {
        title: "Death Saving Throws",
        description: "When you start your turn at 0 HP while Unconscious, you make a Death Save (d20, no modifiers):\n\n• 10 or higher: Success\n• 9 or lower: Failure\n• Natural 20: Regain 1 HP and wake up\n• Natural 1: Counts as 2 failures\n\nThree successes: You stabilize (still unconscious)\nThree failures: You die\n\nTaking damage at 0 HP = automatic failure. Critical hit = 2 failures."
    },
    proficiencyBonus: {
        title: "Proficiency Bonus",
        description: "Your Proficiency Bonus is added to rolls where you're proficient:\n\n• Attack rolls with proficient weapons\n• Saving throws you're proficient in\n• Skill checks for proficient skills\n• Spell attack rolls and save DCs\n• Tool checks with proficient tools\n\nThe bonus increases with level:\n• Levels 1-4: +2\n• Levels 5-8: +3\n• Levels 9-12: +4\n• Levels 13-16: +5\n• Levels 17-20: +6"
    },
    initiative: {
        title: "Initiative",
        description: "Initiative determines turn order in combat. At the start of combat, everyone rolls a d20 and adds their Initiative modifier. Higher totals act first.\n\nInitiative modifier = Dexterity modifier (+ any special bonuses from features like Alert feat or class abilities)\n\nIn D&D 2024, ties are broken by comparing Dexterity scores, or by rolling off if still tied."
    },
    speed: {
        title: "Speed",
        description: "Speed is the distance in feet you can move on your turn. Most Medium species have a base speed of 30 feet.\n\nOn your turn, you can move up to your speed, and you can break up movement before/after actions. Movement types include:\n• Walking (base speed)\n• Climbing (half speed, unless you have climb speed)\n• Swimming (half speed, unless you have swim speed)\n• Crawling (half speed)\n• Flying (requires fly speed)\n\nDifficult terrain costs double movement."
    },
    size: {
        title: "Size",
        description: "Size categories determine space controlled and how you interact with the world:\n\n• Tiny: 2½ × 2½ ft (pixies, sprites)\n• Small: 5 × 5 ft (gnomes, halflings)\n• Medium: 5 × 5 ft (humans, elves, dwarves)\n• Large: 10 × 10 ft (ogres, horses)\n• Huge: 15 × 15 ft (giants, treants)\n• Gargantuan: 20 × 20 ft or more (dragons, tarrasques)\n\nSize affects grappling, squeezing through spaces, and weapon handling."
    },
    passivePerception: {
        title: "Passive Perception",
        description: "Passive Perception represents your ambient awareness without actively searching. The DM uses this to determine if you notice hidden creatures, traps, or secret doors without rolling.\n\nPassive Perception = 10 + Perception skill modifier\n\nAdvantage on Perception adds +5; Disadvantage subtracts -5.\n\nThis is often the DC that Stealth checks must beat to hide from you."
    },

    // Abilities
    strength: {
        title: "Strength (STR)",
        description: "Strength measures physical power and athletic ability. It affects:\n\n• Melee attack and damage rolls (most weapons)\n• Athletics skill checks\n• Strength saving throws (resisting being pushed, held, etc.)\n• Carrying capacity (STR × 15 pounds)\n• Jump distance\n• Wearing heavy armor without speed penalty",
        example: "Important for: Barbarians, Fighters, Paladins, melee combatants"
    },
    dexterity: {
        title: "Dexterity (DEX)",
        description: "Dexterity measures agility, reflexes, and coordination. It affects:\n\n• AC (when wearing light/medium armor or none)\n• Initiative rolls\n• Ranged attack and damage rolls\n• Finesse weapon attack/damage\n• Acrobatics, Sleight of Hand, Stealth skills\n• Dexterity saving throws (dodging fireballs, traps)",
        example: "Important for: Rogues, Rangers, Monks, ranged combatants"
    },
    constitution: {
        title: "Constitution (CON)",
        description: "Constitution measures health, stamina, and vital force. It affects:\n\n• Hit Points (CON modifier added per level)\n• Constitution saving throws (resisting poison, disease, death effects)\n• Concentration checks to maintain spells\n\nConstitution has no associated skills, but is vital for all characters as it determines survivability.",
        example: "Important for: Everyone, especially front-line combatants"
    },
    intelligence: {
        title: "Intelligence (INT)",
        description: "Intelligence measures learning, memory, and reasoning. It affects:\n\n• Wizard spellcasting (spell attack, save DC)\n• Arcana, History, Investigation, Nature, Religion skills\n• Intelligence saving throws (resisting mental effects, illusions)\n• Number of languages and tool proficiencies for some backgrounds",
        example: "Important for: Wizards, Artificers, investigators, scholars"
    },
    wisdom: {
        title: "Wisdom (WIS)",
        description: "Wisdom measures perception, intuition, and insight. It affects:\n\n• Cleric, Druid, Ranger spellcasting\n• Animal Handling, Insight, Medicine, Perception, Survival skills\n• Wisdom saving throws (resisting charm, fear, many spells)\n• Passive Perception",
        example: "Important for: Clerics, Druids, Rangers, Monks"
    },
    charisma: {
        title: "Charisma (CHA)",
        description: "Charisma measures force of personality and social influence. It affects:\n\n• Bard, Paladin, Sorcerer, Warlock spellcasting\n• Deception, Intimidation, Performance, Persuasion skills\n• Charisma saving throws (resisting banishment, possession)\n• Interactions with NPCs in social situations",
        example: "Important for: Bards, Paladins, Sorcerers, Warlocks, party faces"
    },
    savingThrow: {
        title: "Saving Throw",
        description: "Saving throws represent your ability to resist harmful effects. When forced to make a save, roll d20 + ability modifier + proficiency bonus (if proficient).\n\nEach class grants proficiency in two saving throws. Common saves:\n• STR: Being pushed, grappled, restrained\n• DEX: Dodging area effects (Fireball, traps)\n• CON: Poison, disease, concentration\n• INT: Mental intrusion, some illusions\n• WIS: Charm, fear, many spells\n• CHA: Banishment, possession"
    },

    // Skills
    skillProficiency: {
        title: "Skill Proficiency & Expertise",
        description: "Proficiency in a skill lets you add your Proficiency Bonus to checks using that skill.\n\n○ = Not proficient (ability modifier only)\n● = Proficient (ability mod + proficiency bonus)\n◆ = Expertise (ability mod + double proficiency bonus)\n\nExpertise is granted by certain class features (Rogues, Bards) or feats. Click the marker to cycle through states."
    },

    // Features
    classFeatures: {
        title: "Class Features",
        description: "Class features are special abilities you gain from your class and subclass as you level up. These may include:\n\n• Combat abilities (Extra Attack, Sneak Attack)\n• Resource pools (Rage, Ki, Sorcery Points)\n• Spellcasting\n• Passive bonuses\n• Unique class mechanics\n\nRefer to your class description for a full list of features by level."
    },
    speciesTraits: {
        title: "Species Traits",
        description: "Species traits are innate abilities from your species. In D&D 2024, all species provide:\n\n• Creature Type (usually Humanoid)\n• Size (Small or Medium for most)\n• Speed (typically 30 ft)\n• Special Traits (Darkvision, resistances, natural abilities)\n\nExamples:\n• Elves: Darkvision, Fey Ancestry, Trance\n• Dwarves: Darkvision, Dwarven Resilience, Stonecunning\n• Humans: Resourceful, Skillful, Versatile"
    },
    feats: {
        title: "Feats",
        description: "Feats are optional abilities that provide special benefits beyond normal class features. In D&D 2024, you get feats from:\n\n• Origin Feat: From your Background at 1st level\n• Ability Score Improvements: Can take a feat instead (levels 4, 8, 12, 16, 19 for most classes)\n• Epic Boons: Level 19+ characters can choose Epic Boon feats\n\nFeats have categories: General, Fighting Style, Origin, and Epic Boon."
    },
    heroicInspiration: {
        title: "Heroic Inspiration",
        description: "Heroic Inspiration (replacing Inspiration in D&D 2024) represents a burst of heroic potential. When you have Heroic Inspiration, you can spend it to:\n\n• Reroll any d20 roll you just made\n• Take the new result (you must use it)\n\nYou can gain Heroic Inspiration from:\n• Rolling a natural 20 on an attack, check, or save\n• DM reward for great roleplaying\n• Human's Resourceful trait\n• Certain class features or feats\n\nYou can only have one at a time."
    },

    // Equipment
    armorTraining: {
        title: "Armor Training",
        description: "Armor proficiency determines what armor you can wear effectively:\n\n• Light Armor: Padded, Leather, Studded Leather\n  - Add full DEX modifier to AC\n• Medium Armor: Hide, Chain Shirt, Scale Mail, Breastplate, Half Plate\n  - Add DEX modifier to AC (max +2, or +3 with Medium Armor Master)\n• Heavy Armor: Ring Mail, Chain Mail, Splint, Plate\n  - Fixed AC, no DEX bonus\n  - Requires STR 13+ (Chain) or 15+ (Splint, Plate)\n• Shields: +2 AC\n\nWearing armor without proficiency imposes disadvantage on ability checks, saves, and attacks using STR or DEX."
    },
    weaponProficiency: {
        title: "Weapon Proficiency",
        description: "You must be proficient with a weapon to add your Proficiency Bonus to attack rolls with it.\n\n• Simple Weapons: Club, Dagger, Javelin, Mace, Quarterstaff, Sickle, Spear, Light Crossbow, Dart, Shortbow, Sling\n• Martial Weapons: Battleaxe, Greataxe, Greatsword, Longsword, Rapier, Shortsword, Warhammer, Longbow, Heavy Crossbow, etc.\n\nClasses determine your weapon proficiencies. Fighters and Paladins get all weapons; Wizards get few."
    },
    toolProficiency: {
        title: "Tool Proficiency",
        description: "Tool proficiencies let you add your Proficiency Bonus when making ability checks using those tools.\n\nTool categories include:\n• Artisan's Tools: Alchemist's, Smith's, Carpenter's, etc.\n• Gaming Sets: Cards, dice, chess, etc.\n• Musical Instruments: Lute, flute, drums, etc.\n• Other: Thieves' Tools, Navigator's Tools, Vehicles\n\nThieves' Tools are required to pick locks and disarm traps."
    },

    // Spellcasting
    spellcastingAbility: {
        title: "Spellcasting Ability",
        description: "Your spellcasting ability determines what modifier you add to spell attacks and your spell save DC.\n\n• Intelligence: Wizard, Artificer\n• Wisdom: Cleric, Druid, Ranger\n• Charisma: Bard, Paladin, Sorcerer, Warlock\n\nSpell Attack = d20 + ability modifier + proficiency bonus\nSpell Save DC = 8 + ability modifier + proficiency bonus"
    },
    spellSlots: {
        title: "Spell Slots",
        description: "Spell slots represent your magical energy. To cast a spell, you expend a slot of the spell's level or higher.\n\n• Slots are regained on a Long Rest (Short Rest for Warlocks)\n• Higher-level slots can cast lower-level spells\n• Casting a spell at a higher level often increases its power\n\nCantrips don't require slots and can be cast unlimited times.\n\nThe 'Total' box shows how many slots you have; click the diamonds to mark expended slots."
    },
    spellMarkers: {
        title: "Spell Markers (C/R/M)",
        description: "These markers indicate special spell properties:\n\n• C (Concentration): Requires concentration to maintain. You can only concentrate on one spell at a time. Taking damage requires a CON save (DC 10 or half damage, whichever is higher) to maintain.\n\n• R (Ritual): Can be cast as a ritual by adding 10 minutes to casting time, without expending a spell slot.\n\n• M (Material): Requires material components. Usually handled by a component pouch or spellcasting focus, unless the component has a gold cost or is consumed."
    },

    // Equipment
    equipment: {
        title: "Equipment",
        description: "Your equipment includes all items you carry. Key considerations:\n\n• Carrying Capacity: STR score × 15 pounds\n• Encumbered: Over 5 × STR (speed -10 ft)\n• Heavily Encumbered: Over 10 × STR (speed -20 ft, disadvantage on checks/saves/attacks using STR, DEX, CON)\n\nCommon equipment includes weapons, armor, adventuring gear, and tools."
    },
    magicItemAttunement: {
        title: "Magic Item Attunement",
        description: "Some magic items require attunement - a special bond between you and the item.\n\n• Maximum 3 attuned items at once\n• Attunement requires a Short Rest spent focusing on the item\n• Some items have prerequisites (class, alignment, etc.)\n• Attunement ends if you die, the item is more than 100 ft away for 24 hours, or you voluntarily end it during a Short Rest"
    },
    coins: {
        title: "Coins",
        description: "D&D uses five coin denominations:\n\n• CP (Copper): 1/100 of a gold piece\n• SP (Silver): 1/10 of a gold piece (10 CP = 1 SP)\n• EP (Electrum): 1/2 of a gold piece (5 SP = 1 EP) - rare\n• GP (Gold): Standard currency\n• PP (Platinum): 10 gold pieces each\n\n50 coins of any type weigh 1 pound."
    },

    // Personality
    appearance: {
        title: "Appearance",
        description: "Your character's physical description. Consider including:\n\n• Height and build\n• Hair, eye, and skin color\n• Distinguishing features (scars, tattoos, unique clothing)\n• Age and general demeanor\n• How others perceive you at first glance"
    },
    alignment: {
        title: "Alignment",
        description: "Alignment describes your character's moral and ethical outlook:\n\n• Lawful/Neutral/Chaotic: Attitude toward society and order\n• Good/Neutral/Evil: Attitude toward others' well-being\n\nCombinations: Lawful Good, Neutral Good, Chaotic Good, Lawful Neutral, True Neutral, Chaotic Neutral, Lawful Evil, Neutral Evil, Chaotic Evil\n\nIn D&D 2024, alignment is more of a roleplaying guide than a mechanical restriction."
    },
    backstory: {
        title: "Backstory & Personality",
        description: "Your character's history and personality traits. Consider including:\n\n• Personality Traits: How you typically act\n• Ideals: What principles guide you\n• Bonds: What do you care about most\n• Flaws: Weaknesses, vices, or fears\n• Backstory: Where you came from, key life events, why you became an adventurer"
    },
    languages: {
        title: "Languages",
        description: "Languages you can speak, read, and write. Common languages include:\n\n• Standard: Common, Dwarvish, Elvish, Giant, Gnomish, Goblin, Halfling, Orc\n• Exotic: Abyssal, Celestial, Draconic, Deep Speech, Infernal, Primordial, Sylvan, Undercommon\n\nLanguages come from your species and background. Some spells (Comprehend Languages, Tongues) allow communication without knowing a language."
    }
}
