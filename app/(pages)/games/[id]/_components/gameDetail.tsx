'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { GameDetails } from '@/services/rawg'
import { getGameById } from '@/services/games'

const GameDetail = () => {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGame = async () => {
      if (!params.id) return

      setLoading(true)
      setError(null)
      try {
        const data = await getGameById(params.id as string)
        setGame(data)
      } catch (err) {
        console.error('Error fetching game:', err)
        setError('خطا در بارگذاری اطلاعات بازی')
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [params.id])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='animate-pulse space-y-6'>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3'></div>
          <div className='h-96 bg-gray-200 dark:bg-gray-700 rounded'></div>
          <div className='space-y-4'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full'></div>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6'></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-12'>
          <p className='text-red-600 dark:text-red-400 text-lg mb-4'>
            {error || 'بازی یافت نشد'}
          </p>
          <Link
            href='/games'
            className='text-blue-600 dark:text-blue-400 hover:underline'
          >
            بازگشت به لیست بازی‌ها
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className='mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2'
      >
        <span>←</span>
        <span>بازگشت</span>
      </button>

      {/* Hero Section */}
      <div className='relative h-96 rounded-lg overflow-hidden mb-8'>
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            unoptimized
            className='object-cover'
            priority
            sizes='100vw'
          />
        ) : (
          <div className='w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
            <span className='text-gray-400'>بدون تصویر</span>
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
        <div className='absolute bottom-0 left-0 right-0 p-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            {game.name}
          </h1>
          {game.released && (
            <p className='text-white/90 text-lg'>
              تاریخ انتشار:{' '}
              {new Date(game.released).toLocaleDateString('fa-IR')}
            </p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Description */}
          {game.description_raw && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                درباره بازی
              </h2>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
                {game.description_raw}
              </p>
            </div>
          )}

          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                پلتفرم‌ها
              </h2>
              <div className='flex flex-wrap gap-3'>
                {game.platforms.map((platformWrapper) => (
                  <div
                    key={platformWrapper.platform.id}
                    className='bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg'
                  >
                    <span className='text-gray-900 dark:text-white font-medium'>
                      {platformWrapper.platform.name}
                    </span>
                    {platformWrapper.released_at && (
                      <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
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
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
              اطلاعات بازی
            </h2>
            <div className='space-y-4'>
              {game.rating > 0 && (
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    امتیاز
                  </p>
                  <p className='text-2xl font-bold text-green-600'>
                    {game.rating.toFixed(1)} / {game.rating_top}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    از {game.ratings_count.toLocaleString('fa-IR')} رای
                  </p>
                </div>
              )}

              {game.metacritic && (
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    Metacritic
                  </p>
                  <p className='text-2xl font-bold text-yellow-600'>
                    {game.metacritic}
                  </p>
                </div>
              )}

              {game.playtime > 0 && (
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    زمان بازی متوسط
                  </p>
                  <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {game.playtime} ساعت
                  </p>
                </div>
              )}

              {game.reviews_count > 0 && (
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    تعداد نقدها
                  </p>
                  <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {game.reviews_count.toLocaleString('fa-IR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                ژانرها
              </h2>
              <div className='flex flex-wrap gap-2'>
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                برچسب‌ها
              </h2>
              <div className='flex flex-wrap gap-2'>
                {game.tags.slice(0, 10).map((tag) => (
                  <span
                    key={tag.id}
                    className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm'
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Developers */}
          {game.developers && game.developers.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                توسعه‌دهندگان
              </h2>
              <div className='space-y-2'>
                {game.developers.map((developer) => (
                  <p
                    key={developer.id}
                    className='text-gray-700 dark:text-gray-300'
                  >
                    {developer.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Publishers */}
          {game.publishers && game.publishers.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                ناشران
              </h2>
              <div className='space-y-2'>
                {game.publishers.map((publisher) => (
                  <p
                    key={publisher.id}
                    className='text-gray-700 dark:text-gray-300'
                  >
                    {publisher.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Website */}
          {game.website && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              <a
                href={game.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2'
              >
                <span>وب‌سایت رسمی</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default GameDetail
