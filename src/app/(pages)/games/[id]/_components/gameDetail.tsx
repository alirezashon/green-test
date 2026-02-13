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
        setError('خطا در بارگذاری اطلاعات بازی')
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [params.id])

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black'>
        <div className='container mx-auto px-6 py-16 animate-pulse space-y-6'>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl w-1/3'></div>
          <div className='h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl'></div>
          <div className='space-y-4'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6'></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black'>
        <div className='text-center'>
          <HiXCircle className='w-20 h-20 text-red-500 mx-auto mb-6' />
          <p className='text-lg font-medium text-red-600 mb-6'>
            {error || 'بازی یافت نشد'}
          </p>
          <Link
            href='/games'
            className='inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            <HiArrowRight />
            بازگشت به لیست بازی‌ها
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black'>
      <div className='container mx-auto px-6 py-12'>

        {/* Back */}
        <button
          onClick={() => router.back()}
          className='mb-10 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition group'
        >
          <HiArrowRight className='group-hover:translate-x-1 transition-transform' />
          بازگشت
        </button>

        {/* Hero */}
        <div className='relative h-[420px] rounded-3xl overflow-hidden shadow-2xl mb-12'>
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              unoptimized
              className='object-cover scale-105 hover:scale-110 transition duration-700'
              priority
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800'>
              <FaGamepad className='w-24 h-24 text-gray-400' />
            </div>
          )}

          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent' />

          <div className='absolute bottom-0 p-10'>
            <h1 className='text-5xl font-bold text-white mb-4 drop-shadow-xl'>
              {game.name}
            </h1>

            {game.released && (
              <div className='flex items-center gap-2 text-white/90'>
                <HiCalendar />
                {new Date(game.released).toLocaleDateString('fa-IR')}
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>

          {/* Main */}
          <div className='lg:col-span-2 space-y-8'>

            {game.description_raw && (
              <div className='p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl border border-white/20'>
                <h2 className='text-2xl font-bold mb-6'>درباره بازی</h2>
                <p className='leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line'>
                  {game.description_raw}
                </p>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className='space-y-8'>

            <div className='p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl border border-white/20'>
              <h2 className='text-xl font-bold mb-6'>اطلاعات بازی</h2>

              {game.rating > 0 && (
                <div className='mb-6'>
                  <div className='flex items-center gap-2 mb-2 text-yellow-500'>
                    <HiStar className='fill-yellow-500' />
                    امتیاز
                  </div>
                  <p className='text-4xl font-bold text-green-600'>
                    {game.rating.toFixed(1)}
                  </p>
                </div>
              )}

              {game.playtime > 0 && (
                <div className='mb-6'>
                  <div className='flex items-center gap-2 mb-2 text-blue-500'>
                    <HiClock />
                    زمان بازی
                  </div>
                  <p className='text-lg font-semibold'>
                    {game.playtime} ساعت
                  </p>
                </div>
              )}
            </div>

            {game.website && (
              <div className='p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:scale-105 transition'>
                <a
                  href={game.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-between'
                >
                  <span>وب‌سایت رسمی</span>
                  <CgWebsite />
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetail
