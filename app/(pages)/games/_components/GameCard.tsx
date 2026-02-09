'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@/services/rawg'
import { HiStar, HiCalendar, HiClock } from 'react-icons/hi2'
import { FaGamepad } from 'react-icons/fa'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`}>
      <div className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-1'>
        {/* Image */}
        <div className='relative h-52 w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'>
          {game.background_image ? (
            <Image
              src={game.background_image}
              unoptimized
              loading='lazy'
              alt={game.name}
              fill
              className='object-cover group-hover:scale-110 transition-transform duration-500'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-400 dark:text-gray-500'>
              <FaGamepad className='w-12 h-12' />
            </div>
          )}

          {/* Rating Badge */}
          {game.rating > 0 && (
            <div className='absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg'>
              <HiStar className='w-3.5 h-3.5 fill-current' />
              {game.rating.toFixed(1)}
            </div>
          )}

          {/* Metacritic Badge */}
          {game.metacritic && (
            <div className='absolute top-3 left-3 bg-yellow-500/90 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-lg'>
              {game.metacritic}
            </div>
          )}
        </div>

        {/* Content */}
        <div className='p-5 space-y-3'>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors min-h-[3.5rem]'>
            {game.name}
          </h3>

          {/* Release Date */}
          {game.released && (
            <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
              <HiCalendar className='w-4 h-4 flex-shrink-0' />
              <span>
                {new Date(game.released).toLocaleDateString('fa-IR')}
              </span>
            </div>
          )}

          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {game.platforms.slice(0, 3).map((platformWrapper) => (
                <span
                  key={platformWrapper.platform.id}
                  className='text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md font-medium'
                >
                  {platformWrapper.platform.name}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className='text-xs text-gray-500 dark:text-gray-400 px-2.5 py-1'>
                  +{game.platforms.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Playtime */}
          {game.playtime > 0 && (
            <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-1'>
              <HiClock className='w-4 h-4 flex-shrink-0' />
              <span>زمان بازی: {game.playtime} ساعت</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
