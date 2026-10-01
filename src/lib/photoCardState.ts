export type CardState = 'center' | 'up-1' | 'up-2' | 'down-1' | 'down-2' | 'hidden'
export function photoCardState(index: number, current: number, count: number): CardState {
  const offset = (index - current + count) % count
  if (offset === 0) return 'center'
  if (offset === 1) return 'down-1'
  if (offset === count - 1) return 'up-1'
  if (offset === 2) return 'down-2'
  if (offset === count - 2) return 'up-2'
  return 'hidden'
}

