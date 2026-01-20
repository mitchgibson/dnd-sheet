<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}
</script>

<template>
  <div class="stats-row">
    <div class="stat-box">
      <div class="stat-value">+{{ store.proficiencyBonus }}</div>
      <Label>Proficiency</Label>
    </div>
    <div class="stat-box">
      <div class="stat-value">{{ formatModifier(store.character.combat.initiative) }}</div>
      <Label>Initiative</Label>
    </div>
    <div class="stat-box input">
      <Input v-model.number="store.character.combat.speed" type="number" />
      <Label>Speed</Label>
    </div>
    <div class="stat-box input">
      <Input v-model="store.character.combat.size" placeholder="Medium" />
      <Label>Size</Label>
    </div>
    <div class="stat-box">
      <div class="stat-value">{{ store.character.combat.passivePerception }}</div>
      <Label>Passive Perception</Label>
    </div>
  </div>
</template>

<style scoped>
.stats-row {
  display: flex;
  gap: 0.75rem;
}

.stat-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  min-height: 80px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: hsl(var(--primary));
}

.stat-box :deep(label) {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  text-align: center;
}

.stat-box.input :deep(input) {
  width: 80px;
  height: 40px;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
