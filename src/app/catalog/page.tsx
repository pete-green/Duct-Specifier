'use client'

import { useDuctPieces } from '@/hooks/useDuctPieces'
import CatalogGrid from '@/components/CatalogGrid'

export default function CatalogPage() {
  const { pieces, categories, isLoading } = useDuctPieces()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading catalog...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Duct Catalog</h1>
        <p className="mt-2 text-gray-600">
          Select a duct piece to configure with your measurements
        </p>
      </div>

      {/* Category filters (for future use when more items are added) */}
      {categories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <CatalogGrid pieces={pieces} />
    </div>
  )
}
