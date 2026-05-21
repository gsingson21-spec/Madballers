'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useProductStore, Category } from '@/lib/store'

const ADMIN_PASSWORD = 'madballers2024'
const CATEGORIES: Category[] = ['Boots', 'Jerseys', 'Essentials']

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const { products, addProduct, removeProduct, toggleFeatured } = useProductStore()

  // Form state
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState<Category>('Boots')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<string | null>(null)
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url')
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 2000)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImageFile(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const finalImage = imageMode === 'url' ? imageUrl : (imageFile || '')
    if (!productName.trim() || !finalImage) return

    setUploading(true)
    setTimeout(() => {
      addProduct({ name: productName.trim(), category, imageUrl: finalImage })
      setProductName('')
      setImageUrl('')
      setImageFile(null)
      setUploading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 800)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-radial from-zinc-900 to-black" />
        <div className="fixed inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(192,192,192,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(192,192,192,0.02) 0%, transparent 50%)'
        }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 glass-card-strong rounded-2xl p-8 sm:p-12 w-full max-w-sm text-center"
        >
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Mad Ballers" width={80} height={80} className="rounded-full animate-glow-pulse" />
          </div>
          <h1 className="font-display text-3xl chrome-text tracking-widest mb-1">ADMIN</h1>
          <p className="font-body text-xs text-white/30 tracking-[0.3em] uppercase mb-8">BALLER ZONE DASHBOARD</p>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                className={`admin-input w-full px-4 py-3.5 rounded-xl font-body tracking-widest text-center transition-all ${
                  passwordError ? 'border-red-500/50 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''
                }`}
              />
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs font-body tracking-widest mt-2"
                >
                  WRONG PASSWORD
                </motion.p>
              )}
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3.5 bg-white text-black rounded-xl font-display text-xl tracking-widest hover:bg-white/90 transition-colors"
            >
              ENTER
            </button>
          </div>

          <Link href="/" className="block mt-6 font-body text-xs text-white/20 hover:text-white/50 tracking-widest transition-colors">
            ← BACK TO SITE
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />

      {/* Admin Nav */}
      <nav className="relative z-10 glass-card-strong border-b border-white/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Mad Ballers" width={36} height={36} className="rounded-full" />
            <div>
              <p className="font-display text-base chrome-text tracking-widest leading-none">MAD BALLERS</p>
              <p className="font-body text-[9px] tracking-[0.3em] text-white/30 uppercase">Admin Panel</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 font-body text-xs text-green-400 tracking-widest">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              AUTHENTICATED
            </span>
            <button
              onClick={() => setAuthenticated(false)}
              className="font-body text-xs text-white/30 hover:text-white/70 tracking-widest transition-colors"
            >
              LOGOUT
            </button>
            <Link
              href="/"
              className="font-body text-xs text-white/30 hover:text-white/70 tracking-widest transition-colors"
            >
              VIEW SITE →
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'TOTAL PRODUCTS', value: products.length },
            { label: 'BOOTS', value: products.filter(p => p.category === 'Boots').length },
            { label: 'JERSEYS', value: products.filter(p => p.category === 'Jerseys').length },
            { label: 'ESSENTIALS', value: products.filter(p => p.category === 'Essentials').length },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-5 text-center"
            >
              <p className="font-display text-4xl chrome-text">{stat.value}</p>
              <p className="font-body text-[10px] text-white/30 tracking-[0.2em] uppercase mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['upload', 'manage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm tracking-widest transition-all ${
                activeTab === tab ? 'bg-white text-black' : 'border border-white/15 text-white/50 hover:text-white/80'
              }`}
            >
              {tab === 'upload' ? 'UPLOAD PRODUCT' : 'MANAGE PRODUCTS'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'upload' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Form */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="font-display text-2xl chrome-text tracking-widest mb-8">NEW PRODUCT</h2>

                <div className="flex flex-col gap-5">
                  {/* Product Name */}
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Nike Mercurial Superfly IX"
                      className="admin-input w-full px-4 py-3 rounded-xl font-body text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2">
                      Category *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`py-2.5 rounded-xl font-body font-semibold text-xs tracking-widest transition-all ${
                            category === cat
                              ? 'bg-white text-black'
                              : 'border border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
                          }`}
                        >
                          {cat.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image input mode */}
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2">
                      Product Image *
                    </label>
                    <div className="flex gap-2 mb-3">
                      {(['url', 'upload'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setImageMode(mode)}
                          className={`px-4 py-1.5 rounded-full font-body text-xs tracking-widest transition-all ${
                            imageMode === mode ? 'bg-white/10 text-white border border-white/20' : 'text-white/30 hover:text-white/60'
                          }`}
                        >
                          {mode === 'url' ? '🔗 URL' : '📁 UPLOAD'}
                        </button>
                      ))}
                    </div>

                    {imageMode === 'url' ? (
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/product.jpg"
                        className="admin-input w-full px-4 py-3 rounded-xl font-body text-sm"
                      />
                    ) : (
                      <div>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileRef.current?.click()}
                          className="w-full py-8 border border-dashed border-white/15 rounded-xl text-white/30 hover:border-white/30 hover:text-white/60 transition-all font-body text-sm tracking-widest"
                        >
                          {imageFile ? '✓ IMAGE SELECTED' : '+ CLICK TO UPLOAD IMAGE'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={uploading || !productName.trim() || !(imageMode === 'url' ? imageUrl : imageFile)}
                    className="relative w-full py-4 rounded-xl font-display text-xl tracking-widest overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-white/90"
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        UPLOADING...
                      </span>
                    ) : 'ADD PRODUCT'}
                  </button>

                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center"
                      >
                        <p className="font-body text-sm text-green-400 tracking-widest">✓ PRODUCT ADDED SUCCESSFULLY</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Preview */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="font-display text-2xl chrome-text tracking-widest mb-6">PREVIEW</h2>
                <div className="relative rounded-xl overflow-hidden h-72 bg-zinc-900">
                  {(imageMode === 'url' && imageUrl) || (imageMode === 'upload' && imageFile) ? (
                    <Image
                      src={imageMode === 'url' ? imageUrl : imageFile!}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized={imageMode === 'upload'}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-white/15 font-body text-sm tracking-widest">
                      IMAGE PREVIEW
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-body font-semibold text-white/90 truncate">
                      {productName || 'Product Name'}
                    </p>
                    <span className="inline-block mt-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold tracking-widest badge-boots">
                      {category}
                    </span>
                  </div>
                </div>
                <p className="font-body text-xs text-white/20 tracking-widest text-center mt-4">
                  THIS IS HOW IT'LL APPEAR ON THE SITE
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="manage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="glass-card rounded-xl overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-44 bg-zinc-900">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized={product.imageUrl.startsWith('data:')}
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Actions overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleFeatured(product.id)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            product.featured
                              ? 'bg-yellow-400/30 border border-yellow-400/60 text-yellow-400'
                              : 'bg-black/50 border border-white/20 text-white/60'
                          }`}
                          title={product.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          ★
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${product.name}"?`)) removeProduct(product.id)
                          }}
                          className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center hover:bg-red-500/40 transition-all"
                          title="Delete product"
                        >
                          ✕
                        </button>
                      </div>
                      {/* Category + featured */}
                      <div className="absolute top-2 left-2 flex gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-body font-semibold tracking-widest ${
                          product.category === 'Boots' ? 'badge-boots' : product.category === 'Jerseys' ? 'badge-jerseys' : 'badge-essentials'
                        }`}>
                          {product.category}
                        </span>
                      </div>
                      {product.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="text-yellow-400 text-xs">★</span>
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    <div className="p-3">
                      <p className="font-body text-sm text-white/80 leading-snug line-clamp-2">{product.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
