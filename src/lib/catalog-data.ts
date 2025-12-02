import { DuctPieceWithDimensions } from '@/types'

/**
 * Static catalog data for when Supabase is not configured
 * This serves as seed data and fallback
 */
export const CATALOG_DATA: DuctPieceWithDimensions[] = [
  {
    id: 'y-branch-13',
    name: 'Y-Branch #13',
    description: 'Y-shaped branch fitting for splitting airflow into two directions',
    category: 'branches',
    image_url: '/duct-images/y-branch-13.jpg',
    dimensions: [
      { id: 'd-a', duct_piece_id: 'y-branch-13', label: 'A', description: 'Main trunk width', display_order: 1 },
      { id: 'd-b', duct_piece_id: 'y-branch-13', label: 'B', description: 'Left branch width', display_order: 2 },
      { id: 'd-c', duct_piece_id: 'y-branch-13', label: 'C', description: 'Right branch width', display_order: 3 },
      { id: 'd-d', duct_piece_id: 'y-branch-13', label: 'D', description: 'Left side depth', display_order: 4 },
      { id: 'd-e', duct_piece_id: 'y-branch-13', label: 'E', description: 'Right side depth', display_order: 5 },
      { id: 'd-f', duct_piece_id: 'y-branch-13', label: 'F', description: 'Center collar size', display_order: 6 },
      { id: 'd-g', duct_piece_id: 'y-branch-13', label: 'G', description: 'Branch height', display_order: 7 },
    ],
  },
]

/**
 * Get all catalog items
 */
export function getCatalogItems(): DuctPieceWithDimensions[] {
  return CATALOG_DATA
}

/**
 * Get a single catalog item by ID
 */
export function getCatalogItem(id: string): DuctPieceWithDimensions | undefined {
  return CATALOG_DATA.find((item) => item.id === id)
}

/**
 * Get catalog items by category
 */
export function getCatalogItemsByCategory(category: string): DuctPieceWithDimensions[] {
  return CATALOG_DATA.filter((item) => item.category === category)
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return [...new Set(CATALOG_DATA.map((item) => item.category))]
}
