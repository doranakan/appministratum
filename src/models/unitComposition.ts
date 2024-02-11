import { Model } from './model'
import { UnitTier } from './unitTier'

type UnitComposition = {
  id: number
  unit_tier: UnitTier['id']
  model: Model['id']
  count: number
}

export type { UnitComposition }
