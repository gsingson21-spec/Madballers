'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getWhatsAppLink } from '@/lib/whatsapp'

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-16 pb-8">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Mad Ballers" width={56} height={56} className="rounded-full animate-glow-pulse" />
              <div>
                <p className="font-display text-xl chrome-text tracking-widest">MAD BALLERS</p>
                <p className="font-body text-[10px] tracking-[0.3em] text-white/30 uppercase">BALLER ZONE</p>
              </div>
            </Link>
            <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs">
              Premium football culture. We curate the finest boots, jerseys, and essentials for the serious baller.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-bold text-sm tracking-wider text-white relative z-10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              CHAT ON WHATSAPP
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg chrome-text tracking-widest mb-6">NAVIGATE</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/collections', label: 'All Collections' },
                { href: '/collections?cat=Boots', label: 'Boots' },
                { href: '/collections?cat=Jerseys', label: 'Jerseys' },
                { href: '/collections?cat=Essentials', label: 'Essentials' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-body text-sm text-white/40 hover:text-white/80 transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg chrome-text tracking-widest mb-6">GET IN TOUCH</h4>
            <div className="flex flex-col gap-4">
              <p className="font-body text-sm text-white/40 leading-relaxed">
                Order through WhatsApp for the fastest response. We ship pan-India.
              </p>
              <div className="glass-card rounded-xl p-4 flex flex-col gap-2">
                <p className="font-body text-[10px] text-white/30 tracking-widest uppercase">WhatsApp</p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl chrome-text tracking-widest hover:opacity-80 transition-opacity"
                >
                  +91 93669 46633
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20 tracking-widest">
            © 2024 MAD BALLERS — BALLER ZONE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-body text-[10px] text-white/15 tracking-widest">POWERED BY FOOTBALL CULTURE</span>
            <span className="text-white/20">⚽</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
