import { useEffect, useRef } from 'react'

export const useAutoSave = (data, onSave, delay = 10000) => {
  const timeoutRef = useRef()
  const previousDataRef = useRef()

  useEffect(() => {
    if (JSON.stringify(data) === JSON.stringify(previousDataRef.current)) return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      onSave(data)
      previousDataRef.current = data
    }, delay)

    return () => clearTimeout(timeoutRef.current)
  }, [data, onSave, delay])
}