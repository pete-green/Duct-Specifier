'use client'

import { useState, useCallback } from 'react'
import { DuctPieceWithDimensions, ProjectItemDimension } from '@/types'
import { formatInchesNoSymbol } from '@/lib/fractional-inches'
import FractionalInput from './FractionalInput'
import QuantityInput from './QuantityInput'
import InsulationToggle from './InsulationToggle'
import DuctDiagram from './DuctDiagram'

interface DimensionFormProps {
  ductPiece: DuctPieceWithDimensions
  onSubmit: (data: {
    dimensions: ProjectItemDimension[]
    quantity: number
    isInsulated: boolean
  }) => void
  className?: string
}

interface DimensionState {
  [label: string]: {
    value: string
    decimalValue: number | null
  }
}

export default function DimensionForm({
  ductPiece,
  onSubmit,
  className = '',
}: DimensionFormProps) {
  // Initialize dimension state
  const [dimensions, setDimensions] = useState<DimensionState>(() => {
    const initial: DimensionState = {}
    ductPiece.dimensions.forEach((dim) => {
      initial[dim.label] = { value: '', decimalValue: null }
    })
    return initial
  })

  const [quantity, setQuantity] = useState(1)
  const [isInsulated, setIsInsulated] = useState(false)

  // Build ProjectItemDimension array from current state
  const getProjectDimensions = useCallback((): ProjectItemDimension[] => {
    return ductPiece.dimensions
      .filter((dim) => dimensions[dim.label]?.decimalValue !== null)
      .map((dim) => ({
        label: dim.label,
        value_inches: dimensions[dim.label].decimalValue!,
        display_value: formatInchesNoSymbol(dimensions[dim.label].decimalValue!) + '"',
      }))
  }, [dimensions, ductPiece.dimensions])

  const handleDimensionChange = useCallback(
    (label: string, value: string, decimalValue: number | null) => {
      setDimensions((prev) => ({
        ...prev,
        [label]: { value, decimalValue },
      }))
    },
    []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all required dimensions are filled
    const allFilled = ductPiece.dimensions.every(
      (dim) => dimensions[dim.label]?.decimalValue !== null
    )

    if (!allFilled) {
      alert('Please fill in all dimensions')
      return
    }

    onSubmit({
      dimensions: getProjectDimensions(),
      quantity,
      isInsulated,
    })
  }

  // Check if form is complete for showing preview
  const isComplete = ductPiece.dimensions.every(
    (dim) => dimensions[dim.label]?.decimalValue !== null
  )

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Diagram */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isComplete ? 'Preview with Measurements' : 'Reference Diagram'}
          </h3>
          <DuctDiagram
            ductPieceId={ductPiece.id}
            dimensions={getProjectDimensions()}
            showLabels={!isComplete}
          />
        </div>

        {/* Dimension Inputs */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Enter Dimensions
          </h3>
          <div className="space-y-4">
            {ductPiece.dimensions
              .sort((a, b) => a.display_order - b.display_order)
              .map((dim) => (
                <FractionalInput
                  key={dim.label}
                  label={dim.label}
                  description={dim.description}
                  value={dimensions[dim.label]?.value || ''}
                  onChange={(value, decimalValue) =>
                    handleDimensionChange(dim.label, value, decimalValue)
                  }
                  required
                />
              ))}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
        <QuantityInput value={quantity} onChange={setQuantity} />
        <InsulationToggle value={isInsulated} onChange={setIsInsulated} />
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isComplete}
        >
          Add to Materials List
        </button>
      </div>
    </form>
  )
}
