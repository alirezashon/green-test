'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Game, GamesQueryParams } from '@/services/rawg'
import { getGames } from '@/services/games'
import { Filters, FilterValues } from './Filters'
import { GamesGrid } from './GamesGrid'
import { FaGamepad } from 'react-icons/fa'

export default function GamesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [filters, setFilters] = useState<FilterValues>({
    search: searchParams.get('search') || '',
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
    ordering: searchParams.get('ordering') || '',
    dates: searchParams.get('dates') || '',
    metacritic: searchParams.get('metacritic') || '',
  })

  const fetchGames = useCallback(async () => {
    setLoading(true)
    try {
      const params: GamesQueryParams = {
        page,
        page_size: 20,
      }

      if (filters.search) {
        params.search = filters.search
      }

      if (filters.genres.length > 0) {
        params.genres = filters.genres.join(',')
      }

      if (filters.platforms.length > 0) {
        params.platforms = filters.platforms.join(',')
      }

      if (filters.ordering) {
        params.ordering = filters.ordering
      }

      if (filters.dates) {
        params.dates = filters.dates
      }

      if (filters.metacritic) {
        params.metacritic = filters.metacritic
      }

      const data = await getGames(params)
      setGames(data.results)
      setTotalCount(data.count)
      setTotalPages(Math.ceil(data.count / 20))
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
    }
  }, [page, filters])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  const handleFilterChange = useCallback(
    (newFilters: FilterValues) => {
      setFilters(newFilters)
      setPage(1)

      // Update URL params
      const params = new URLSearchParams()
      if (newFilters.search) params.set('search', newFilters.search)
      if (newFilters.genres.length > 0)
        params.set('genres', newFilters.genres.join(','))
      if (newFilters.platforms.length > 0)
        params.set('platforms', newFilters.platforms.join(','))
      if (newFilters.ordering) params.set('ordering', newFilters.ordering)
      if (newFilters.dates) params.set('dates', newFilters.dates)
      if (newFilters.metacritic) params.set('metacritic', newFilters.metacritic)

      router.push(`/games?${params.toString()}`, { scroll: false })
    },
    [router],
  )

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='container mx-auto px-4 lg:px-8 py-10'>
      {/* Header */}
      <div className='mb-10'>
        <div className='flex items-center gap-3 mb-2'>
          <FaGamepad className='w-7 h-7 text-blue-600 dark:text-blue-400' />
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            بازی‌ها
          </h1>
        </div>

        {totalCount > 0 && (
          <p className='text-gray-600 dark:text-gray-400'>
            تعداد کل{' '}
            <span className='font-semibold text-gray-900  '>
              {totalCount.toLocaleString('fa-IR')}
            </span>{' '}
            بازی
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Sidebar */}
        <aside className='lg:col-span-1'>
          <div className='sticky top-6'>
            <Filters onFilterChange={handleFilterChange} />
          </div>
        </aside>

        {/* Content */}
        <section className='lg:col-span-3'>
          <GamesGrid games={games} loading={loading} />

          {totalPages > 1 && (
            <div className='mt-12 flex items-center justify-center gap-2 flex-wrap'>
              {/* Prev */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className='px-4 py-2 rounded-lg border text-sm font-medium
              border-gray-300 dark:border-gray-600
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                قبلی
              </button>

              {/* Numbers */}
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum: number
                if (totalPages <= 5) pageNum = i + 1
                else if (page <= 3) pageNum = i + 1
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + i
                else pageNum = page - 2 + i

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[38px] h-9 rounded-lg text-sm font-medium border
                  ${
                    page === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {/* Next */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className='px-4 py-2 rounded-lg border text-sm font-medium
              border-gray-300 dark:border-gray-600
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                بعدی
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
