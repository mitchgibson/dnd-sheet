<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Spell } from '@/types/character'

const props = defineProps<{
  spell: Spell
}>()

const open = ref(false)

const noteCount = computed(() => {
  if (!props.spell.notes || props.spell.notes.trim() === '') return 0
  // Count non-empty lines as notes
  return props.spell.notes.split('\n').filter(line => line.trim()).length
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <button class="notes-btn" :class="{ 'has-notes': noteCount > 0 }" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        <span v-if="noteCount > 0" class="note-count">{{ noteCount }}</span>
      </button>
    </DialogTrigger>
    <DialogContent class="notes-dialog">
      <DialogHeader>
        <DialogTitle>Notes: {{ spell.name || 'Unnamed Spell' }}</DialogTitle>
      </DialogHeader>
      <div class="notes-content">
        <Textarea
          v-model="spell.notes"
          placeholder="Add notes about this spell...&#10;&#10;• Components and costs&#10;• Damage at higher levels&#10;• Tactical tips&#10;• Flavor text"
          rows="10"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.notes-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 36px;
  height: 32px;
  padding: 0 8px;
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--muted-foreground);
  transition: all 0.15s;
}

.notes-btn:hover {
  background: var(--accent);
  color: var(--accent-foreground);
}

.notes-btn.has-notes {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.note-count {
  font-size: 0.75rem;
  font-weight: 700;
}

.notes-dialog {
  max-width: 500px;
}

.notes-content {
  margin-top: 1rem;
}

.notes-content :deep(textarea) {
  min-height: 200px;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
