<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fieldHelp, type HelpInfo } from '@/data/fieldHelp'

const props = defineProps<{
  field: string
}>()

const open = ref(false)

const info = fieldHelp[props.field] || {
  title: 'Information',
  description: 'No additional information available for this field.'
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <button class="info-btn" type="button" title="More info">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
      </button>
    </DialogTrigger>
    <DialogContent class="info-dialog">
      <DialogHeader>
        <DialogTitle>{{ info.title }}</DialogTitle>
      </DialogHeader>
      <DialogDescription as="div" class="info-content">
        <p v-for="(para, i) in info.description.split('\n\n')" :key="i" class="info-para">
          {{ para }}
        </p>
        <p v-if="info.example" class="info-example">{{ info.example }}</p>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.info-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted-foreground);
  border-radius: 50%;
  transition: all 0.15s;
  vertical-align: middle;
  margin-left: 4px;
}

.info-btn:hover {
  color: var(--primary);
  background: var(--muted);
}

.info-dialog {
  max-width: 500px;
}

.info-content {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--foreground);
}

.info-para {
  margin: 0 0 0.75rem 0;
  white-space: pre-line;
}

.info-para:last-child {
  margin-bottom: 0;
}

.info-example {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: var(--muted);
  border-radius: 6px;
  font-size: 0.85rem;
  font-style: italic;
}
</style>
