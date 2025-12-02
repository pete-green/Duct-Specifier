'use client'

import { ProjectItem } from '@/types'
import DuctDiagram from './DuctDiagram'

interface MaterialsListItemProps {
  item: ProjectItem
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export default function MaterialsListItem({
  item,
  onDelete,
  onEdit,
}: MaterialsListItemProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900">
            {item.duct_piece.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
              Qty: {item.quantity}
            </span>
            {item.is_insulated && (
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                Lined
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 p-4">
        {/* Diagram with measurements */}
        <div className="bg-gray-50 rounded-lg p-2">
          <DuctDiagram
            ductPieceId={item.duct_piece_id}
            dimensions={item.dimensions}
            showLabels={false}
          />
        </div>

        {/* Dimensions list */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Dimensions</h4>
          <div className="space-y-1">
            {item.dimensions.map((dim) => (
              <div
                key={dim.label}
                className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded"
              >
                <span className="font-mono text-sm">
                  <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded mr-2">
                    {dim.label}
                  </span>
                </span>
                <span className="font-mono text-sm">{dim.display_value}</span>
              </div>
            ))}
          </div>

          {item.notes && (
            <div className="mt-3 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
              {item.notes}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
        <button
          onClick={() => onEdit(item.id)}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
