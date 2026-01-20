<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import type { AbilityName } from '@/types/character'
import { SKILLS_BY_ABILITY } from '@/types/character'

const store = useCharacterStore()

const abilities: { key: AbilityName; label: string; abbr: string }[] = [
  { key: 'strength', label: 'Strength', abbr: 'STR' },
  { key: 'dexterity', label: 'Dexterity', abbr: 'DEX' },
  { key: 'constitution', label: 'Constitution', abbr: 'CON' },
  { key: 'intelligence', label: 'Intelligence', abbr: 'INT' },
  { key: 'wisdom', label: 'Wisdom', abbr: 'WIS' },
  { key: 'charisma', label: 'Charisma', abbr: 'CHA' },
]

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

function getSkill(name: string) {
  return store.character.skills.find(s => s.name === name)
}

function toggleSkillProficiency(skillName: string) {
  const skill = getSkill(skillName)
  if (!skill) return
  if (skill.expertise) {
    skill.expertise = false
    skill.proficiency = false
  } else if (skill.proficiency) {
    skill.expertise = true
  } else {
    skill.proficiency = true
  }
}
</script>

<template>
  <div class="abilities-container">
    <!-- Each ability in a row with its skills -->
    <div v-for="ability in abilities" :key="ability.key" class="ability-row">
      <!-- Ability Score Box -->
      <div class="ability-box">
        <div class="ability-header">{{ ability.abbr }}</div>
        <Input
          :model-value="store.character.abilityScores[ability.key].score"
          @update:model-value="store.character.abilityScores[ability.key].score = Number($event)"
          type="number"
          min="1"
          max="30"
          class="score-input"
        />
        <div class="modifier">
          {{ formatModifier(store.character.abilityScores[ability.key].modifier) }}
        </div>
      </div>

      <!-- Saving Throw + Skills -->
      <div class="ability-details">
        <!-- Saving Throw -->
        <div 
          class="save-row"
          @click="store.character.abilityScores[ability.key].savingThrowProficiency = !store.character.abilityScores[ability.key].savingThrowProficiency"
        >
          <span class="prof-marker">
            {{ store.character.abilityScores[ability.key].savingThrowProficiency ? '●' : '○' }}
          </span>
          <span class="bonus">
            {{ formatModifier(store.character.abilityScores[ability.key].savingThrowBonus) }}
          </span>
          <span class="label">Saving Throw</span>
        </div>

        <!-- Skills -->
        <div 
          v-for="skillName in SKILLS_BY_ABILITY[ability.key]"
          :key="skillName"
          class="skill-row"
          @click="toggleSkillProficiency(skillName)"
        >
          <span class="prof-marker">
            <template v-if="getSkill(skillName)?.expertise">◆</template>
            <template v-else-if="getSkill(skillName)?.proficiency">●</template>
            <template v-else>○</template>
          </span>
          <span class="bonus">{{ formatModifier(getSkill(skillName)?.bonus || 0) }}</span>
          <span class="label">{{ skillName }}</span>
        </div>
      </div>
    </div>

    <!-- Heroic Inspiration -->
    <div 
      class="inspiration-row"
      @click="store.character.heroicInspiration = !store.character.heroicInspiration"
    >
      <span class="inspiration-icon">{{ store.character.heroicInspiration ? '★' : '☆' }}</span>
      <span class="inspiration-label">Heroic Inspiration</span>
    </div>
  </div>
</template>

<style scoped>
.abilities-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ability-row {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.ability-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  padding: 0.5rem;
  background: hsl(var(--muted));
  border-radius: 0.375rem;
}

.ability-header {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.25rem;
}

.score-input {
  width: 60px;
  height: 40px;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.modifier {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.25rem;
  color: hsl(var(--primary));
}

.ability-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.save-row,
.skill-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.15s;
}

.save-row:hover,
.skill-row:hover {
  background: hsl(var(--muted) / 0.5);
}

.save-row {
  font-weight: 600;
}

.prof-marker {
  flex-shrink: 0;
  width: 16px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--primary);
}

.bonus {
  flex-shrink: 0;
  width: 32px;
  font-weight: 600;
  font-size: 0.9rem;
}

.label {
  flex: 1;
  font-size: 0.875rem;
  color: var(--foreground);
  white-space: nowrap;
}

.save-row .label {
  font-weight: 600;
}

.inspiration-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s;
}

.inspiration-row:hover {
  background: hsl(var(--muted) / 0.5);
}

.inspiration-icon {
  font-size: 1.5rem;
  color: hsl(var(--primary));
}

.inspiration-label {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}
</style>
