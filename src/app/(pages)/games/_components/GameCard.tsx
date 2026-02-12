'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@/services/rawg'
import { HiStar } from 'react-icons/hi2'
import { FaGamepad } from 'react-icons/fa'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`} className="block h-full">
      <article className="group flex flex-col h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">

        {/* Image */}
        <div className="relative aspect-[16/9] w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              unoptimized
              loading="lazy"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <FaGamepad className="w-10 h-10" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Rating */}
          {game.rating > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold bg-black/70 text-white px-2 py-1 rounded-md backdrop-blur-sm">
              <HiStar className="w-3 h-3 text-yellow-400" />
              {game.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3rem]">
            {game.name}
          </h3>

          {/* Spacer */}
          <div className="flex-1 mt-3 space-y-2">

            {/* Release */}
            {game.released && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(game.released).toLocaleDateString('fa-IR')}
              </p>
            )}

            {/* Platforms */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {game.platforms.slice(0, 3).map((p) => (
                  <span
                    key={p.platform.id}
                    className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {p.platform.name}
                  </span>
                ))}
                {game.platforms.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{game.platforms.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {game.playtime > 0 && (
            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              زمان بازی: {game.playtime} ساعت
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}