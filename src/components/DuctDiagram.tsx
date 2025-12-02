'use client'

import { ProjectItemDimension } from '@/types'
import YBranch13SVG from '@/lib/svg-templates/y-branch-13'

interface DuctDiagramProps {
  ductPieceId: string
  dimensions?: ProjectItemDimension[]
  showLabels?: boolean
  className?: string
}

/**
 * Renders the appropriate SVG diagram for a duct piece
 * Supports both label mode (A, B, C) and measurement mode (12", 8 1/2", etc.)
 */
export default function DuctDiagram({
  ductPieceId,
  dimensions = [],
  showLabels = true,
  className = '',
}: DuctDiagramProps) {
  // Map duct piece IDs to their SVG components
  const getSVGComponent = () => {
    switch (ductPieceId) {
      case 'y-branch-13':
        return (
          <YBranch13SVG
            dimensions={dimensions}
            showLabels={showLabels}
            className={className}
          />
        )
      default:
        // Fallback for unknown duct pieces
        return (
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Diagram not available</p>
          </div>
        )
    }
  }

  return (
    <div className="duct-diagram bg-white rounded-lg border border-gray-200 p-4">
      {getSVGComponent()}
    </div>
  )
}
