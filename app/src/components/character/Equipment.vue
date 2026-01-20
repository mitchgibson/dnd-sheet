<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()
</script>

<template>
  <div class="equipment-section">
    <!-- Equipment -->
    <div class="section-box">
      <Label class="section-label">Equipment</Label>
      <Textarea
        v-model="store.character.equipment"
        placeholder="Longsword, chain mail, shield, explorer's pack..."
        rows="8"
      />
    </div>

    <!-- Magic Item Attunement -->
    <div class="section-box">
      <Label class="section-label">Magic Item Attunement</Label>
      <div class="attunement-list">
        <div class="attunement-item">
          <span class="diamond">◇</span>
          <Input v-model="store.character.magicItemAttunement.slot1" placeholder="Attuned item 1" />
        </div>
        <div class="attunement-item">
          <span class="diamond">◇</span>
          <Input v-model="store.character.magicItemAttunement.slot2" placeholder="Attuned item 2" />
        </div>
        <div class="attunement-item">
          <span class="diamond">◇</span>
          <Input v-model="store.character.magicItemAttunement.slot3" placeholder="Attuned item 3" />
        </div>
      </div>
    </div>

    <!-- Coins -->
    <div class="section-box">
      <Label class="section-label">Coins</Label>
      <div class="coins-row">
        <div class="coin">
          <Input v-model.number="store.character.coins.copper" type="number" min="0" />
          <span class="coin-label">CP</span>
        </div>
        <div class="coin">
          <Input v-model.number="store.character.coins.silver" type="number" min="0" />
          <span class="coin-label">SP</span>
        </div>
        <div class="coin">
          <Input v-model.number="store.character.coins.electrum" type="number" min="0" />
          <span class="coin-label">EP</span>
        </div>
        <div class="coin">
          <Input v-model.number="store.character.coins.gold" type="number" min="0" />
          <span class="coin-label">GP</span>
        </div>
        <div class="coin">
          <Input v-model.number="store.character.coins.platinum" type="number" min="0" />
          <span class="coin-label">PP</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.equipment-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-box {
  padding: 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}

.section-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.5rem;
}

.section-box :deep(textarea) {
  font-size: 0.9rem;
  min-height: 150px;
}

.attunement-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.attunement-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.diamond {
  font-size: 1.25rem;
  color: hsl(var(--primary));
}

.attunement-item :deep(input) {
  height: 40px;
  font-size: 0.9rem;
}

.coins-row {
  display: flex;
  gap: 0.75rem;
}

.coin {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.coin :deep(input) {
  height: 45px;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
}

.coin-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
}
</style>
