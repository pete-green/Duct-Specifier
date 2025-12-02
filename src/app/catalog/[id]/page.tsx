'use client'

import { useParams, useRouter } from 'next/navigation'
import { useDuctPieces } from '@/hooks/useDuctPieces'
import { useProject } from '@/hooks/useProject'
import DimensionForm from '@/components/DimensionForm'
import Link from 'next/link'

export default function ConfigureDuctPage() {
  const params = useParams()
  const router = useRouter()
  const { getPiece, isLoading } = useDuctPieces()
  const { addItem } = useProject()

  const ductPieceId = params.id as string
  const ductPiece = getPiece(ductPieceId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!ductPiece) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Duct Piece Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The requested duct piece could not be found in the catalog.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Back to Catalog
        </Link>
      </div>
    )
  }

  const handleSubmit = (data: {
    dimensions: any[]
    quantity: number
    isInsulated: boolean
  }) => {
    addItem(
      ductPieceId,
      data.dimensions,
      data.quantity,
      data.isInsulated
    )

    // Navigate to the project page
    router.push('/project')
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-500">
          <li>
            <Link href="/catalog" className="hover:text-blue-600">
              Catalog
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{ductPiece.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{ductPiece.name}</h1>
        <p className="mt-2 text-gray-600">{ductPiece.description}</p>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <DimensionForm ductPiece={ductPiece} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
