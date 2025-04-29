<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import html2canvas from 'html2canvas'

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
    backgroundColor: '#32CD32',
    scale: 2,
  })

  const link = document.createElement('a')
  link.download = 'field.jpg'
  link.href = canvas.toDataURL('image/jpeg', 1.0)
  link.click()
}

const selectedTactic = ref('3-1-4-2')

const players = ref([
  { number: 1, position: 'gk', name: 'Паша', nickname: 'Roxman_ua' },
  { number: 6, position: 'rcb', name: 'Паша', nickname: 'Mr_Filnyuk' },
  { number: 42, position: 'cb', name: 'Влад', nickname: 'zouonrails' },
  { number: 31, position: '', name: 'Елік', nickname: 'stealth-maze7' },
  { number: 2, position: 'lcb', name: 'Анатолій', nickname: 'Dawa-bro' },
  { number: 13, position: 'rcm', name: 'Артур', nickname: 'Ur mom s dad503' },
  { number: 5, position: 'rm', name: 'Іван', nickname: 'ivan052000' },
  { number: 7, position: 'lm', name: 'Андрій', nickname: 'Narutooaa' },
  { number: 0, position: 'cam', name: 'Kevin', nickname: 'KevinSinister' },
  { number: 0, position: 'lcm', name: 'Vlad', nickname: 'Xngvld' },
])

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
  return players.value.find((p) => p.position === posName)
}

const addPlayer = () => {
  players.value.push({
    number: 99,
    position: '',
    name: '',
    nickname: '',
  })
}

watch(selectedTactic, (newVal) => {
  console.log(`Тактика изменена на: ${newVal}`)
})
</script>

<template>
  <main>
    <div class="flex flex-row gap-8 p-0">
      <div class="p-0">
        <div class="shadow-black/50 shadow-md m-4">
          <div id="field" ref="fieldRef" class="">
            <img
              src="@/assets/field-bg.png"
              alt=""
              style="display: block; width: 100%; height: 100%"
            />
            <div
              v-for="(pos, index) in currentFormation.positions"
              :key="index"
              class="absolute flex flex-col items-center"
              :style="{
                left: pos.x + '%',
                top: pos.y + '%',
                transform: 'translate(-50%, -50%)',
              }"
            >
              <img src="@/assets/shirt.png" alt="" class="w-14 h-12 absolute" />
              <div
                class="relative w-14 h-12 text-red-800 flex flex-col items-center justify-center font-bold text-sm text-center p-0 m-0"
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
          <label for="tactic" class="block mb-1 text-sm font-medium text-gray-700 uppercase">
            Тактика
          </label>
          <select
            v-model="selectedTactic"
            class="w-full md:w-64 p-2 rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 text-sm"
          >
            <option v-for="(formation, key) in formations" :key="key">
              {{ formation.name }}
            </option>
          </select>

          <button
            class="mb-4 mr-2 ml-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            @click="exportFieldAsJPEG"
          >
            JPEG
          </button>
          <button
            @click="addPlayer"
            class="mb-4 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 hover:bg-green-700"
          >
            Додати
          </button>
        </div>

        <table class="min-w-full border border-green-300 rounded-xl overflow-hidden">
          <thead class="bg-green-200 text-left">
            <tr>
              <th class="p-3 border-b border-green-300">#</th>
              <th class="p-3 border-b border-green-300">Позиція</th>
              <th class="p-3 border-b border-green-300">Нікнейм</th>
              <th class="p-3 border-b border-green-300">Імʼя</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="player in players" :key="player.nickname" class="border-b even:bg-gray-50">
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
                  v-model="player.nickname"
                  type="text"
                  class="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                />
              </td>
              <td class="p-2 border-b">
                <input
                  v-model="player.name"
                  type="text"
                  class="w-full px-2 py-1 border border-gray-200 rounded text-sm"
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
#field {
  width: 540px;
  height: 446px;
  position: relative;
}
</style>
