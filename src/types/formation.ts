export type Player = {
  number: number
  position: string
  name: string
  nickname: string
}

export type Position = {
  x: number
  y: number
  name: string
}

export type Formation = {
  name: string
  positions: Position[]
}
