import { Suspense } from 'react'
import CollectionsClient from './CollectionsClient'

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="font-display text-2xl text-white/20 tracking-widest">LOADING...</div></div>}>
      <CollectionsClient />
    </Suspense>
  )
}
