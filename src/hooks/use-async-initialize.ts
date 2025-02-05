import { useEffect, useState } from 'react'

/**
 * Asynchronous state initialization using dependency array
 */
export function useAsyncInitialize<T>(
  func: () => Promise<T>,
  deps: unknown[] = []
) {
  const [state, setState] = useState<T | undefined>()
  useEffect(() => {
    ;(async () => {
      setState(await func())
    })()
  }, deps)

  return state
}
