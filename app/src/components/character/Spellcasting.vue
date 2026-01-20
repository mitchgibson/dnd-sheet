<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()

const spells = computed(() => store.character.spellcasting.spells)

function getSlotKey(level: number): keyof typeof store.character.spellcasting.spellSlots {
  return `level${level}` as keyof typeof store.character.spellcasting.spellSlots
}

function toggleExpended(level: number, index: number) {
  const slot = store.character.spellcasting.spellSlots[getSlotKey(level)]
  slot.expended = slot.expended >= index ? index - 1 : index
}
</script>

<template>
  <div class="spellcasting-section">
    <!-- Spellcasting Stats -->
    <div class="spell-stats">
      <div class="stat">
        <Label>Ability</Label>
        <Input v-model="store.character.spellcasting.ability" placeholder="INT" />
      </div>
      <div class="stat">
        <Label>Modifier</Label>
        <Input v-model.number="store.character.spellcasting.spellcastingModifier" type="number" />
      </div>
      <div class="stat">
        <Label>Save DC</Label>
        <Input v-model.number="store.character.spellcasting.saveDC" type="number" />
      </div>
      <div class="stat">
        <Label>Attack Bonus</Label>
        <Input v-model.number="store.character.spellcasting.attackBonus" type="number" />
      </div>
    </div>

    <!-- Spell Slots -->
    <div class="spell-slots">
      <h4 class="subsection-title">Spell Slots</h4>
      <div class="slots-grid">
        <div v-for="level in 9" :key="level" class="slot-row">
          <span class="level-label">Lv {{ level }}</span>
          <Input
            :model-value="store.character.spellcasting.spellSlots[getSlotKey(level)].total"
            @update:model-value="store.character.spellcasting.spellSlots[getSlotKey(level)].total = Number($event)"
            type="number"
            min="0"
            class="slot-total"
          />
          <div class="expended-markers">
            <span
              v-for="i in Math.max(store.character.spellcasting.spellSlots[getSlotKey(level)].total, 0)"
              :key="i"
              class="marker"
              :class="{ used: store.character.spellcasting.spellSlots[getSlotKey(level)].expended >= i }"
              @click="toggleExpended(level, i)"
            >◇</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Spells Table -->
    <div class="spells-list">
      <h4 class="subsection-title">Cantrips & Prepared Spells</h4>
      <table class="spells-table">
        <thead>
          <tr>
            <th class="col-level">Lv</th>
            <th class="col-name">Name</th>
            <th class="col-time">Time</th>
            <th class="col-range">Range</th>
            <th class="col-c">C</th>
            <th class="col-r">R</th>
            <th class="col-m">M</th>
            <th class="col-notes">Notes</th>
            <th class="col-action"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spell in spells" :key="spell.id">
            <td>
              <Input
                :model-value="spell.level"
                @update:model-value="spell.level = Number($event)"
                type="number"
                min="0"
                max="9"
              />
            </td>
            <td><Input v-model="spell.name" placeholder="Spell name" /></td>
            <td><Input v-model="spell.castingTime" placeholder="1A" /></td>
            <td><Input v-model="spell.range" placeholder="60 ft" /></td>
            <td>
              <span 
                class="check-marker" 
                :class="{ active: spell.concentration }"
                @click="spell.concentration = !spell.concentration"
              >◇</span>
            </td>
            <td>
              <span 
                class="check-marker" 
                :class="{ active: spell.ritual }"
                @click="spell.ritual = !spell.ritual"
              >◇</span>
            </td>
            <td>
              <span 
                class="check-marker" 
                :class="{ active: spell.material }"
                @click="spell.material = !spell.material"
              >◇</span>
            </td>
            <td><Input v-model="spell.notes" placeholder="Notes" /></td>
            <td>
              <Button variant="ghost" size="icon" @click="store.removeSpell(spell.id)">✕</Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Button variant="outline" size="sm" @click="store.addSpell(0)">
        + Add Spell
      </Button>
    </div>
  </div>
</template>

<style scoped>
.spellcasting-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.spell-stats {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat :deep(label) {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.stat :deep(input) {
  height: 40px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
}

.spell-slots {
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.subsection-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.75rem;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.slot-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem;
  background: hsl(var(--muted) / 0.3);
  border-radius: 0.25rem;
}

.level-label {
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 35px;
}

.slot-total {
  width: 45px;
  height: 32px;
  text-align: center;
  font-size: 0.875rem;
}

.expended-markers {
  display: flex;
  gap: 0.125rem;
}

.marker {
  cursor: pointer;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.marker.used {
  color: hsl(var(--primary));
}

.spells-list {
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.spells-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.75rem;
}

.spells-table th {
  text-align: left;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid hsl(var(--border));
}

.spells-table td {
  padding: 0.25rem;
}

.spells-table :deep(input) {
  height: 32px;
  font-size: 0.85rem;
}

.col-level { width: 50px; }
.col-name { width: 25%; }
.col-time { width: 60px; }
.col-range { width: 70px; }
.col-c, .col-r, .col-m { width: 30px; text-align: center; }
.col-notes { width: auto; }
.col-action { width: 40px; }

.check-marker {
  display: block;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
}

.check-marker.active {
  color: hsl(var(--primary));
}
</style>
