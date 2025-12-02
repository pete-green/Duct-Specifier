'use client'

import Link from 'next/link'
import { useProject } from '@/hooks/useProject'

export default function Header() {
  const { itemCount } = useProject()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            <span className="font-bold text-xl text-gray-900">Duct Specifier</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Catalog
            </Link>
            <Link
              href="/project"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Materials List
              {itemCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
