import { useEffect, useState } from 'react'

const IS_SERVER = typeof window === 'undefined'

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  useEffect(() => {
    if (IS_SERVER) {
      return
    }

    const matchMedia = window.matchMedia(query)
    
    // Handle change
    const handleChange = () => {
      setMatches(getMatches(query))
    }

    // Listen for changes
    matchMedia.addEventListener('change', handleChange)

    // Check on mount (callback is not called until a change occurs)
    if (matches !== getMatches(query)) {
      handleChange()
    }

    // Cleanup
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query, matches])

  return matches
} 