'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Category = 'Boots' | 'Jerseys' | 'Essentials'

export interface Product {
  id: string
  name: string
  category: Category
  imageUrl: string
  createdAt: number
  featured?: boolean
}

interface ProductStore {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  removeProduct: (id: string) => void
  toggleFeatured: (id: string) => void
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'sample-1',
    name: 'Nike Mercurial Superfly IX Elite',
    category: 'Boots',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90',
    createdAt: Date.now() - 5000,
    featured: true,
  },
  {
    id: 'sample-2',
    name: 'Adidas X Crazyfast.1 FG',
    category: 'Boots',
    imageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=90',
    createdAt: Date.now() - 4000,
    featured: true,
  },
  {
    id: 'sample-3',
    name: 'Real Madrid 2024 Home Kit',
    category: 'Jerseys',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=90',
    createdAt: Date.now() - 3000,
    featured: true,
  },
  {
    id: 'sample-4',
    name: 'Brazil National Training Jersey',
    category: 'Jerseys',
    imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=90',
    createdAt: Date.now() - 2500,
    featured: false,
  },
  {
    id: 'sample-5',
    name: 'Pro Goalkeeper Gloves',
    category: 'Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800&q=90',
    createdAt: Date.now() - 2000,
    featured: false,
  },
  {
    id: 'sample-6',
    name: 'Elite Football Training Bag',
    category: 'Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=90',
    createdAt: Date.now() - 1500,
    featured: false,
  },
  {
    id: 'sample-7',
    name: 'Puma Future 7 Ultimate FG',
    category: 'Boots',
    imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=90',
    createdAt: Date.now() - 1000,
    featured: false,
  },
  {
    id: 'sample-8',
    name: 'Manchester City Away Kit 24/25',
    category: 'Jerseys',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=90',
    createdAt: Date.now() - 500,
    featured: true,
  },
]

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: SAMPLE_PRODUCTS,
      addProduct: (product) =>
        set((state) => ({
          products: [
            {
              ...product,
              id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              createdAt: Date.now(),
            },
            ...state.products,
          ],
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      toggleFeatured: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, featured: !p.featured } : p
          ),
        })),
    }),
    { name: 'mad-ballers-products' }
  )
)
