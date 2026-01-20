<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()
</script>

<template>
  <div class="features-section">
    <!-- Class Features -->
    <div class="section-box">
      <Label class="section-label">Class Features</Label>
      <Textarea
        v-model="store.character.classFeatures"
        placeholder="Fighting Style, Second Wind, Action Surge..."
        rows="8"
      />
    </div>

    <!-- Species Traits & Feats side by side -->
    <div class="split-row">
      <div class="section-box">
        <Label class="section-label">Species Traits</Label>
        <Textarea
          v-model="store.character.speciesTraits"
          placeholder="Darkvision, Fey Ancestry..."
          rows="5"
        />
      </div>
      <div class="section-box">
        <Label class="section-label">Feats</Label>
        <Textarea
          v-model="store.character.feats"
          placeholder="Great Weapon Master, Sentinel..."
          rows="5"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-section {
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
}

.split-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
