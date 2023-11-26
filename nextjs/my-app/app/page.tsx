import Image from 'next/image'
import DragShuffleHero from '@/components/hero'

export default function Home() {

  return (
    <div className='flex bg-slate-900 w-full min-h-screen'>
      <DragShuffleHero />
    </div>
    
  )
}
