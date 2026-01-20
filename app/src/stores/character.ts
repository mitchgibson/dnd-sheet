import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Character, AbilityScores } from '@/types/character'
import { SKILLS, calculateModifier, calculateProficiencyBonus } from '@/types/character'

const API_BASE = 'http://localhost:3001/api'

export interface CharacterListItem {
    name: string
    class: string
    level: number
    fileName: string
}

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
        name: 'New Character',
        background: '',
        class: '',
        species: '',
        subclass: '',
        level: 1,
        experiencePoints: 0,
        proficiencyBonus: 2,
        heroicInspiration: false,
        abilityScores: createDefaultAbilityScores(),
        skills: SKILLS.map((skill) => ({
            ...skill,
            proficiency: false,
            expertise: false,
            bonus: 0,
        })),
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
        attacks: [],
        classFeatures: '',
        speciesTraits: '',
        feats: '',
        equipmentProficiencies: {
            armorLight: false,
            armorMedium: false,
            armorHeavy: false,
            armorShields: false,
            weapons: '',
            tools: '',
        },
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
        equipment: '',
        magicItemAttunement: { slot1: '', slot2: '', slot3: '' },
        coins: { copper: 0, silver: 0, electrum: 0, gold: 0, platinum: 0 },
        personality: {
            backstoryAndPersonality: '',
            appearance: '',
            alignment: '',
            languages: '',
        },
    }
}

export const useCharacterStore = defineStore('character', () => {
    const CURRENT_CHAR_KEY = 'dnd-current-character'

    const character = ref<Character>(createDefaultCharacter())
    const characters = ref<CharacterListItem[]>([])
    const currentFileName = ref<string>(localStorage.getItem(CURRENT_CHAR_KEY) || '')
    const lastSaved = ref<Date | null>(null)
    const isLoading = ref(false)
    const nameError = ref<string>('')

    const proficiencyBonus = computed(() =>
        calculateProficiencyBonus(character.value.level)
    )

    // Persist current character to localStorage
    watch(currentFileName, (newVal) => {
        if (newVal) {
            localStorage.setItem(CURRENT_CHAR_KEY, newVal)
        } else {
            localStorage.removeItem(CURRENT_CHAR_KEY)
        }
    })

    // Debounced auto-save
    let saveTimeout: ReturnType<typeof setTimeout> | null = null

    watch(
        character,
        () => {
            updateDerivedValues()
            // Auto-save after 1 second of no changes
            if (saveTimeout) clearTimeout(saveTimeout)
            if (currentFileName.value || character.value.name.trim()) {
                saveTimeout = setTimeout(() => {
                    autoSave()
                }, 1000)
            }
        },
        { deep: true }
    )

    function updateDerivedValues() {
        character.value.proficiencyBonus = calculateProficiencyBonus(character.value.level)
        const abilities = character.value.abilityScores
        for (const key of Object.keys(abilities) as (keyof AbilityScores)[]) {
            abilities[key].modifier = calculateModifier(abilities[key].score)
            abilities[key].savingThrowBonus =
                abilities[key].modifier +
                (abilities[key].savingThrowProficiency ? character.value.proficiencyBonus : 0)
        }
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
        const perceptionSkill = character.value.skills.find(s => s.name === 'Perception')
        character.value.combat.passivePerception = 10 + (perceptionSkill?.bonus || abilities.wisdom.modifier)
        character.value.combat.initiative = abilities.dexterity.modifier
    }

    async function listCharacters() {
        try {
            const res = await fetch(`${API_BASE}/characters`)
            if (res.ok) {
                characters.value = await res.json()
            }
        } catch (e) {
            console.error('Failed to list characters:', e)
        }
    }

    async function loadCharacter(fileName: string) {
        isLoading.value = true
        nameError.value = ''
        try {
            const res = await fetch(`${API_BASE}/characters/${fileName}`)
            if (res.ok) {
                const data = await res.json()
                character.value = { ...createDefaultCharacter(), ...data }
                currentFileName.value = fileName
                updateDerivedValues()
            }
        } catch (e) {
            console.error('Failed to load character:', e)
        } finally {
            isLoading.value = false
        }
    }

    async function autoSave() {
        if (!character.value.name.trim()) return

        const newFileName = character.value.name.replace(/[^a-zA-Z0-9_-]/g, '_')

        // Clear any previous error
        nameError.value = ''

        try {
            // If we have a current file and the name changed, use rename endpoint
            if (currentFileName.value && currentFileName.value !== newFileName) {
                const res = await fetch(`${API_BASE}/characters/${currentFileName.value}/rename/${newFileName}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(character.value)
                })

                if (res.ok) {
                    currentFileName.value = newFileName
                    lastSaved.value = new Date()
                    await listCharacters()
                } else if (res.status === 409) {
                    // Name conflict - show error
                    nameError.value = 'A character with this name already exists'
                }
            } else {
                // Normal save (new character or same name)
                const res = await fetch(`${API_BASE}/characters/${newFileName}?current=${currentFileName.value || ''}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(character.value)
                })

                if (res.ok) {
                    currentFileName.value = newFileName
                    lastSaved.value = new Date()
                    // Refresh list if new character
                    if (!characters.value.find(c => c.fileName === newFileName)) {
                        await listCharacters()
                    }
                } else if (res.status === 409) {
                    nameError.value = 'A character with this name already exists'
                }
            }
        } catch (e) {
            console.error('Failed to auto-save:', e)
        }
    }

    async function deleteCharacter(fileName: string) {
        try {
            const res = await fetch(`${API_BASE}/characters/${fileName}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                await listCharacters()
                if (currentFileName.value === fileName) {
                    newCharacter()
                }
                return true
            }
        } catch (e) {
            console.error('Failed to delete character:', e)
        }
        return false
    }

    function newCharacter() {
        character.value = createDefaultCharacter()
        currentFileName.value = ''
        lastSaved.value = null
        nameError.value = ''
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
        if (index !== -1) character.value.attacks.splice(index, 1)
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
        if (index !== -1) character.value.spellcasting.spells.splice(index, 1)
    }

    updateDerivedValues()

    // Initialize
    listCharacters().then(() => {
        if (currentFileName.value) {
            loadCharacter(currentFileName.value)
        }
    })

    return {
        character,
        characters,
        currentFileName,
        lastSaved,
        isLoading,
        nameError,
        proficiencyBonus,
        listCharacters,
        loadCharacter,
        deleteCharacter,
        newCharacter,
        addAttack,
        removeAttack,
        addSpell,
        removeSpell,
    }
})
