<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()
</script>

<template>
  <div class="character-header">
    <!-- Row 1: Name and Core Info -->
    <div class="row-1">
      <div class="field large">
        <Label>Character Name</Label>
        <Input v-model="store.character.name" placeholder="Enter name..." />
      </div>
      <div class="field">
        <Label>Class</Label>
        <Input v-model="store.character.class" placeholder="Fighter" />
      </div>
      <div class="field small">
        <Label>Level</Label>
        <Input v-model.number="store.character.level" type="number" min="1" max="20" />
      </div>
      <div class="field">
        <Label>Subclass</Label>
        <Input v-model="store.character.subclass" placeholder="Champion" />
      </div>
    </div>

    <!-- Row 2: Species, Background, XP -->
    <div class="row-2">
      <div class="field">
        <Label>Species</Label>
        <Input v-model="store.character.species" placeholder="Human" />
      </div>
      <div class="field">
        <Label>Background</Label>
        <Input v-model="store.character.background" placeholder="Soldier" />
      </div>
      <div class="field small">
        <Label>XP</Label>
        <Input v-model.number="store.character.experiencePoints" type="number" min="0" />
      </div>
    </div>

    <!-- Row 3: Combat Stats -->
    <div class="combat-row">
      <div class="combat-stat">
        <Label>AC</Label>
        <Input v-model.number="store.character.combat.armorClass" type="number" />
      </div>
      <div class="combat-stat">
        <Label>Shield</Label>
        <Input v-model.number="store.character.combat.shield" type="number" />
      </div>
      <div class="combat-stat hp">
        <Label>HP</Label>
        <div class="hp-group">
          <Input v-model.number="store.character.combat.hitPointCurrent" type="number" placeholder="Current" />
          <span class="divider">/</span>
          <Input v-model.number="store.character.combat.hitPointMaximum" type="number" placeholder="Max" />
          <span class="divider">+</span>
          <Input v-model.number="store.character.combat.hitPointTemporary" type="number" placeholder="Temp" />
        </div>
      </div>
      <div class="combat-stat">
        <Label>Hit Dice</Label>
        <div class="dice-group">
          <Input v-model="store.character.combat.hitDiceSpent" placeholder="Used" />
          <span class="divider">/</span>
          <Input v-model="store.character.combat.hitDiceMax" placeholder="Total" />
        </div>
      </div>
    </div>

    <!-- Row 4: Death Saves -->
    <div class="death-saves-row">
      <span class="death-label">Death Saves:</span>
      <div class="save-group">
        <span>Successes</span>
        <div class="boxes">
          <span
            v-for="i in 3"
            :key="'s' + i"
            class="box success"
            :class="{ filled: store.character.combat.deathSaveSuccesses >= i }"
            @click="store.character.combat.deathSaveSuccesses = store.character.combat.deathSaveSuccesses >= i ? i - 1 : i"
          ></span>
        </div>
      </div>
      <div class="save-group">
        <span>Failures</span>
        <div class="boxes">
          <span
            v-for="i in 3"
            :key="'f' + i"
            class="box failure"
            :class="{ filled: store.character.combat.deathSaveFailures >= i }"
            @click="store.character.combat.deathSaveFailures = store.character.combat.deathSaveFailures >= i ? i - 1 : i"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.row-1, .row-2, .combat-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.field.large {
  flex: 2;
}

.field.small {
  flex: 0 0 80px;
}

.field :deep(label) {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.field :deep(input) {
  height: 40px;
  font-size: 1rem;
}

.combat-row {
  padding-top: 0.75rem;
  border-top: 1px solid hsl(var(--border));
}

.combat-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.combat-stat :deep(label) {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.combat-stat :deep(input) {
  width: 70px;
  height: 40px;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
}

.combat-stat.hp {
  flex: 1;
}

.hp-group, .dice-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.hp-group :deep(input), .dice-group :deep(input) {
  width: 60px;
}

.divider {
  color: hsl(var(--muted-foreground));
  font-size: 1.25rem;
}

.death-saves-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
  background: hsl(var(--muted) / 0.3);
  border-radius: 0.375rem;
}

.death-label {
  font-size: 0.875rem;
  font-weight: 600;
}

.save-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.boxes {
  display: flex;
  gap: 0.25rem;
}

.box {
  width: 20px;
  height: 20px;
  border: 2px solid hsl(var(--border));
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s;
}

.box.success.filled {
  background: hsl(120, 60%, 45%);
  border-color: hsl(120, 60%, 45%);
}

.box.failure.filled {
  background: hsl(0, 70%, 50%);
  border-color: hsl(0, 70%, 50%);
}
</style>
