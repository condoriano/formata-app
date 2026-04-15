import { ref, watch, onMounted } from 'vue'
import type { Player } from '@/types/formation'

const PLAYERS_STORAGE_KEY = 'formata-players'

export function usePlayers() {
  const players = ref<Player[]>([])

  const addPlayer = () => {
    players.value.push({
      number: 99,
      position: '',
      name: '',
      nickname: '',
    })
  }

  const findPlayerByPosition = (posName: string) => {
    return players.value.find((p) => p.position.toLowerCase() === posName.toLowerCase())
  }

  onMounted(() => {
    const saved = localStorage.getItem(PLAYERS_STORAGE_KEY)
    if (!saved) return

    try {
      players.value = JSON.parse(saved)
    } catch {
      players.value = []
    }
  })

  watch(
    players,
    (newVal) => {
      localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true },
  )

  return {
    players,
    addPlayer,
    findPlayerByPosition,
  }
}
