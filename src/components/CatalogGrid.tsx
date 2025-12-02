'use client'

import { DuctPiece } from '@/types'
import CatalogCard from './CatalogCard'

interface CatalogGridProps {
  pieces: DuctPiece[]
  className?: string
}

export default function CatalogGrid({ pieces, className = '' }: CatalogGridProps) {
  if (pieces.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No duct pieces found in the catalog.</p>
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {pieces.map((piece) => (
        <CatalogCard key={piece.id} piece={piece} />
      ))}
    </div>
  )
}
