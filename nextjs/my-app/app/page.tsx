import Image from 'next/image'
import DragShuffleHero from '@/components/hero'

export default function Home() {

  return (
    <div className='bg-slate-900'>
      <DragShuffleHero />
      <div className='py-2'>
      <footer className='bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
        <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>Footer </span>
          <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0'>
            <li> Hello</li>
            <li>hello</li>
          </ul>
        </div>
      </footer>
      </div>
    </div>
    
  )
}
