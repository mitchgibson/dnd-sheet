<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import type { AbilityName } from '@/types/character'
import { SKILLS_BY_ABILITY } from '@/types/character'

const store = useCharacterStore()

const abilities: { key: AbilityName; label: string }[] = [
  { key: 'strength', label: 'STRENGTH' },
  { key: 'dexterity', label: 'DEXTERITY' },
  { key: 'constitution', label: 'CONSTITUTION' },
  { key: 'intelligence', label: 'INTELLIGENCE' },
  { key: 'wisdom', label: 'WISDOM' },
  { key: 'charisma', label: 'CHARISMA' },
]

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

function getSkill(name: string) {
  return store.character.skills.find(s => s.name === name)
}

function toggleSkillProf(skillName: string) {
  const skill = getSkill(skillName)
  if (!skill) return
  if (skill.expertise) {
    skill.expertise = false
    skill.proficiency = false
  } else if (skill.proficiency) {
    skill.expertise = true
  } else {
    skill.proficiency = true
  }
}

function getSlotKey(level: number): keyof typeof store.character.spellcasting.spellSlots {
  return `level${level}` as keyof typeof store.character.spellcasting.spellSlots
}

const lastSavedText = computed(() => {
  if (!store.lastSaved) return ''
  return `Saved ${store.lastSaved.toLocaleTimeString()}`
})

function handleReset() {
  if (confirm('Reset all character data?')) {
    store.resetCharacter()
  }
}
</script>

<template>
  <div class="sheet-container">
    <!-- App Header -->
    <header class="app-header">
      <h1>D&D 2024 Character Sheet</h1>
      <div class="header-right">
        <span v-if="lastSavedText" class="saved-text">{{ lastSavedText }}</span>
        <Button variant="destructive" size="sm" @click="handleReset">Reset</Button>
      </div>
    </header>

    <Tabs default-value="page1" class="sheet-tabs">
      <TabsList class="tabs-nav">
        <TabsTrigger value="page1">Page 1</TabsTrigger>
        <TabsTrigger value="page2">Page 2</TabsTrigger>
      </TabsList>

      <!-- PAGE 1 -->
      <TabsContent value="page1" class="page">
        <!-- Top Header Row -->
        <div class="header-row">
          <div class="header-field name-field">
            <Input v-model="store.character.name" />
            <span class="field-label">CHARACTER NAME</span>
          </div>
          <div class="header-field">
            <Input v-model="store.character.background" />
            <span class="field-label">BACKGROUND</span>
          </div>
          <div class="header-field">
            <Input v-model="store.character.class" />
            <span class="field-label">CLASS</span>
          </div>
          <div class="header-field small">
            <Input v-model.number="store.character.level" type="number" min="1" max="20" />
            <span class="field-label">LEVEL</span>
          </div>
        </div>

        <div class="header-row">
          <div class="header-field">
            <Input v-model="store.character.species" />
            <span class="field-label">SPECIES</span>
          </div>
          <div class="header-field">
            <Input v-model="store.character.subclass" />
            <span class="field-label">SUBCLASS</span>
          </div>
          <div class="header-field small">
            <Input v-model.number="store.character.experiencePoints" type="number" min="0" />
            <span class="field-label">XP</span>
          </div>
        </div>

        <!-- Combat Stats Row -->
        <div class="combat-row">
          <div class="combat-box">
            <Input v-model.number="store.character.combat.armorClass" type="number" class="big-input" />
            <span class="box-label">ARMOR CLASS</span>
          </div>
          <div class="combat-box">
            <div class="hp-grid">
              <div class="hp-cell">
                <Input v-model.number="store.character.combat.hitPointCurrent" type="number" />
                <span>Current</span>
              </div>
              <div class="hp-cell">
                <Input v-model.number="store.character.combat.hitPointTemporary" type="number" />
                <span>Temp</span>
              </div>
              <div class="hp-cell">
                <Input v-model.number="store.character.combat.hitPointMaximum" type="number" />
                <span>Max</span>
              </div>
            </div>
            <span class="box-label">HIT POINTS</span>
          </div>
          <div class="combat-box">
            <div class="dice-grid">
              <Input v-model="store.character.combat.hitDiceSpent" placeholder="0" />
              <Input v-model="store.character.combat.hitDiceMax" placeholder="1d10" />
            </div>
            <span class="box-label">HIT DICE (Spent / Max)</span>
          </div>
          <div class="combat-box">
            <div class="death-saves">
              <div class="death-line">
                <span>Success</span>
                <span v-for="i in 3" :key="'s'+i" 
                  class="circle" 
                  :class="{filled: store.character.combat.deathSaveSuccesses >= i}"
                  @click="store.character.combat.deathSaveSuccesses = store.character.combat.deathSaveSuccesses >= i ? i-1 : i"
                ></span>
              </div>
              <div class="death-line">
                <span>Failure</span>
                <span v-for="i in 3" :key="'f'+i" 
                  class="circle fail" 
                  :class="{filled: store.character.combat.deathSaveFailures >= i}"
                  @click="store.character.combat.deathSaveFailures = store.character.combat.deathSaveFailures >= i ? i-1 : i"
                ></span>
              </div>
            </div>
            <span class="box-label">DEATH SAVES</span>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-box"><div class="stat-val">+{{ store.proficiencyBonus }}</div><span>PROFICIENCY</span></div>
          <div class="stat-box"><div class="stat-val">{{ formatMod(store.character.combat.initiative) }}</div><span>INITIATIVE</span></div>
          <div class="stat-box"><Input v-model.number="store.character.combat.speed" type="number" /><span>SPEED</span></div>
          <div class="stat-box"><Input v-model="store.character.combat.size" /><span>SIZE</span></div>
          <div class="stat-box"><div class="stat-val">{{ store.character.combat.passivePerception }}</div><span>PASSIVE PERCEPTION</span></div>
        </div>

        <!-- Main Content -->
        <div class="main-grid">
          <!-- Left: Abilities -->
          <div class="abilities-column">
            <div v-for="ability in abilities" :key="ability.key" class="ability-block">
              <div class="ability-header">{{ ability.label }}</div>
              <div class="ability-content">
                <div class="score-area">
                  <div class="modifier">{{ formatMod(store.character.abilityScores[ability.key].modifier) }}</div>
                  <Input 
                    :model-value="store.character.abilityScores[ability.key].score"
                    @update:model-value="store.character.abilityScores[ability.key].score = Number($event)"
                    type="number" class="score-input" 
                  />
                </div>
                <div class="skills-area">
                  <div class="skill-line" @click="store.character.abilityScores[ability.key].savingThrowProficiency = !store.character.abilityScores[ability.key].savingThrowProficiency">
                    <span class="prof">{{ store.character.abilityScores[ability.key].savingThrowProficiency ? '●' : '○' }}</span>
                    <span class="bonus">{{ formatMod(store.character.abilityScores[ability.key].savingThrowBonus) }}</span>
                    <span class="name">Saving Throw</span>
                  </div>
                  <div v-for="skillName in SKILLS_BY_ABILITY[ability.key]" :key="skillName" class="skill-line" @click="toggleSkillProf(skillName)">
                    <span class="prof">
                      <template v-if="getSkill(skillName)?.expertise">◆</template>
                      <template v-else-if="getSkill(skillName)?.proficiency">●</template>
                      <template v-else>○</template>
                    </span>
                    <span class="bonus">{{ formatMod(getSkill(skillName)?.bonus || 0) }}</span>
                    <span class="name">{{ skillName }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Heroic Inspiration -->
            <div class="inspiration-box" @click="store.character.heroicInspiration = !store.character.heroicInspiration">
              <span class="insp-icon">{{ store.character.heroicInspiration ? '★' : '☆' }}</span>
              <span>HEROIC INSPIRATION</span>
            </div>

            <!-- Equipment Proficiencies -->
            <div class="prof-box">
              <div class="prof-title">EQUIPMENT TRAINING & PROFICIENCIES</div>
              <div class="armor-row">
                <span>Armor:</span>
                <label><Checkbox :checked="store.character.equipmentProficiencies.armorLight" @update:checked="store.character.equipmentProficiencies.armorLight = $event" /> Light</label>
                <label><Checkbox :checked="store.character.equipmentProficiencies.armorMedium" @update:checked="store.character.equipmentProficiencies.armorMedium = $event" /> Medium</label>
                <label><Checkbox :checked="store.character.equipmentProficiencies.armorHeavy" @update:checked="store.character.equipmentProficiencies.armorHeavy = $event" /> Heavy</label>
                <label><Checkbox :checked="store.character.equipmentProficiencies.armorShields" @update:checked="store.character.equipmentProficiencies.armorShields = $event" /> Shields</label>
              </div>
              <div class="prof-field"><span>Weapons:</span><Input v-model="store.character.equipmentProficiencies.weapons" /></div>
              <div class="prof-field"><span>Tools:</span><Input v-model="store.character.equipmentProficiencies.tools" /></div>
            </div>
          </div>

          <!-- Right: Features -->
          <div class="features-column">
            <!-- Attacks -->
            <div class="section-box">
              <div class="section-title">WEAPONS & DAMAGE CANTRIPS</div>
              <table class="attack-table">
                <thead>
                  <tr><th>Name</th><th>Atk/DC</th><th>Damage</th><th>Notes</th><th></th></tr>
                </thead>
                <tbody>
                  <tr v-for="atk in store.character.attacks" :key="atk.id">
                    <td><Input v-model="atk.name" /></td>
                    <td><Input v-model="atk.attackBonus" /></td>
                    <td><Input v-model="atk.damage" /></td>
                    <td><Input v-model="atk.notes" /></td>
                    <td><Button variant="ghost" size="sm" @click="store.removeAttack(atk.id)">✕</Button></td>
                  </tr>
                </tbody>
              </table>
              <Button variant="outline" size="sm" @click="store.addAttack()">+ Add</Button>
            </div>

            <!-- Class Features -->
            <div class="section-box">
              <div class="section-title">CLASS FEATURES</div>
              <Textarea v-model="store.character.classFeatures" rows="6" />
            </div>

            <!-- Species Traits / Feats -->
            <div class="two-col">
              <div class="section-box">
                <div class="section-title">SPECIES TRAITS</div>
                <Textarea v-model="store.character.speciesTraits" rows="4" />
              </div>
              <div class="section-box">
                <div class="section-title">FEATS</div>
                <Textarea v-model="store.character.feats" rows="4" />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <!-- PAGE 2 -->
      <TabsContent value="page2" class="page">
        <div class="page2-grid">
          <!-- Left: Spellcasting -->
          <div class="spell-column">
            <div class="spell-stats-box">
              <div class="spell-stat"><Input v-model="store.character.spellcasting.ability" /><span>ABILITY</span></div>
              <div class="spell-stat"><Input v-model.number="store.character.spellcasting.spellcastingModifier" type="number" /><span>MODIFIER</span></div>
              <div class="spell-stat"><Input v-model.number="store.character.spellcasting.saveDC" type="number" /><span>SAVE DC</span></div>
              <div class="spell-stat"><Input v-model.number="store.character.spellcasting.attackBonus" type="number" /><span>ATK BONUS</span></div>
            </div>

            <div class="slots-box">
              <div class="section-title">SPELL SLOTS</div>
              <div class="slots-grid">
                <div v-for="lvl in 9" :key="lvl" class="slot-item">
                  <span class="slot-lvl">{{ lvl }}</span>
                  <Input :model-value="store.character.spellcasting.spellSlots[getSlotKey(lvl)].total" @update:model-value="store.character.spellcasting.spellSlots[getSlotKey(lvl)].total = Number($event)" type="number" min="0" class="slot-input" />
                  <div class="slot-marks">
                    <span v-for="i in Math.max(store.character.spellcasting.spellSlots[getSlotKey(lvl)].total, 0)" :key="i" 
                      class="slot-mark" 
                      :class="{used: store.character.spellcasting.spellSlots[getSlotKey(lvl)].expended >= i}"
                      @click="store.character.spellcasting.spellSlots[getSlotKey(lvl)].expended = store.character.spellcasting.spellSlots[getSlotKey(lvl)].expended >= i ? i-1 : i"
                    >◇</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="spells-box">
              <div class="section-title">CANTRIPS & PREPARED SPELLS</div>
              <table class="spell-table">
                <thead><tr><th>Lv</th><th>Name</th><th>Time</th><th>Range</th><th>C</th><th>R</th><th>M</th><th></th></tr></thead>
                <tbody>
                  <tr v-for="sp in store.character.spellcasting.spells" :key="sp.id">
                    <td><Input :model-value="sp.level" @update:model-value="sp.level = Number($event)" type="number" min="0" max="9" /></td>
                    <td><Input v-model="sp.name" /></td>
                    <td><Input v-model="sp.castingTime" /></td>
                    <td><Input v-model="sp.range" /></td>
                    <td><span class="crm" :class="{on: sp.concentration}" @click="sp.concentration = !sp.concentration">◇</span></td>
                    <td><span class="crm" :class="{on: sp.ritual}" @click="sp.ritual = !sp.ritual">◇</span></td>
                    <td><span class="crm" :class="{on: sp.material}" @click="sp.material = !sp.material">◇</span></td>
                    <td><Button variant="ghost" size="sm" @click="store.removeSpell(sp.id)">✕</Button></td>
                  </tr>
                </tbody>
              </table>
              <Button variant="outline" size="sm" @click="store.addSpell(0)">+ Add Spell</Button>
            </div>
          </div>

          <!-- Right: Character Info -->
          <div class="info-column">
            <div class="section-box"><div class="section-title">APPEARANCE</div><Textarea v-model="store.character.personality.appearance" rows="4" /></div>
            <div class="section-box"><div class="section-title">ALIGNMENT</div><Input v-model="store.character.personality.alignment" /></div>
            <div class="section-box"><div class="section-title">BACKSTORY & PERSONALITY</div><Textarea v-model="store.character.personality.backstoryAndPersonality" rows="8" /></div>
            <div class="section-box"><div class="section-title">LANGUAGES</div><Textarea v-model="store.character.personality.languages" rows="2" /></div>
            <div class="section-box"><div class="section-title">EQUIPMENT</div><Textarea v-model="store.character.equipment" rows="6" /></div>
            <div class="section-box">
              <div class="section-title">MAGIC ITEM ATTUNEMENT</div>
              <div class="attune-list">
                <div class="attune-item"><span>◇</span><Input v-model="store.character.magicItemAttunement.slot1" /></div>
                <div class="attune-item"><span>◇</span><Input v-model="store.character.magicItemAttunement.slot2" /></div>
                <div class="attune-item"><span>◇</span><Input v-model="store.character.magicItemAttunement.slot3" /></div>
              </div>
            </div>
            <div class="section-box">
              <div class="section-title">COINS</div>
              <div class="coins-row">
                <div class="coin"><Input v-model.number="store.character.coins.copper" type="number" min="0" /><span>CP</span></div>
                <div class="coin"><Input v-model.number="store.character.coins.silver" type="number" min="0" /><span>SP</span></div>
                <div class="coin"><Input v-model.number="store.character.coins.electrum" type="number" min="0" /><span>EP</span></div>
                <div class="coin"><Input v-model.number="store.character.coins.gold" type="number" min="0" /><span>GP</span></div>
                <div class="coin"><Input v-model.number="store.character.coins.platinum" type="number" min="0" /><span>PP</span></div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>

    <footer class="app-footer">TM & © 2024 Wizards of the Coast LLC</footer>
  </div>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
</style>

<style scoped>
.sheet-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background: var(--background);
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 1rem;
}
.app-header h1 { margin: 0; font-size: 1.25rem; color: var(--primary); }
.header-right { display: flex; align-items: center; gap: 1rem; }
.saved-text { font-size: 0.75rem; color: var(--muted-foreground); }

.tabs-nav { width: 100%; margin-bottom: 1rem; }
.page { display: flex; flex-direction: column; gap: 1rem; }

/* Header rows */
.header-row { display: flex; gap: 0.75rem; }
.header-field { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; }
.header-field.name-field { flex: 2; }
.header-field.small { flex: 0 0 80px; }
.header-field :deep(input) { height: 38px; font-size: 0.95rem; }
.field-label { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; color: var(--muted-foreground); }

/* Combat row */
.combat-row { display: flex; gap: 0.75rem; }
.combat-box { flex: 1; padding: 0.75rem; background: var(--card); border: 1px solid var(--border); border-radius: 6px; text-align: center; }
.combat-box .big-input { height: 50px; font-size: 1.5rem; font-weight: 700; text-align: center; }
.box-label { display: block; margin-top: 0.5rem; font-size: 0.6rem; font-weight: 600; text-transform: uppercase; color: var(--muted-foreground); }
.hp-grid, .dice-grid { display: flex; gap: 0.5rem; justify-content: center; }
.hp-cell, .dice-grid { display: flex; flex-direction: column; align-items: center; gap: 0.125rem; }
.hp-cell :deep(input), .dice-grid :deep(input) { width: 60px; height: 36px; text-align: center; }
.hp-cell span { font-size: 0.55rem; color: var(--muted-foreground); }
.death-saves { text-align: left; }
.death-line { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; margin-bottom: 0.25rem; }
.circle { width: 16px; height: 16px; border: 2px solid var(--border); border-radius: 50%; cursor: pointer; display: inline-block; }
.circle.filled { background: #22c55e; border-color: #22c55e; }
.circle.fail.filled { background: #ef4444; border-color: #ef4444; }

/* Stats row */
.stats-row { display: flex; gap: 0.5rem; }
.stat-box { flex: 1; padding: 0.5rem; background: var(--card); border: 1px solid var(--border); border-radius: 6px; text-align: center; }
.stat-box .stat-val { font-size: 1.25rem; font-weight: 700; }
.stat-box span { display: block; font-size: 0.55rem; font-weight: 600; text-transform: uppercase; color: var(--muted-foreground); }
.stat-box :deep(input) { width: 70px; height: 32px; text-align: center; margin: 0 auto; display: block; }

/* Main grid */
.main-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1rem; }
.abilities-column { display: flex; flex-direction: column; gap: 0.75rem; }
.features-column { display: flex; flex-direction: column; gap: 0.75rem; }

/* Ability blocks */
.ability-block { background: var(--card); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
.ability-header { background: var(--muted); padding: 0.375rem 0.75rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; }
.ability-content { display: flex; padding: 0.5rem; gap: 0.75rem; }
.score-area { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; min-width: 70px; }
.modifier { font-size: 1.5rem; font-weight: 700; }
.score-input { width: 50px; height: 32px; text-align: center; }
.skills-area { flex: 1; display: flex; flex-direction: column; gap: 0.125rem; }
.skill-line { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.375rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
.skill-line:hover { background: var(--muted); }
.skill-line .prof { width: 14px; color: var(--primary); font-size: 0.75rem; }
.skill-line .bonus { width: 28px; font-weight: 600; }
.skill-line .name { flex: 1; }

/* Inspiration */
.inspiration-box { display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.75rem; background: var(--card); border: 1px solid var(--border); border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
.insp-icon { font-size: 1.5rem; color: var(--accent); }

/* Proficiencies */
.prof-box { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.75rem; }
.prof-title { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--muted-foreground); }
.armor-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; font-size: 0.85rem; margin-bottom: 0.5rem; }
.armor-row label { display: flex; align-items: center; gap: 0.25rem; cursor: pointer; }
.prof-field { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; margin-bottom: 0.375rem; }
.prof-field span { min-width: 55px; }
.prof-field :deep(input) { flex: 1; height: 32px; }

/* Section boxes */
.section-box { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.75rem; }
.section-title { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--muted-foreground); margin-bottom: 0.5rem; }
.section-box :deep(textarea) { width: 100%; font-size: 0.9rem; }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

/* Attack table */
.attack-table { width: 100%; border-collapse: collapse; margin-bottom: 0.5rem; }
.attack-table th { text-align: left; font-size: 0.6rem; font-weight: 600; text-transform: uppercase; color: var(--muted-foreground); padding: 0.25rem; border-bottom: 1px solid var(--border); }
.attack-table td { padding: 0.25rem; }
.attack-table :deep(input) { height: 32px; font-size: 0.85rem; }

/* Page 2 */
.page2-grid { display: grid; grid-template-columns: 1fr 320px; gap: 1rem; }
.spell-column, .info-column { display: flex; flex-direction: column; gap: 0.75rem; }

.spell-stats-box { display: flex; gap: 0.75rem; background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.75rem; }
.spell-stat { flex: 1; text-align: center; }
.spell-stat :deep(input) { width: 100%; height: 36px; text-align: center; font-weight: 600; }
.spell-stat span { display: block; font-size: 0.55rem; font-weight: 600; text-transform: uppercase; color: var(--muted-foreground); margin-top: 0.25rem; }

.slots-box { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.75rem; }
.slots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
.slot-item { display: flex; align-items: center; gap: 0.375rem; }
.slot-lvl { font-weight: 700; font-size: 0.8rem; min-width: 20px; }
.slot-input { width: 40px; height: 28px; text-align: center; font-size: 0.85rem; }
.slot-marks { display: flex; gap: 0.125rem; }
.slot-mark { cursor: pointer; color: var(--muted-foreground); }
.slot-mark.used { color: var(--primary); }

.spells-box { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.75rem; flex: 1; }
.spell-table { width: 100%; border-collapse: collapse; margin-bottom: 0.5rem; }
.spell-table th { text-align: left; font-size: 0.55rem; font-weight: 600; text-transform: uppercase; color: var(--muted-foreground); padding: 0.25rem; border-bottom: 1px solid var(--border); }
.spell-table td { padding: 0.25rem; }
.spell-table :deep(input) { height: 28px; font-size: 0.8rem; }
.crm { cursor: pointer; color: var(--muted-foreground); }
.crm.on { color: var(--primary); }

.attune-list { display: flex; flex-direction: column; gap: 0.375rem; }
.attune-item { display: flex; align-items: center; gap: 0.5rem; }
.attune-item span { color: var(--accent); }
.attune-item :deep(input) { flex: 1; height: 32px; }

.coins-row { display: flex; gap: 0.5rem; }
.coin { flex: 1; text-align: center; }
.coin :deep(input) { width: 100%; height: 36px; text-align: center; font-weight: 600; }
.coin span { display: block; font-size: 0.7rem; font-weight: 700; color: var(--muted-foreground); margin-top: 0.25rem; }

.app-footer { text-align: center; padding: 1rem; font-size: 0.65rem; color: var(--muted-foreground); }

@media (max-width: 900px) {
  .main-grid, .page2-grid { grid-template-columns: 1fr; }
}
</style>
