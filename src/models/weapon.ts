import { Unit } from './unit'

type Weapon = {
  id: number
  unit: Unit['id']
  name: string
  range?: string
  a: string
  bs_ws: string
  s: string
  ap: string
  d: string
}
export { type Weapon }
