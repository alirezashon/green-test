'use client'

import { Game } from '@/services/rawg'
import { GameCard } from './GameCard'
import { HiInbox } from 'react-icons/hi2'

interface GamesGridProps {
  games: Game[]
  loading?: boolean
}

export function GamesGrid({ games, loading }: GamesGridProps) {
  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse'
          >
            <div className='h-52 bg-gray-200 dark:bg-gray-700'></div>
            <div className='p-5 space-y-3'>
              <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
              <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className='text-center py-16'>
        <HiInbox className='w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4' />
        <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
          بازی‌ای یافت نشد
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
