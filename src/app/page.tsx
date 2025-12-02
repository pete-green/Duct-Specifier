'use client'

import Link from 'next/link'
import { useProject } from '@/hooks/useProject'

export default function Home() {
  const { project, itemCount } = useProject()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          HVAC Duct Specifier
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create detailed materials lists for sheet metal duct fabrication
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Catalog
          </Link>

          <Link
            href="/project"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Materials List
            {itemCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-sm px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl mb-3">📐</div>
          <h3 className="font-semibold text-lg mb-2">Precise Measurements</h3>
          <p className="text-gray-600 text-sm">
            Enter dimensions in fractional inches (12 1/2") for accurate fabrication specs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl mb-3">📋</div>
          <h3 className="font-semibold text-lg mb-2">Materials List</h3>
          <p className="text-gray-600 text-sm">
            Build a complete list of duct pieces with quantities and insulation options.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl mb-3">🏭</div>
          <h3 className="font-semibold text-lg mb-2">Shop Ready</h3>
          <p className="text-gray-600 text-sm">
            Generate diagrams with labeled dimensions ready for your sheet metal shop.
          </p>
        </div>
      </div>
    </div>
  )
}
