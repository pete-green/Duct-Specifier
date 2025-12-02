'use client'

import Link from 'next/link'
import { DuctPiece } from '@/types'
import DuctDiagram from './DuctDiagram'

interface CatalogCardProps {
  piece: DuctPiece
}

export default function CatalogCard({ piece }: CatalogCardProps) {
  return (
    <Link href={`/catalog/${piece.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer">
        <div className="p-4 bg-gray-50">
          <DuctDiagram ductPieceId={piece.id} showLabels={true} />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900">{piece.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{piece.description}</p>
          <div className="mt-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {piece.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
