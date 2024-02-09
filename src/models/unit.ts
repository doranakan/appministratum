import { Codex } from './codex'

type Unit = {
  id: number
  codex: Codex['id']
  name: string
  caption?: string
  leader: boolean
  limit: number
  tier1: number
}

export type { Unit }
