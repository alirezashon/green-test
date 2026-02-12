'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { GameDetails } from '@/services/rawg'
import { getGameById } from '@/services/games'
import {
  HiArrowRight,
  HiStar,
  HiCalendar,
  HiClock,
  HiXCircle
} from 'react-icons/hi2'
import { FaGamepad } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'

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
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
        <div className='animate-pulse space-y-6'>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/3'></div>
          <div className='h-96 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
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
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
        <div className='text-center py-16'>
          <HiXCircle className='w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4' />
          <p className='text-red-600 dark:text-red-400 text-lg font-medium mb-6'>
            {error || 'بازی یافت نشد'}
          </p>
          <Link
            href='/games'
            className='inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors'
          >
            <HiArrowRight className='w-5 h-5' />
            <span>بازگشت به لیست بازی‌ها</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className='mb-6 lg:mb-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group'
      >
        <HiArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
        <span>بازگشت</span>
      </button>

      {/* Hero Section */}
      <div className='relative h-80 lg:h-96 rounded-xl overflow-hidden mb-8 lg:mb-10 shadow-2xl'>
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
          <div className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center'>
            <FaGamepad className='w-20 h-20 text-gray-400 dark:text-gray-500' />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>
        <div className='absolute bottom-0 left-0 right-0 p-6 lg:p-10'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4'>
            {game.name}
          </h1>
          {game.released && (
            <div className='flex items-center gap-2 text-white/90 text-base lg:text-lg'>
              <HiCalendar className='w-5 h-5' />
              <span>
                تاریخ انتشار: {new Date(game.released).toLocaleDateString('fa-IR')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Description */}
          {game.description_raw && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 lg:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6'>
                درباره بازی
              </h2>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base'>
                {game.description_raw}
              </p>
            </div>
          )}

          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 lg:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6'>
                پلتفرم‌ها
              </h2>
              <div className='flex flex-wrap gap-3'>
                {game.platforms.map((platformWrapper) => (
                  <div
                    key={platformWrapper.platform.id}
                    className='bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600'
                  >
                    <span className='text-gray-900 dark:text-white font-semibold block'>
                      {platformWrapper.platform.name}
                    </span>
                    {platformWrapper.released_at && (
                      <div className='flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1.5'>
                        <HiCalendar className='w-3.5 h-3.5' />
                        <span>
                          {new Date(platformWrapper.released_at).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
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
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
              اطلاعات بازی
            </h2>
            <div className='space-y-6'>
              {game.rating > 0 && (
                <div className='pb-6 border-b border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center gap-2 mb-2'>
                    <HiStar className='w-5 h-5 text-yellow-500 fill-yellow-500' />
                    <p className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
                      امتیاز
                    </p>
                  </div>
                  <p className='text-3xl font-bold text-green-600 mb-1'>
                    {game.rating.toFixed(1)} / {game.rating_top}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    از {game.ratings_count.toLocaleString('fa-IR')} رای
                  </p>
                </div>
              )}

              {game.metacritic && (
                <div className='pb-6 border-b border-gray-200 dark:border-gray-700'>
                  <p className='text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2'>
                    Metacritic
                  </p>
                  <p className='text-3xl font-bold text-yellow-600'>
                    {game.metacritic}
                  </p>
                </div>
              )}

              {game.playtime > 0 && (
                <div className='pb-6 border-b border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center gap-2 mb-2'>
                    <HiClock className='w-5 h-5 text-blue-500' />
                    <p className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
                      زمان بازی متوسط
                    </p>
                  </div>
                  <p className='text-xl font-bold text-gray-900 dark:text-white'>
                    {game.playtime} ساعت
                  </p>
                </div>
              )}

              {game.reviews_count > 0 && (
                <div>
                  <p className='text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2'>
                    تعداد نقدها
                  </p>
                  <p className='text-xl font-bold text-gray-900 dark:text-white'>
                    {game.reviews_count.toLocaleString('fa-IR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                ژانرها
              </h2>
              <div className='flex flex-wrap gap-2'>
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                برچسب‌ها
              </h2>
              <div className='flex flex-wrap gap-2'>
                {game.tags.slice(0, 10).map((tag) => (
                  <span
                    key={tag.id}
                    className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-600'
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Developers */}
          {game.developers && game.developers.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                توسعه‌دهندگان
              </h2>
              <div className='space-y-2'>
                {game.developers.map((developer) => (
                  <p
                    key={developer.id}
                    className='text-gray-700 dark:text-gray-300 font-medium'
                  >
                    {developer.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Publishers */}
          {game.publishers && game.publishers.length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                ناشران
              </h2>
              <div className='space-y-2'>
                {game.publishers.map((publisher) => (
                  <p
                    key={publisher.id}
                    className='text-gray-700 dark:text-gray-300 font-medium'
                  >
                    {publisher.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Website */}
          {game.website && (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
              <a
                href={game.website}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group'
              >
                <span>وب‌سایت رسمی</span>
                <CgWebsite className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default GameDetail
