'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Game, GamesQueryParams } from '@/services/rawg'
import { getGames } from '@/services/games'
import { Filters, FilterValues } from './_components/Filters'
import { GamesGrid } from './_components/GamesGrid'

export default function GamesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Header Section */}
        <div className='mb-8 lg:mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className='text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                بازی‌ها
              </h1>
              {totalCount > 0 && (
                <p className='text-lg text-gray-600 dark:text-gray-400 flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-blue-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <span className='font-semibold'>
                    {totalCount.toLocaleString('fa-IR')}
                  </span>
                  <span>بازی موجود است</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
          {/* Filters Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-4'>
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Games Grid */}
          <div className='lg:col-span-3'>
            <GamesGrid games={games} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className='group px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm'
                >
                  <span className='flex items-center gap-2'>
                    <span className='group-hover:-translate-x-1 transition-transform duration-200'>
                      ←
                    </span>
                    قبلی
                  </span>
                </button>

                <div className='flex items-center gap-2 flex-wrap justify-center'>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:scale-105'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className='group px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm'
                >
                  <span className='flex items-center gap-2'>
                    بعدی
                    <span className='group-hover:translate-x-1 transition-transform duration-200'>
                      →
                    </span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
