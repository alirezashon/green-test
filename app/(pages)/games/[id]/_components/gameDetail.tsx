'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { GameDetails } from '@/services/rawg'

interface GameDetailProps {
  game: GameDetails
}

export default function GameDetail({ game }: GameDetailProps) {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-6 lg:py-8 max-w-7xl'>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='mb-6 group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200'
        >
          <span className='group-hover:-translate-x-1 transition-transform duration-200'>
            ←
          </span>
          <span>بازگشت</span>
        </button>

        {/* Hero Section with Parallax Effect */}
        <div className='relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-8 shadow-2xl group'>
          {game.background_image ? (
            <>
              <Image
                src={game.background_image}
                alt={game.name}
                fill
                unoptimized
                className='object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
                priority
                sizes='100vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30'></div>
            </>
          ) : (
            <div className='w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center'>
              <span className='text-gray-300 dark:text-gray-500 text-xl'>
                بدون تصویر
              </span>
            </div>
          )}

          {/* Hero Content */}
          <div className='absolute bottom-0 left-0 right-0 p-6 lg:p-12'>
            <div className='max-w-4xl'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight'>
                {game.name}
              </h1>
              <div className='flex flex-wrap items-center gap-4 text-white/90'>
                {game.released && (
                  <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                    <span className='font-medium'>
                      {new Date(game.released).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                )}
                {game.metacritic && (
                  <div className='flex items-center gap-2 bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-lg font-bold'>
                    <span>Metacritic</span>
                    <span className='text-xl'>{game.metacritic}</span>
                  </div>
                )}
                {game.rating > 0 && (
                  <div className='flex items-center gap-2 bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold'>
                    <span>⭐</span>
                    <span>{game.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Description Card */}
            {game.description_raw && (
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 border border-gray-100 dark:border-gray-700'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full'></div>
                  <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white'>
                    درباره بازی
                  </h2>
                </div>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg whitespace-pre-line'>
                  {game.description_raw}
                </p>
              </div>
            )}

            {/* Platforms Card */}
            {game.platforms && game.platforms.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 border border-gray-100 dark:border-gray-700'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full'></div>
                  <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white'>
                    پلتفرم‌ها
                  </h2>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                  {game.platforms.map((platformWrapper) => (
                    <div
                      key={platformWrapper.platform.id}
                      className='group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-4 py-3 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                    >
                      <span className='text-gray-900 dark:text-white font-semibold block mb-1'>
                        {platformWrapper.platform.name}
                      </span>
                      {platformWrapper.released_at && (
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          {new Date(
                            platformWrapper.released_at,
                          ).toLocaleDateString('fa-IR')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Stats Card */}
            <div className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
                <svg
                  className='w-6 h-6 text-blue-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
                اطلاعات بازی
              </h2>
              <div className='space-y-5'>
                {game.rating > 0 && (
                  <div className='p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium'>
                      امتیاز
                    </p>
                    <p className='text-3xl font-bold text-green-600 dark:text-green-400'>
                      {game.rating.toFixed(1)}
                      <span className='text-lg text-gray-500 dark:text-gray-400'>
                        {' '}
                        / {game.rating_top}
                      </span>
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                      از {game.ratings_count.toLocaleString('fa-IR')} رای
                    </p>
                  </div>
                )}

                {game.metacritic && (
                  <div className='p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium'>
                      Metacritic
                    </p>
                    <p className='text-3xl font-bold text-yellow-600 dark:text-yellow-400'>
                      {game.metacritic}
                    </p>
                  </div>
                )}

                {game.playtime > 0 && (
                  <div className='p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium'>
                      زمان بازی متوسط
                    </p>
                    <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                      {game.playtime}
                      <span className='text-base text-gray-500 dark:text-gray-400'>
                        {' '}
                        ساعت
                      </span>
                    </p>
                  </div>
                )}

                {game.reviews_count > 0 && (
                  <div className='p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium'>
                      تعداد نقدها
                    </p>
                    <p className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                      {game.reviews_count.toLocaleString('fa-IR')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Genres Card */}
            {game.genres && game.genres.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-purple-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                    />
                  </svg>
                  ژانرها
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200'
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Card */}
            {game.tags && game.tags.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                    />
                  </svg>
                  برچسب‌ها
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {game.tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag.id}
                      className='px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200'
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Developers Card */}
            {game.developers && game.developers.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-indigo-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  توسعه‌دهندگان
                </h2>
                <div className='space-y-2'>
                  {game.developers.map((developer) => (
                    <p
                      key={developer.id}
                      className='text-gray-700 dark:text-gray-300 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                    >
                      {developer.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Publishers Card */}
            {game.publishers && game.publishers.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-teal-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                    />
                  </svg>
                  ناشران
                </h2>
                <div className='space-y-2'>
                  {game.publishers.map((publisher) => (
                    <p
                      key={publisher.id}
                      className='text-gray-700 dark:text-gray-300 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                    >
                      {publisher.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Website Card */}
            {game.website && (
              <div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg p-6 border border-blue-200 dark:border-blue-800'>
                <a
                  href={game.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-between text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200'
                >
                  <span className='flex items-center gap-2'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                      />
                    </svg>
                    وب‌سایت رسمی
                  </span>
                  <span className='group-hover:translate-x-1 transition-transform duration-200'>
                    ↗
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
