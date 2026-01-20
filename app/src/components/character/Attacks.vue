<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()
</script>

<template>
  <div class="attacks-section">
    <h3 class="section-title">Weapons & Damage Cantrips</h3>
    
    <table class="attacks-table">
      <thead>
        <tr>
          <th class="col-name">Name</th>
          <th class="col-bonus">Atk Bonus / DC</th>
          <th class="col-damage">Damage & Type</th>
          <th class="col-notes">Notes</th>
          <th class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attack in store.character.attacks" :key="attack.id">
          <td><Input v-model="attack.name" placeholder="Longsword" /></td>
          <td><Input v-model="attack.attackBonus" placeholder="+5" /></td>
          <td><Input v-model="attack.damage" placeholder="1d8+3 slashing" /></td>
          <td><Input v-model="attack.notes" placeholder="Versatile (1d10)" /></td>
          <td>
            <Button variant="ghost" size="icon" @click="store.removeAttack(attack.id)">✕</Button>
          </td>
        </tr>
      </tbody>
    </table>

    <Button variant="outline" size="sm" @click="store.addAttack()">
      + Add Weapon / Cantrip
    </Button>
  </div>
</template>

<style scoped>
.attacks-section {
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.75rem;
}

.attacks-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.75rem;
}

.attacks-table th {
  text-align: left;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid hsl(var(--border));
}

.attacks-table td {
  padding: 0.25rem;
}

.attacks-table :deep(input) {
  height: 36px;
  font-size: 0.9rem;
}

.col-name { width: 25%; }
.col-bonus { width: 15%; }
.col-damage { width: 25%; }
.col-notes { width: 30%; }
.col-action { width: 40px; }
</style>
