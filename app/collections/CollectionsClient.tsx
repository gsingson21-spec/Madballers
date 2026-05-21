'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useProductStore, Category } from '@/lib/store'

const CATEGORIES: Category[] = ['Boots', 'Jerseys', 'Essentials']
const ALL = 'All'

export default function CollectionsClient() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') as Category | null
  const [activeCategory, setActiveCategory] = useState<string>(catParam || ALL)
  const { products } = useProductStore()

  useEffect(() => {
    if (catParam) setActiveCategory(catParam)
    else setActiveCategory(ALL)
  }, [catParam])

  const filtered = activeCategory === ALL
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute right-8 top-24 font-display text-[200px] text-white/[0.02] leading-none select-none">
          {filtered.length.toString().padStart(2, '0')}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-body text-xs tracking-[0.4em] text-white/30 uppercase mb-3">MAD BALLERS — BALLER ZONE</p>
            <h1 className="font-display text-6xl sm:text-8xl chrome-text tracking-widest mb-6">
              {activeCategory === ALL ? 'ALL DROPS' : activeCategory.toUpperCase()}
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mt-8">
            {[ALL, ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm tracking-widest transition-all duration-300 ${
                  activeCategory === cat ? 'bg-white text-black' : 'border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 font-body text-xs text-white/20 tracking-widest self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {filtered.length} ITEMS
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-24 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                  <span className="text-3xl">⚽</span>
                </div>
                <p className="font-display text-3xl chrome-text tracking-widest opacity-50">NO DROPS YET</p>
                <p className="font-body text-sm text-white/25 tracking-widest text-center max-w-xs">
                  NEW PRODUCTS BEING ADDED. CHECK BACK SOON OR HIT US ON WHATSAPP.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  )
}
