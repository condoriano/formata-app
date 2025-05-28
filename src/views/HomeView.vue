<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import html2canvas from 'html2canvas'

const PLAYERS_STORAGE_KEY = 'formata-players'
const GRID_SIZE = 5

function snapToGrid(value: number, gridSize = 5) {
  return Math.round(value / gridSize) * gridSize
}

type Player = {
  number: number
  position: string
  name: string
  nickname: string
}

type Position = {
  x: number
  y: number
  name: string
}

type Formation = {
  name: string
  positions: Position[]
}

const fieldRef = ref(null)

const exportFieldAsJPEG = async () => {
  if (!fieldRef.value) return

  const canvas = await html2canvas(fieldRef.value, {
    backgroundColor: 'white',
    scale: 2,
  })

  const link = document.createElement('a')
  link.download = 'field.jpg'
  link.href = canvas.toDataURL('image/jpeg', 1.0)
  link.click()
}

const selectedTactic = ref('3-1-4-2')

const players = ref<Player[]>([])

const formations: Record<string, Formation> = {
  '3-1-4-2': {
    name: '3-1-4-2',
    positions: [
      { x: 50, y: 87, name: 'gk' },

      { x: 30, y: 70, name: 'lcb' },
      { x: 50, y: 66, name: 'cb' },
      { x: 70, y: 70, name: 'rcb' },

      { x: 50, y: 32, name: 'cam' },

      { x: 20, y: 42, name: 'lm' },
      { x: 40, y: 47, name: 'lcm' },
      { x: 60, y: 47, name: 'rcm' },
      { x: 80, y: 42, name: 'rm' },

      { x: 40, y: 20, name: 'lf' },
      { x: 60, y: 20, name: 'rf' },
    ],
  },
  '4-2-2-2': {
    name: '4-2-2-2',
    positions: [
      { x: 50, y: 90, name: 'gk' },
      { x: 61, y: 71, name: 'rcb' },
      { x: 39, y: 71, name: 'lcb' },
      { x: 19, y: 68, name: 'lb' },
      { x: 81, y: 68, name: 'rb' },
      { x: 39, y: 46, name: 'ldm' },
      { x: 60, y: 46, name: 'rdm' },
      { x: 26, y: 27, name: 'lam' },
      { x: 74, y: 27, name: 'ram' },
      { x: 40, y: 16, name: 'lf' },
      { x: 60, y: 16, name: 'rf' },
    ],
  },
  '4-3-3': {
    name: '4-3-3',
    positions: [
      { x: 50, y: 90, name: 'gk' },
      { x: 61, y: 72, name: 'rcb' },
      { x: 39, y: 72, name: 'lcb' },
      { x: 17, y: 72, name: 'lb' },
      { x: 82, y: 72, name: 'rb' },
      { x: 26, y: 50, name: 'lcm' },
      { x: 74, y: 50, name: 'rcm' },
      { x: 50, y: 50, name: 'cdm' },
      { x: 26, y: 28, name: 'lw' },
      { x: 74, y: 28, name: 'rw' },
      { x: 50, y: 28, name: 'st' },
    ],
  },
  '4-3-3 (4-1-2-3) a': {
    name: '4-3-3 (4-1-2-3) a',
    positions: [
      { x: 50, y: 90, name: 'gk' },
      { x: 61, y: 71, name: 'rcb' },
      { x: 39, y: 71, name: 'lcb' },
      { x: 19, y: 65, name: 'lb' },
      { x: 81, y: 65, name: 'rb' },
      { x: 35, y: 41, name: 'lcm' },
      { x: 65, y: 41, name: 'rcm' },
      { x: 50, y: 54, name: 'cdm' },
      { x: 19, y: 23, name: 'lw' },
      { x: 80, y: 23, name: 'rw' },
      { x: 50, y: 16, name: 'st' },
    ],
  },
  '4-5-1': {
    name: '4-5-1',
    positions: [
      { x: 50, y: 90, name: 'gk' },
      { x: 61, y: 66, name: 'rcb' },
      { x: 39, y: 66, name: 'lcb' },
      { x: 17, y: 66, name: 'lb' },
      { x: 82, y: 66, name: 'rb' },

      { x: 12, y: 40, name: 'lw' },
      { x: 31, y: 40, name: 'lcm' },
      { x: 50, y: 40, name: 'cdm' },
      { x: 68, y: 40, name: 'rcm' },
      { x: 88, y: 40, name: 'rw' },

      { x: 50, y: 16, name: 'st' },
    ],
  },
  '4-4-2': {
    name: '4-4-2',
    positions: [
      { x: 50, y: 90, name: 'gk' },

      { x: 61, y: 66, name: 'rcb' },
      { x: 39, y: 66, name: 'lcb' },
      { x: 17, y: 66, name: 'lb' },
      { x: 82, y: 66, name: 'rb' },

      { x: 17, y: 40, name: 'lw' },
      { x: 39, y: 40, name: 'lcm' },
      { x: 61, y: 40, name: 'rcm' },
      { x: 82, y: 40, name: 'rw' },

      { x: 39, y: 16, name: 'lf' },
      { x: 61, y: 16, name: 'rf' },
    ],
  },
}

const currentFormation = computed(() => formations[selectedTactic.value] || [])

const findPlayerByPosition = (posName: string) => {
  return players.value.find((p: Player) => p.position.toLowerCase() === posName.toLowerCase())
}

const addPlayer = () => {
  players.value.push({
    number: 99,
    position: '',
    name: '',
    nickname: '',
  })
}

onMounted(() => {
  const saved = localStorage.getItem(PLAYERS_STORAGE_KEY)
  if (saved) {
    try {
      players.value = JSON.parse(saved)
    } catch {
      players.value = []
    }
  }
})

watch(
  players,
  (newVal) => {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(newVal))
  },
  { deep: true },
)

watch(selectedTactic, (newVal) => {
  console.log(`Тактика изменена на: ${newVal}`)
})

const selectedFormationPositions = ref<Position[]>([])

watch(
  selectedTactic,
  () => {
    selectedFormationPositions.value = formations[selectedTactic.value]
      ? formations[selectedTactic.value].positions.map((pos) => ({ ...pos }))
      : []
  },
  { immediate: true },
)

const draggingIndex = ref<number | null>(null)
const offset = ref({ x: 0, y: 0 })

const onPositionMouseDown = (idx: number, event: MouseEvent) => {
  draggingIndex.value = idx
  if (!fieldRef.value) return
  const fieldRect = (fieldRef.value as HTMLElement).getBoundingClientRect()
  const pos = selectedFormationPositions.value[idx]
  offset.value = {
    x: event.clientX - (fieldRect.left + (pos.x / 100) * fieldRect.width),
    y: event.clientY - (fieldRect.top + (pos.y / 100) * fieldRect.height),
  }
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event: MouseEvent) => {
  if (draggingIndex.value === null || !fieldRef.value) return
  const fieldRect = (fieldRef.value as HTMLElement).getBoundingClientRect()
  let newX = ((event.clientX - fieldRect.left - offset.value.x) / fieldRect.width) * 100
  let newY = ((event.clientY - fieldRect.top - offset.value.y) / fieldRect.height) * 100

  // Clamp within field
  newX = Math.max(0, Math.min(100, newX))
  newY = Math.max(0, Math.min(100, newY))

  // Snap to grid
  newX = snapToGrid(newX, GRID_SIZE)
  newY = snapToGrid(newY, GRID_SIZE)

  selectedFormationPositions.value[draggingIndex.value].x = newX
  selectedFormationPositions.value[draggingIndex.value].y = newY
}

const onMouseUp = () => {
  draggingIndex.value = null
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <main class="p-5">
    <div class="flex flex-row gap-4 p-0">
      <div class="p-0 m-4">
        <div class="m-0 field-wrapper">
          <div id="field" ref="fieldRef" class="p-6">
            <div
              class="font-bold text-white text-center w-max max-w-[150px] p-0 m-0 text-xl uppercase"
            >
              {{ selectedTactic }}
            </div>
            <img
              class="bg-img"
              src="@/assets/field-bg.png"
              alt=""
              style="display: block; width: 100%; height: 100%"
            />
            <div
              v-for="(pos, index) in selectedFormationPositions"
              :key="index"
              class="absolute flex flex-col items-center"
              :style="{
                left: pos.x + '%',
                top: pos.y + '%',
                transform: 'translate(-50%, -50%)',
                zIndex: draggingIndex === index ? 10 : 1,
              }"
              @mousedown="onPositionMouseDown(index, $event)"
            >
              <img src="@/assets/shirt.png" alt="" class="w-14 h-12 absolute" />
              <div
                class="relative cursor-grab select-none w-14 h-12 text-red-800 flex flex-col items-center justify-center font-bold text-sm text-center p-0 m-0"
              >
                {{ findPlayerByPosition(pos.name)?.number || pos.name.toUpperCase() }}
              </div>

              <div
                class="font-bold text-white text-center w-max max-w-[150px] p-0 m-0 text-xs uppercase"
                style="text-shadow: black 0px 0px 3px"
                v-html="findPlayerByPosition(pos.name)?.nickname || '&nbsp;'"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 p-4">
        <div class="mb-4">
          <div class="mb-4">
            <label for="tactic" class="block mb-1 text-sm font-medium text-gray-700 uppercase">
              Тактика
            </label>
            <select
              v-model="selectedTactic"
              class="w-full h-10 md:w-64 bg-white p-2 rounded-md border border-gray-300 focus:ring-sky-500 focus:border-sky-500 text-sm"
            >
              <option v-for="(formation, key) in formations" :key="key">
                {{ formation.name }}
              </option>
            </select>
          </div>

          <button
            class="h-10 mb-4 mr-2 px-4 py-1 bg-sky-800 text-white rounded hover:bg-sky-700 cursor-pointer"
            @click="exportFieldAsJPEG"
          >
            Завантажити JPEG
          </button>
          <button
            @click="addPlayer"
            class="h-10 mb-4 px-4 py-1 bg-sky-800 text-white rounded hover:bg-sky-700 cursor-pointer"
          >
            Додати гравця
          </button>
        </div>

        <table class="min-w-full border rounded-sm overflow-hidden">
          <thead class="bg-white text-left">
            <tr>
              <th class="p-3 border-b">#</th>
              <th class="p-3 border-b">Позиція</th>
              <th class="p-3 border-b">Нікнейм</th>
              <th class="p-3 border-b">Імʼя</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(player, idx) in players" :key="idx" class="border-b even:bg-gray-50">
              <td class="p-2 w-16 border-b">
                <input
                  v-model="player.number"
                  type="text"
                  class="w-full px-2 py-1 border border-white rounded text-sm text-center"
                />
              </td>
              <td class="p-2 w-[90px] border-b">
                <input
                  v-model="player.position"
                  type="text"
                  class="w-full px-2 py-1 border border-white rounded text-sm text-center"
                />
              </td>
              <td class="p-2 border-b">
                <input
                  name="player-nickname"
                  v-model="player.nickname"
                  type="text"
                  class="w-full px-2 py-1 border border-white rounded text-sm"
                />
              </td>
              <td class="p-2 border-b">
                <input
                  v-model="player.name"
                  type="text"
                  class="w-full px-2 py-1 border border-white rounded text-sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style lang="less">
body {
  background: white;
}

#field {
  border: 2px solid #588293;
  border-radius: 4px;
  width: 640px;
  height: 367px;
  position: relative;
  background: url('@/assets/bgbg.jpg');
  background-position: 0 0;
  background-size: cover;
  background-repeat: no-repeat;

  img.bg-img {
    opacity: 0.9;
    filter: drop-shadow(2px 4px 14px black);
    -webkit-filter: drop-shadow(2px 4px 14px black);
    -moz-filter: drop-shadow(2px 4px 14px black);
  }
}
</style>
