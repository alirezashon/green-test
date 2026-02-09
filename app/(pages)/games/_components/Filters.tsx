'use client'

import { useState, useEffect } from 'react'
import { NamedEntity } from '@/services/rawg'
import { getGenres, getPlatforms } from '@/services/games'

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void
}

export interface FilterValues {
  search: string
  genres: string[]
  platforms: string[]
  ordering: string
  dates: string
  metacritic: string
}

const ORDERING_OPTIONS = [
  { value: '', label: 'پیش‌فرض' },
  { value: 'name', label: 'نام (صعودی)' },
  { value: '-name', label: 'نام (نزولی)' },
  { value: 'released', label: 'تاریخ انتشار (قدیمی)' },
  { value: '-released', label: 'تاریخ انتشار (جدید)' },
  { value: 'rating', label: 'امتیاز (کم)' },
  { value: '-rating', label: 'امتیاز (زیاد)' },
  { value: 'metacritic', label: 'Metacritic (کم)' },
  { value: '-metacritic', label: 'Metacritic (زیاد)' },
]

const DATE_OPTIONS = [
  { value: '', label: 'همه تاریخ‌ها' },
  { value: '2024-01-01,2024-12-31', label: '2024' },
  { value: '2023-01-01,2023-12-31', label: '2023' },
  { value: '2022-01-01,2022-12-31', label: '2022' },
  { value: '2021-01-01,2021-12-31', label: '2021' },
  { value: '2020-01-01,2020-12-31', label: '2020' },
]

export function Filters({ onFilterChange }: FiltersProps) {
  const [genres, setGenres] = useState<NamedEntity[]>([])
  const [platforms, setPlatforms] = useState<NamedEntity[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    genres: [],
    platforms: [],
    ordering: '',
    dates: '',
    metacritic: '',
  })

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [genresData, platformsData] = await Promise.all([
          getGenres(),
          getPlatforms(),
        ])
        setGenres(genresData.results)
        setPlatforms(platformsData.results)
      } catch (error) {
        console.error('Error loading filters:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFilters()
  }, [])

  useEffect(() => {
    onFilterChange(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
  }

  const handleGenreToggle = (genreId: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter((id) => id !== genreId)
        : [...prev.genres, genreId],
    }))
  }

  const handlePlatformToggle = (platformId: string) => {
    setFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((id) => id !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const handleOrderingChange = (value: string) => {
    setFilters((prev) => ({ ...prev, ordering: value }))
  }

  const handleDateChange = (value: string) => {
    setFilters((prev) => ({ ...prev, dates: value }))
  }

  const handleMetacriticChange = (value: string) => {
    setFilters((prev) => ({ ...prev, metacritic: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      genres: [],
      platforms: [],
      ordering: '',
      dates: '',
      metacritic: '',
    })
  }

  if (loading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <div className='animate-pulse space-y-4'>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4'></div>
          <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
          فیلترها
        </h2>
        <button
          onClick={clearFilters}
          className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
        >
          پاک کردن فیلترها
        </button>
      </div>

      {/* Search */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          جستجو
        </label>
        <input
          type='text'
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder='نام بازی را وارد کنید...'
          className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      {/* Ordering */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          مرتب‌سازی
        </label>
        <select
          value={filters.ordering}
          onChange={(e) => handleOrderingChange(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          {ORDERING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filter */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          تاریخ انتشار
        </label>
        <select
          value={filters.dates}
          onChange={(e) => handleDateChange(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          {DATE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Metacritic Filter */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          حداقل امتیاز Metacritic
        </label>
        <input
          type='number'
          min='0'
          max='100'
          value={filters.metacritic}
          onChange={(e) => handleMetacriticChange(e.target.value)}
          placeholder='مثلاً 80'
          className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      {/* Genres */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          ژانرها
        </label>
        <div className='max-h-48 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3'>
          {genres.map((genre) => (
            <label
              key={genre.id}
              className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded'
            >
              <input
                type='checkbox'
                checked={filters.genres.includes(String(genre.id))}
                onChange={() => handleGenreToggle(String(genre.id))}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {genre.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          پلتفرم‌ها
        </label>
        <div className='max-h-48 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3'>
          {platforms.map((platform) => (
            <label
              key={platform.id}
              className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded'
            >
              <input
                type='checkbox'
                checked={filters.platforms.includes(String(platform.id))}
                onChange={() => handlePlatformToggle(String(platform.id))}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {platform.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
