<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
const open = ref(false)

function handleNew() {
  store.newCharacter()
  open.value = false
}

async function handleLoad(fileName: string) {
  await store.loadCharacter(fileName)
  open.value = false
}

async function handleDelete(fileName: string, event: Event) {
  event.stopPropagation()
  if (confirm(`Delete this character? This cannot be undone.`)) {
    await store.deleteCharacter(fileName)
  }
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="char-trigger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        Characters
      </Button>
    </DialogTrigger>
    <DialogContent class="char-dialog">
      <DialogHeader>
        <DialogTitle>Characters</DialogTitle>
      </DialogHeader>
      
      <div class="char-content">
        <Button variant="default" class="new-char-btn" @click="handleNew">
          + Create New Character
        </Button>
        
        <div v-if="store.characters.length > 0" class="char-list">
          <div 
            v-for="c in store.characters" 
            :key="c.fileName" 
            class="char-card"
            :class="{ active: c.fileName === store.currentFileName }"
            @click="handleLoad(c.fileName)"
          >
            <div class="char-main">
              <div class="char-name">{{ c.name }}</div>
              <div class="char-details">
                Level {{ c.level }} {{ c.class || 'Adventurer' }}
              </div>
            </div>
            <button 
              class="delete-btn" 
              @click="handleDelete(c.fileName, $event)"
              title="Delete character"
            >
              ✕
            </button>
          </div>
        </div>
        
        <p v-else class="no-chars">
          No saved characters yet. Create your first one!
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.char-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  flex-shrink: 0;
}

.char-dialog {
  max-width: 450px;
}

.char-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.new-char-btn {
  width: 100%;
  height: 44px;
  font-size: 1rem;
}

.char-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.char-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--muted);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}

.char-card:hover {
  background: var(--accent);
  border-color: var(--border);
}

.char-card.active {
  border-color: var(--primary);
  background: var(--primary)/10;
}

.char-main {
  flex: 1;
}

.char-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--foreground);
}

.char-details {
  font-size: 0.85rem;
  color: var(--muted-foreground);
  margin-top: 0.125rem;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--muted-foreground);
  font-size: 0.9rem;
  transition: all 0.15s;
}

.delete-btn:hover {
  background: hsl(0 84% 60%);
  color: white;
}

.no-chars {
  text-align: center;
  color: var(--muted-foreground);
  padding: 2rem 1rem;
  font-size: 0.95rem;
}
</style>
