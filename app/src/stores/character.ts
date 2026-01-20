import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Character, AbilityScores, Spell } from '@/types/character'
import { SKILLS, calculateModifier, calculateProficiencyBonus } from '@/types/character'

const STORAGE_KEY = 'dnd-character-sheet'

function createDefaultAbilityScores(): AbilityScores {
    const defaultAbility = {
        score: 10,
        modifier: 0,
        savingThrowProficiency: false,
        savingThrowBonus: 0,
    }
    return {
        strength: { ...defaultAbility },
        dexterity: { ...defaultAbility },
        constitution: { ...defaultAbility },
        intelligence: { ...defaultAbility },
        wisdom: { ...defaultAbility },
        charisma: { ...defaultAbility },
    }
}

function createDefaultCharacter(): Character {
    return {
        // Header
        name: '',
        background: '',
        class: '',
        species: '',
        subclass: '',
        level: 1,
        experiencePoints: 0,

        // Core stats
        proficiencyBonus: 2,
        heroicInspiration: false,
        abilityScores: createDefaultAbilityScores(),
        skills: SKILLS.map((skill) => ({
            ...skill,
            proficiency: false,
            expertise: false,
            bonus: 0,
        })),

        // Combat
        combat: {
            armorClass: 10,
            shield: 0,
            initiative: 0,
            speed: 30,
            size: 'Medium',
            passivePerception: 10,
            hitPointMaximum: 0,
            hitPointCurrent: 0,
            hitPointTemporary: 0,
            hitDiceTotal: '',
            hitDiceSpent: '',
            hitDiceMax: '',
            deathSaveSuccesses: 0,
            deathSaveFailures: 0,
        },

        // Attacks
        attacks: [],

        // Features
        classFeatures: '',
        speciesTraits: '',
        feats: '',

        // Proficiencies
        equipmentProficiencies: {
            armorLight: false,
            armorMedium: false,
            armorHeavy: false,
            armorShields: false,
            weapons: '',
            tools: '',
        },

        // Spellcasting
        spellcasting: {
            ability: '',
            spellcastingModifier: 0,
            saveDC: 0,
            attackBonus: 0,
            spellSlots: {
                level1: { total: 0, expended: 0 },
                level2: { total: 0, expended: 0 },
                level3: { total: 0, expended: 0 },
                level4: { total: 0, expended: 0 },
                level5: { total: 0, expended: 0 },
                level6: { total: 0, expended: 0 },
                level7: { total: 0, expended: 0 },
                level8: { total: 0, expended: 0 },
                level9: { total: 0, expended: 0 },
            },
            spells: [],
        },

        // Equipment
        equipment: '',
        magicItemAttunement: {
            slot1: '',
            slot2: '',
            slot3: '',
        },
        coins: {
            copper: 0,
            silver: 0,
            electrum: 0,
            gold: 0,
            platinum: 0,
        },

        // Personality
        personality: {
            backstoryAndPersonality: '',
            appearance: '',
            alignment: '',
            languages: '',
        },
    }
}

export const useCharacterStore = defineStore('character', () => {
    const character = ref<Character>(loadFromStorage() || createDefaultCharacter())
    const lastSaved = ref<Date | null>(null)

    const proficiencyBonus = computed(() =>
        calculateProficiencyBonus(character.value.level)
    )

    watch(
        character,
        (newValue) => {
            updateDerivedValues()
            saveToStorage(newValue)
            lastSaved.value = new Date()
        },
        { deep: true }
    )

    function updateDerivedValues() {
        // Update proficiency bonus based on level
        character.value.proficiencyBonus = calculateProficiencyBonus(character.value.level)

        // Update ability modifiers and saving throws
        const abilities = character.value.abilityScores
        for (const key of Object.keys(abilities) as (keyof AbilityScores)[]) {
            abilities[key].modifier = calculateModifier(abilities[key].score)
            abilities[key].savingThrowBonus =
                abilities[key].modifier +
                (abilities[key].savingThrowProficiency ? character.value.proficiencyBonus : 0)
        }

        // Update skill bonuses
        for (const skill of character.value.skills) {
            const abilityMod = abilities[skill.ability].modifier
            let bonus = abilityMod
            if (skill.expertise) {
                bonus += character.value.proficiencyBonus * 2
            } else if (skill.proficiency) {
                bonus += character.value.proficiencyBonus
            }
            skill.bonus = bonus
        }

        // Update passive perception
        const perceptionSkill = character.value.skills.find(s => s.name === 'Perception')
        character.value.combat.passivePerception = 10 + (perceptionSkill?.bonus || abilities.wisdom.modifier)

        // Update initiative (DEX modifier)
        character.value.combat.initiative = abilities.dexterity.modifier
    }

    function loadFromStorage(): Character | null {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored)
                // Merge with defaults to handle schema changes
                return { ...createDefaultCharacter(), ...parsed }
            }
        } catch (e) {
            console.error('Failed to load character from storage:', e)
        }
        return null
    }

    function saveToStorage(char: Character) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(char))
        } catch (e) {
            console.error('Failed to save character to storage:', e)
        }
    }

    function resetCharacter() {
        character.value = createDefaultCharacter()
        localStorage.removeItem(STORAGE_KEY)
    }

    function addAttack() {
        character.value.attacks.push({
            id: crypto.randomUUID(),
            name: '',
            attackBonus: '',
            damage: '',
            notes: '',
        })
    }

    function removeAttack(id: string) {
        const index = character.value.attacks.findIndex((a) => a.id === id)
        if (index !== -1) {
            character.value.attacks.splice(index, 1)
        }
    }

    function addSpell(level: number = 0) {
        character.value.spellcasting.spells.push({
            id: crypto.randomUUID(),
            name: '',
            level,
            castingTime: '',
            range: '',
            concentration: false,
            ritual: false,
            material: false,
            notes: '',
        })
    }

    function removeSpell(id: string) {
        const index = character.value.spellcasting.spells.findIndex((s) => s.id === id)
        if (index !== -1) {
            character.value.spellcasting.spells.splice(index, 1)
        }
    }

    // Initialize derived values on load
    updateDerivedValues()

    return {
        character,
        lastSaved,
        proficiencyBonus,
        resetCharacter,
        addAttack,
        removeAttack,
        addSpell,
        removeSpell,
    }
})
