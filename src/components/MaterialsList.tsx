'use client'

import { ProjectItem } from '@/types'
import MaterialsListItem from './MaterialsListItem'
import Link from 'next/link'

interface MaterialsListProps {
  items: ProjectItem[]
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  className?: string
}

export default function MaterialsList({
  items,
  onDelete,
  onEdit,
  className = '',
}: MaterialsListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No items in your materials list
        </h3>
        <p className="text-gray-500 mb-6">
          Browse the catalog to add duct pieces with specifications.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Catalog
        </Link>
      </div>
    )
  }

  // Calculate totals
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0)
  const linedCount = items.filter((item) => item.is_insulated).reduce((sum, item) => sum + item.quantity, 0)
  const unlinedCount = totalPieces - linedCount

  return (
    <div className={className}>
      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="text-sm text-blue-600 font-medium">Total Items</span>
            <p className="text-2xl font-bold text-blue-900">{items.length}</p>
          </div>
          <div>
            <span className="text-sm text-blue-600 font-medium">Total Pieces</span>
            <p className="text-2xl font-bold text-blue-900">{totalPieces}</p>
          </div>
          <div>
            <span className="text-sm text-blue-600 font-medium">Lined</span>
            <p className="text-2xl font-bold text-blue-900">{linedCount}</p>
          </div>
          <div>
            <span className="text-sm text-blue-600 font-medium">Unlined</span>
            <p className="text-2xl font-bold text-blue-900">{unlinedCount}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <MaterialsListItem
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}
