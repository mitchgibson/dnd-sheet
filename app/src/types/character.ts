// D&D 2024 Character Sheet Types

export interface AbilityScore {
    score: number
    modifier: number
    savingThrowProficiency: boolean
    savingThrowBonus: number
}

export interface AbilityScores {
    strength: AbilityScore
    dexterity: AbilityScore
    constitution: AbilityScore
    intelligence: AbilityScore
    wisdom: AbilityScore
    charisma: AbilityScore
}

export type AbilityName = keyof AbilityScores

export interface Skill {
    name: string
    ability: AbilityName
    proficiency: boolean
    expertise: boolean
    bonus: number
}

export interface CombatStats {
    armorClass: number
    shield: number
    initiative: number
    speed: number
    size: string
    passivePerception: number
    hitPointMaximum: number
    hitPointCurrent: number
    hitPointTemporary: number
    hitDiceTotal: string
    hitDiceSpent: string
    hitDiceMax: string
    deathSaveSuccesses: number
    deathSaveFailures: number
}

export interface Attack {
    id: string
    name: string
    attackBonus: string
    damage: string
    notes: string
}

export interface EquipmentProficiencies {
    armorLight: boolean
    armorMedium: boolean
    armorHeavy: boolean
    armorShields: boolean
    weapons: string
    tools: string
}

export interface Spell {
    id: string
    name: string
    level: number // 0 = cantrip
    castingTime: string
    range: string
    concentration: boolean
    ritual: boolean
    material: boolean
    notes: string
}

export interface SpellSlot {
    total: number
    expended: number
}

export interface SpellSlots {
    level1: SpellSlot
    level2: SpellSlot
    level3: SpellSlot
    level4: SpellSlot
    level5: SpellSlot
    level6: SpellSlot
    level7: SpellSlot
    level8: SpellSlot
    level9: SpellSlot
}

export interface Spellcasting {
    ability: string
    spellcastingModifier: number
    saveDC: number
    attackBonus: number
    spellSlots: SpellSlots
    spells: Spell[]
}

export interface Coins {
    copper: number
    silver: number
    electrum: number
    gold: number
    platinum: number
}

export interface MagicItemAttunement {
    slot1: string
    slot2: string
    slot3: string
}

export interface Personality {
    backstoryAndPersonality: string
    appearance: string
    alignment: string
    languages: string
}

export interface Character {
    // Header info
    name: string
    background: string
    class: string
    species: string
    subclass: string
    level: number
    experiencePoints: number

    // Core stats
    proficiencyBonus: number
    heroicInspiration: boolean
    abilityScores: AbilityScores
    skills: Skill[]

    // Combat
    combat: CombatStats

    // Attacks/Weapons
    attacks: Attack[]

    // Features
    classFeatures: string
    speciesTraits: string
    feats: string

    // Proficiencies
    equipmentProficiencies: EquipmentProficiencies

    // Spellcasting (Page 2)
    spellcasting: Spellcasting

    // Equipment (Page 2)
    equipment: string
    magicItemAttunement: MagicItemAttunement
    coins: Coins

    // Personality (Page 2)
    personality: Personality
}

// Skills list with their associated abilities (matching sheet layout)
export const SKILLS_BY_ABILITY: Record<AbilityName, string[]> = {
    strength: ['Athletics'],
    dexterity: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
    constitution: [], // No skills for CON
    intelligence: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion'],
    wisdom: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
    charisma: ['Deception', 'Intimidation', 'Performance', 'Persuasion'],
}

export const SKILLS: { name: string; ability: AbilityName }[] = [
    { name: 'Acrobatics', ability: 'dexterity' },
    { name: 'Animal Handling', ability: 'wisdom' },
    { name: 'Arcana', ability: 'intelligence' },
    { name: 'Athletics', ability: 'strength' },
    { name: 'Deception', ability: 'charisma' },
    { name: 'History', ability: 'intelligence' },
    { name: 'Insight', ability: 'wisdom' },
    { name: 'Intimidation', ability: 'charisma' },
    { name: 'Investigation', ability: 'intelligence' },
    { name: 'Medicine', ability: 'wisdom' },
    { name: 'Nature', ability: 'intelligence' },
    { name: 'Perception', ability: 'wisdom' },
    { name: 'Performance', ability: 'charisma' },
    { name: 'Persuasion', ability: 'charisma' },
    { name: 'Religion', ability: 'intelligence' },
    { name: 'Sleight of Hand', ability: 'dexterity' },
    { name: 'Stealth', ability: 'dexterity' },
    { name: 'Survival', ability: 'wisdom' },
]

// Helper function to calculate ability modifier
export function calculateModifier(score: number): number {
    return Math.floor((score - 10) / 2)
}

// Helper function to calculate proficiency bonus from level
export function calculateProficiencyBonus(level: number): number {
    return Math.floor((level - 1) / 4) + 2
}
