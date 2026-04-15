import type { Formation } from '@/types/formation'

export const formations: Record<string, Formation> = {
  '4-3-3 (4-1-2-3) a': {
    name: '4-3-3 (4-1-2-3) a',
    positions: [
      { x: 50, y: 90, name: 'gk' },
      { x: 61, y: 71, name: 'rcb' },
      { x: 39, y: 71, name: 'lcb' },
      { x: 19, y: 65, name: 'lb' },
      { x: 81, y: 65, name: 'rb' },
      { x: 35, y: 45, name: 'lcm' },
      { x: 65, y: 45, name: 'rcm' },
      { x: 50, y: 54, name: 'cdm' },
      { x: 25, y: 30, name: 'lw' },
      { x: 75, y: 30, name: 'rw' },
      { x: 50, y: 25, name: 'st' },
    ],
  },
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
