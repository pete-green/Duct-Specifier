'use client'

import { useRouter } from 'next/navigation'
import { useProject } from '@/hooks/useProject'
import MaterialsList from '@/components/MaterialsList'
import Link from 'next/link'

export default function ProjectPage() {
  const router = useRouter()
  const { project, items, isLoading, removeItem, clearProject } = useProject()

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this item?')) {
      removeItem(id)
    }
  }

  const handleEdit = (id: string) => {
    // For now, just alert - could navigate to edit page
    alert('Edit functionality coming soon!')
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all items from the materials list?')) {
      clearProject()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading project...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Materials List</h1>
          <p className="mt-2 text-gray-600">
            Your configured duct pieces ready for fabrication
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add More Items
          </Link>
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Materials List */}
      <MaterialsList
        items={items}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Export section - for future */}
      {items.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Export Options
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => alert('Print functionality coming soon!')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Print List
            </button>
            <button
              onClick={() => alert('PDF export coming soon!')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Export PDF
            </button>
            <button
              onClick={() => alert('Send to fabricator feature coming soon!')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Send to Fabricator
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
