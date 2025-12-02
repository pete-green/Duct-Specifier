'use client'

import { useState, useEffect, useCallback } from 'react'
import { Project, ProjectItem, ProjectItemDimension, DuctPiece } from '@/types'
import { getCatalogItem } from '@/lib/catalog-data'

const STORAGE_KEY = 'hvac-duct-specifier-project'

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function createEmptyProject(): Project {
  return {
    id: generateId(),
    name: 'New Project',
    customer_name: '',
    items: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export function useProject() {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load project from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Project
        setProject(parsed)
      } else {
        setProject(createEmptyProject())
      }
    } catch (error) {
      console.error('Failed to load project from localStorage:', error)
      setProject(createEmptyProject())
    }
    setIsLoading(false)
  }, [])

  // Save project to localStorage whenever it changes
  useEffect(() => {
    if (project && !isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(project))
      } catch (error) {
        console.error('Failed to save project to localStorage:', error)
      }
    }
  }, [project, isLoading])

  // Add an item to the project
  const addItem = useCallback(
    (
      ductPieceId: string,
      dimensions: ProjectItemDimension[],
      quantity: number,
      isInsulated: boolean,
      notes?: string
    ) => {
      const ductPiece = getCatalogItem(ductPieceId)
      if (!ductPiece) {
        console.error('Duct piece not found:', ductPieceId)
        return null
      }

      const newItem: ProjectItem = {
        id: generateId(),
        duct_piece_id: ductPieceId,
        duct_piece: ductPiece,
        dimensions,
        quantity,
        is_insulated: isInsulated,
        notes,
        created_at: new Date().toISOString(),
      }

      setProject((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          items: [...prev.items, newItem],
          updated_at: new Date().toISOString(),
        }
      })

      return newItem.id
    },
    []
  )

  // Remove an item from the project
  const removeItem = useCallback((itemId: string) => {
    setProject((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
        updated_at: new Date().toISOString(),
      }
    })
  }, [])

  // Update an item in the project
  const updateItem = useCallback(
    (
      itemId: string,
      updates: Partial<{
        dimensions: ProjectItemDimension[]
        quantity: number
        is_insulated: boolean
        notes: string
      }>
    ) => {
      setProject((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
          updated_at: new Date().toISOString(),
        }
      })
    },
    []
  )

  // Get an item by ID
  const getItem = useCallback(
    (itemId: string): ProjectItem | undefined => {
      return project?.items.find((item) => item.id === itemId)
    },
    [project]
  )

  // Clear all items
  const clearProject = useCallback(() => {
    setProject(createEmptyProject())
  }, [])

  // Update project name
  const updateProjectName = useCallback((name: string) => {
    setProject((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        name,
        updated_at: new Date().toISOString(),
      }
    })
  }, [])

  // Update customer name
  const updateCustomerName = useCallback((customerName: string) => {
    setProject((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        customer_name: customerName,
        updated_at: new Date().toISOString(),
      }
    })
  }, [])

  return {
    project,
    isLoading,
    items: project?.items || [],
    itemCount: project?.items.length || 0,
    addItem,
    removeItem,
    updateItem,
    getItem,
    clearProject,
    updateProjectName,
    updateCustomerName,
  }
}
