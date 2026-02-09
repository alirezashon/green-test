'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@/services/rawg'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`}>
      <div className='group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer'>
        {/* Image */}
        <div className='relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700'>
          {game.background_image ? (
            <Image
              src={game.background_image}
              unoptimized
              loading='lazy'
              alt={game.name}
              fill
              className='object-cover group-hover:scale-110 transition-transform duration-300'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-400'>
              بدون تصویر
            </div>
          )}

          {/* Rating Badge */}
          {game.rating > 0 && (
            <div className='absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold'>
              {game.rating.toFixed(1)} ⭐
            </div>
          )}

          {/* Metacritic Badge */}
          {game.metacritic && (
            <div className='absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold'>
              {game.metacritic}
            </div>
          )}
        </div>

        {/* Content */}
        <div className='p-4'>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
            {game.name}
          </h3>

          {/* Release Date */}
          {game.released && (
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
              تاریخ انتشار:{' '}
              {new Date(game.released).toLocaleDateString('fa-IR')}
            </p>
          )}

          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className='flex flex-wrap gap-1 mt-2'>
              {game.platforms.slice(0, 3).map((platformWrapper) => (
                <span
                  key={platformWrapper.platform.id}
                  className='text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded'
                >
                  {platformWrapper.platform.name}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  +{game.platforms.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Playtime */}
          {game.playtime > 0 && (
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
              زمان بازی: {game.playtime} ساعت
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
