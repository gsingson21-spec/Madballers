<<<<<<< HEAD
'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useProductStore } from '@/lib/store'
import { getWhatsAppLink } from '@/lib/whatsapp'

const MARQUEE_WORDS = ['BOOTS', 'JERSEYS', 'ESSENTIALS', 'PREMIUM', 'DROPS', 'CULTURE', 'MAD BALLERS', 'BALLER ZONE']

const CATEGORIES = [
  {
    name: 'Boots',
    slug: 'Boots',
    description: 'Elite footwear from the world\'s top brands. Dominate the pitch.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=90',
    color: 'from-yellow-900/30 to-black',
  },
  {
    name: 'Jerseys',
    slug: 'Jerseys',
    description: 'Authentic kits from top clubs & national teams. Rep your culture.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=90',
    color: 'from-zinc-800/40 to-black',
  },
  {
    name: 'Essentials',
    slug: 'Essentials',
    description: 'Training gear, gloves, bags — everything a baller needs.',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=900&q=90',
    color: 'from-zinc-900/40 to-black',
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const { products } = useProductStore()
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)
  const trendingProducts = products.slice(0, 8)

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=95"
            alt="Football stadium"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        </motion.div>

        {/* Cinematic side lines */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="animate-glow-pulse">
              <Image
                src="/logo.png"
                alt="Mad Ballers"
                width={140}
                height={140}
                className="rounded-full"
                priority
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-7xl sm:text-9xl md:text-[130px] lg:text-[160px] leading-none tracking-widest chrome-text mb-2"
          >
            MAD BALLERS
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent mb-4"
          />

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-display text-2xl sm:text-4xl tracking-[0.6em] text-white/60 mb-6"
          >
            BALLER ZONE
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="font-body text-base sm:text-lg text-white/40 tracking-[0.2em] uppercase mb-10 max-w-lg mx-auto"
          >
            Premium Football Culture — Boots · Jerseys · Essentials
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/collections"
              className="px-8 py-4 border border-white/20 rounded-full font-display text-xl tracking-widest hover:bg-white/5 hover:border-white/40 transition-all duration-300 chrome-text"
            >
              BROWSE DROPS
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn flex items-center gap-3 px-8 py-4 rounded-full font-display text-xl tracking-widest text-white relative z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              ORDER NOW
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative py-4 bg-gradient-to-r from-black via-zinc-900 to-black border-y border-white/5 overflow-hidden">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className="font-display text-2xl tracking-[0.3em] px-8 text-white/20 shrink-0">
              {word} <span className="text-white/10 mx-2">◆</span>
            </span>
=======
'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";
import Link from "next/link";
import Footer from "./components/Footer";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  category?: string;
  featured?: boolean;
  sizes?: Record<string, number>;
};

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(list);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  const filtered = products.filter(product => {
    if (selectedCategory === "featured") return product.featured === true;
    return product.category === selectedCategory;
  });

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>

      {/* ======= HERO ======= */}
      <div style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}>
        <img
          src="/images/hero.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.4)",
            display: "block"
          }}
        />

        {/* gradient fade to black at bottom */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0,
          width: "100%",
          height: "40%",
          background: "linear-gradient(to bottom, transparent, #000)"
        }} />

        {/* hero text */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          width: "100%",
          padding: "0 20px"
        }}>
          <h1 style={{
            fontSize: "clamp(40px, 12vw, 120px)",
            fontWeight: 900,
            letterSpacing: "-2px",
            background: "linear-gradient(90deg,#ff7a00,#ffffff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            whiteSpace: "nowrap",
            lineHeight: 1
          }}>
            MAD BALLERS
          </h1>
          <p style={{ color: "#ccc", fontSize: "clamp(13px, 3vw, 20px)", marginTop: "12px" }}>
            Premium Football Store
          </p>
        </div>
      </div>

      {/* ======= PRODUCTS SECTION ======= */}
      <div style={{
        background: "#050505",
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
        marginTop: "-28px",
        position: "relative",
        zIndex: 1,
        padding: "32px 16px 60px"
      }}>

        {/* CATEGORY TABS */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          overflowX: "auto",
          paddingBottom: "6px",
          scrollbarWidth: "none" as any,
        }}>
          {["featured", "boots", "jerseys", "gloves", "jackets", "balls", "gear"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "9px 16px",
                borderRadius: "999px",
                border: "1px solid #222",
                background: selectedCategory === cat ? "#ff7a00" : "#111",
                color: selectedCategory === cat ? "#000" : "#aaa",
                fontWeight: "700",
                whiteSpace: "nowrap",
                flexShrink: 0,
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "0.5px"
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID — always 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          width: "100%"
        }}>
          <style>{`
            @media (min-width: 640px)  { .pgrid { grid-template-columns: repeat(3, 1fr) !important; } }
            @media (min-width: 1024px) { .pgrid { grid-template-columns: repeat(5, 1fr) !important; } }
            .pgrid { display: grid; gap: 12px; width: 100%; }
          `}</style>

          {filtered.map(product => (
            <div
              key={product.id}
              style={{
                background: "#0a0a0a",
                padding: "12px",
                borderRadius: "14px",
                border: "1px solid #161616",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link href={`/product/${product.id}`} style={{ display: "block" }}>
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "contain",
                    borderRadius: "10px",
                    background: "#111"
                  }}
                />
              </Link>

              <h3 style={{
                color: "white",
                fontSize: "clamp(11px, 3vw, 13px)",
                marginTop: "10px",
                flexGrow: 1,
                lineHeight: "1.4",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as any,
              }}>
                {product.name}
              </h3>

              <p style={{
                color: "#ff7a00",
                fontWeight: "800",
                fontSize: "clamp(12px, 3vw, 14px)",
                marginTop: "6px"
              }}>
                ₹{product.price}
              </p>

              <button
                onClick={() => { setPopupProduct(product); setSelectedSize(null); }}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#ff7a00",
                  color: "#000",
                  fontWeight: "800",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                Add
              </button>
            </div>
>>>>>>> 769c39e1785d2da330563b039f16b56d73b538aa
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* ── FEATURED DROPS ── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="font-body text-xs tracking-[0.4em] text-white/30 uppercase mb-2">Latest</p>
            <h2 className="font-display text-5xl sm:text-7xl chrome-text tracking-widest">FEATURED DROPS</h2>
          </div>
          <Link
            href="/collections"
            className="hidden sm:flex items-center gap-2 font-body text-sm text-white/40 hover:text-white transition-colors tracking-widest uppercase animated-underline"
          >
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/30 font-body tracking-widest">
            NO FEATURED DROPS YET — ADMIN UPLOAD COMING SOON
          </div>
        )}
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs tracking-[0.4em] text-white/30 uppercase mb-2">Shop By</p>
            <h2 className="font-display text-5xl sm:text-7xl chrome-text tracking-widest">CATEGORIES</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Link href={`/collections?cat=${cat.slug}`} className="group block relative rounded-2xl overflow-hidden h-[380px] silver-glow product-card">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-90`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <h3 className="font-display text-5xl chrome-text tracking-widest mb-2">{cat.name.toUpperCase()}</h3>
                    <p className="font-body text-sm text-white/50 tracking-wide mb-5 leading-relaxed">{cat.description}</p>
                    <span className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors">
                      EXPLORE
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="font-body text-xs tracking-[0.4em] text-white/30 uppercase mb-2">Right Now</p>
            <h2 className="font-display text-5xl sm:text-7xl chrome-text tracking-widest">TRENDING</h2>
          </div>
          <Link
            href="/collections"
            className="hidden sm:flex items-center gap-2 font-body text-sm text-white/40 hover:text-white transition-colors tracking-widest uppercase animated-underline"
          >
            SEE ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── INSTAGRAM-STYLE SHOWCASE ── */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="font-body text-xs tracking-[0.4em] text-white/30 uppercase mb-2">The Culture</p>
            <h2 className="font-display text-5xl sm:text-7xl chrome-text tracking-widest mb-4">BALLER LIFESTYLE</h2>
            <p className="font-body text-sm text-white/30 tracking-widest uppercase">The Drip. The Game. The Culture.</p>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=90', tall: true },
              { src: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&q=90', tall: false },
              { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=90', tall: false },
              { src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=90', tall: false },
              { src: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600&q=90', tall: true },
              { src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=90', tall: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-xl overflow-hidden group ${item.tall ? 'row-span-2 h-64 sm:h-80' : 'h-32 sm:h-40'}`}
              >
                <Image
                  src={item.src}
                  alt="Football culture"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA BANNER ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1920&q=90"
            alt="Football"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black" />
        </div>

        {/* Decorative lines */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-green-400/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-green-400/20 bg-green-400/5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-body text-xs text-green-400 tracking-[0.3em] uppercase">We're Available Now</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl chrome-text tracking-widest mb-4">
            READY TO ORDER?
          </h2>
          <p className="font-body text-lg sm:text-xl text-white/50 tracking-[0.15em] mb-10 max-w-2xl mx-auto">
            Drop us a message on WhatsApp and get your order processed instantly. Premium gear delivered to your door.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn flex items-center gap-3 px-10 py-5 rounded-full font-display text-2xl tracking-widest text-white relative z-10 silver-glow-strong"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              CHAT & ORDER
            </a>
            <div className="font-body text-sm text-white/30 tracking-widest">+91 93669 46633</div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
=======
      {/* ======= SIZE POPUP — slides up from bottom on mobile ======= */}
      {popupProduct && (
        <div
          onClick={() => setPopupProduct(null)}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#0d0d0d",
              padding: "20px 20px 36px",
              borderRadius: "24px 24px 0 0",
              width: "100%",
              maxWidth: "500px",
              maxHeight: "85vh",
              overflowY: "auto",
              border: "1px solid #1a1a1a",
              borderBottom: "none"
            }}
          >
            {/* drag handle */}
            <div style={{
              width: "40px", height: "4px",
              background: "#333", borderRadius: "999px",
              margin: "0 auto 20px"
            }} />

            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
              <img
                src={popupProduct.images?.[0]}
                style={{
                  width: "80px", height: "80px",
                  objectFit: "contain",
                  borderRadius: "12px",
                  background: "#111",
                  padding: "6px",
                  flexShrink: 0
                }}
              />
              <div>
                <h2 style={{ color: "white", fontSize: "16px", fontWeight: "800", lineHeight: "1.4" }}>
                  {popupProduct.name}
                </h2>
                <p style={{ color: "#ff7a00", fontWeight: "800", fontSize: "18px", marginTop: "4px" }}>
                  ₹{popupProduct.price}
                </p>
              </div>
            </div>

            <p style={{ color: "#555", fontSize: "11px", marginBottom: "12px", letterSpacing: "1.5px" }}>
              SELECT SIZE
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
              {Object.entries(popupProduct.sizes || {}).map(([size, stock]) => {
                const out = Number(stock) <= 0;
                return (
                  <button
                    key={size}
                    disabled={out}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      minWidth: "52px",
                      height: "52px",
                      padding: "0 14px",
                      borderRadius: "12px",
                      border: selectedSize === size
                        ? "2px solid #ff7a00"
                        : "1px solid #2a2a2a",
                      background: selectedSize === size ? "#ff7a00" : out ? "#0a0a0a" : "#1a1a1a",
                      color: selectedSize === size ? "#000" : out ? "#444" : "white",
                      opacity: out ? 0.5 : 1,
                      cursor: out ? "not-allowed" : "pointer",
                      fontWeight: "800",
                      fontSize: "13px",
                      position: "relative"
                    }}
                  >
                    {size}
                    {out && (
                      <span style={{
                        position: "absolute", top: "-5px", right: "-5px",
                        fontSize: "8px", background: "#ff2d00",
                        padding: "1px 5px", borderRadius: "4px", fontWeight: "900"
                      }}>
                        OUT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              disabled={!selectedSize}
              onClick={() => {
                addToCart({
                  id: popupProduct.id,
                  name: popupProduct.name,
                  price: popupProduct.price,
                  image: popupProduct.images?.[0] || "",
                  size: selectedSize!
                });
                setPopupProduct(null);
              }}
              style={{
                width: "100%",
                padding: "18px",
                background: selectedSize ? "linear-gradient(90deg,#ff7a00,#ffb347)" : "#1a1a1a",
                border: "none",
                borderRadius: "14px",
                fontWeight: "900",
                fontSize: "16px",
                color: selectedSize ? "#000" : "#444",
                cursor: selectedSize ? "pointer" : "not-allowed",
              }}
            >
              {selectedSize ? `Add to Cart — ₹${popupProduct.price}` : "Select a Size"}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
>>>>>>> 769c39e1785d2da330563b039f16b56d73b538aa
