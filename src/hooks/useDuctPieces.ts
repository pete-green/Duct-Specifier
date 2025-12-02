'use client'

import { useState, useEffect } from 'react'
import { DuctPieceWithDimensions } from '@/types'
import { getCatalogItems, getCatalogItem, getCategories } from '@/lib/catalog-data'

/**
 * Hook for accessing duct piece catalog data
 * Currently uses static data, but can be extended to fetch from Supabase
 */
export function useDuctPieces() {
  const [pieces, setPieces] = useState<DuctPieceWithDimensions[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load catalog data (static for now, could be async Supabase call)
    setPieces(getCatalogItems())
    setCategories(getCategories())
    setIsLoading(false)
  }, [])

  return {
    pieces,
    categories,
    isLoading,
    getPiece: getCatalogItem,
  }
}
