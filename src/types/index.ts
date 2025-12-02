// Duct piece from catalog
export interface DuctPiece {
  id: string
  name: string
  description: string
  category: string
  image_url?: string
  created_at?: string
}

// Dimension definition for a duct piece
export interface DuctDimension {
  id: string
  duct_piece_id: string
  label: string // A, B, C, etc.
  description: string // "Main trunk width"
  display_order: number
}

// A configured project item with measurements
export interface ProjectItem {
  id: string
  duct_piece_id: string
  duct_piece: DuctPiece
  dimensions: ProjectItemDimension[]
  quantity: number
  is_insulated: boolean
  notes?: string
  created_at: string
}

// User-specified measurement for a dimension
export interface ProjectItemDimension {
  label: string // A, B, C, etc.
  value_inches: number // Decimal inches (12.5)
  display_value: string // Formatted string ("12 1/2")
}

// Project (materials list)
export interface Project {
  id: string
  name: string
  customer_name?: string
  items: ProjectItem[]
  created_at: string
  updated_at: string
}

// For the dimension form
export interface DimensionInput {
  label: string
  description: string
  value: string // Raw input value
}

// Duct piece with its dimension definitions
export interface DuctPieceWithDimensions extends DuctPiece {
  dimensions: DuctDimension[]
}
