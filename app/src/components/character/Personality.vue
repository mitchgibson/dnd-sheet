<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const store = useCharacterStore()
</script>

<template>
  <div class="personality-section">
    <!-- Appearance -->
    <div class="section-box">
      <Label class="section-label">Appearance</Label>
      <Textarea
        v-model="store.character.personality.appearance"
        placeholder="Physical description, distinguishing features, clothing style..."
        rows="5"
      />
    </div>

    <!-- Alignment -->
    <div class="section-box small">
      <Label class="section-label">Alignment</Label>
      <Input v-model="store.character.personality.alignment" placeholder="Neutral Good" />
    </div>

    <!-- Backstory & Personality -->
    <div class="section-box">
      <Label class="section-label">Backstory & Personality</Label>
      <Textarea
        v-model="store.character.personality.backstoryAndPersonality"
        placeholder="Character history, personality traits, ideals, bonds, flaws..."
        rows="10"
      />
    </div>

    <!-- Languages -->
    <div class="section-box">
      <Label class="section-label">Languages</Label>
      <Textarea
        v-model="store.character.personality.languages"
        placeholder="Common, Elvish, Dwarvish..."
        rows="3"
      />
    </div>
  </div>
</template>

<style scoped>
.personality-section {
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

.section-box.small {
  padding: 0.75rem 1rem;
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

.section-box :deep(input) {
  height: 40px;
  font-size: 1rem;
}
</style>
