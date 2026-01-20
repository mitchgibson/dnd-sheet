<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()
</script>

<template>
  <div class="proficiencies-section">
    <h3 class="section-title">Equipment Training & Proficiencies</h3>
    
    <!-- Armor Training -->
    <div class="armor-row">
      <span class="row-label">Armor:</span>
      <label class="checkbox-item">
        <Checkbox
          :checked="store.character.equipmentProficiencies.armorLight"
          @update:checked="store.character.equipmentProficiencies.armorLight = $event"
        />
        <span>Light</span>
      </label>
      <label class="checkbox-item">
        <Checkbox
          :checked="store.character.equipmentProficiencies.armorMedium"
          @update:checked="store.character.equipmentProficiencies.armorMedium = $event"
        />
        <span>Medium</span>
      </label>
      <label class="checkbox-item">
        <Checkbox
          :checked="store.character.equipmentProficiencies.armorHeavy"
          @update:checked="store.character.equipmentProficiencies.armorHeavy = $event"
        />
        <span>Heavy</span>
      </label>
      <label class="checkbox-item">
        <Checkbox
          :checked="store.character.equipmentProficiencies.armorShields"
          @update:checked="store.character.equipmentProficiencies.armorShields = $event"
        />
        <span>Shields</span>
      </label>
    </div>

    <!-- Weapons -->
    <div class="textarea-row">
      <Label>Weapons</Label>
      <Textarea
        v-model="store.character.equipmentProficiencies.weapons"
        placeholder="Simple, Martial, Longswords, Shortbows..."
        rows="2"
      />
    </div>

    <!-- Tools -->
    <div class="textarea-row">
      <Label>Tools</Label>
      <Textarea
        v-model="store.character.equipmentProficiencies.tools"
        placeholder="Thieves' tools, Smith's tools, Playing cards..."
        rows="2"
      />
    </div>
  </div>
</template>

<style scoped>
.proficiencies-section {
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.75rem;
}

.armor-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.row-label {
  font-size: 0.875rem;
  font-weight: 600;
  min-width: 50px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.textarea-row {
  margin-bottom: 0.75rem;
}

.textarea-row:last-child {
  margin-bottom: 0;
}

.textarea-row :deep(label) {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.25rem;
}

.textarea-row :deep(textarea) {
  font-size: 0.9rem;
}
</style>
