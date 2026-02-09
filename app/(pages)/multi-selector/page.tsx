'use client'

import { useState } from 'react'
import MultiSelector, { SelectItem } from './_components/multiSelector'
import AdvancedSelect from './_components/AdvancedSelect'

// داده نمونه برای ژانرها و پلتفرم‌ها
const gameGenres: SelectItem[] = [
  { id: 1, label: 'Action', group: 'A' },
  { id: 2, label: 'Adventure', group: 'A' },
  { id: 3, label: 'Arcade', group: 'A' },
  { id: 4, label: 'Board Games', group: 'B' },
  { id: 5, label: 'Card', group: 'C' },
  { id: 6, label: 'Casual', group: 'C' },
  { id: 7, label: 'Educational', group: 'E' },
  { id: 8, label: 'Fighting', group: 'F' },
  { id: 9, label: 'Indie', group: 'I' },
  { id: 10, label: 'Massively Multiplayer', group: 'M' },
  { id: 11, label: 'Music', group: 'M' },
  { id: 12, label: 'Platformer', group: 'P' },
  { id: 13, label: 'Puzzle', group: 'P' },
  { id: 14, label: 'Racing', group: 'R' },
  { id: 15, label: 'Role-playing (RPG)', group: 'R' },
  { id: 16, label: 'Simulation', group: 'S' },
  { id: 17, label: 'Sports', group: 'S' },
  { id: 18, label: 'Strategy', group: 'S' },
  { id: 19, label: 'Shooter', group: 'S' },
  { id: 20, label: 'Tactical', group: 'T' },
]

const gamePlatforms: SelectItem[] = [
  { id: 1, label: 'PC (Windows)', group: 'P' },
  { id: 2, label: 'PlayStation 5', group: 'P' },
  { id: 3, label: 'PlayStation 4', group: 'P' },
  { id: 4, label: 'Xbox Series X/S', group: 'X' },
  { id: 5, label: 'Xbox One', group: 'X' },
  { id: 6, label: 'Nintendo Switch', group: 'N' },
  { id: 7, label: 'iOS', group: 'M' },
  { id: 8, label: 'Android', group: 'M' },
  { id: 9, label: 'macOS', group: 'M' },
  { id: 10, label: 'Linux', group: 'L' },
  { id: 11, label: 'PlayStation 3', group: 'P' },
  { id: 12, label: 'Xbox 360', group: 'X' },
  { id: 13, label: 'Wii U', group: 'W' },
  { id: 14, label: 'Wii', group: 'W' },
  { id: 15, label: 'Nintendo 3DS', group: 'N' },
]

const longItems = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  label: `آیتم ${i + 1}`,
  value: `item${i + 1}`,
}))

export default function MultiSelectorPage() {
  const [selectedGenres, setSelectedGenres] = useState<(string | number)[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    (string | number)[]
  >([])
  const [advancedSelected, setAdvancedSelected] = useState<typeof longItems>([])

  return (
    <div className='w-full min-h-screen flex flex-col items-center gap-10 p-6 bg-gray-50'>
      {/* سربرگ */}
      <div className='text-center max-w-2xl'>
        <h1 className='mb-3 text-4xl font-extrabold text-gray-900'>
          انتخابگر چندگانه پیشرفته
        </h1>
        <p className='text-lg text-gray-600'>
          در این صفحه هر دو نسخه مولتی سلکت گروه‌بندی‌شده و نسخه پیشرفته با
          لیست بلند نمایش داده شده‌اند
        </p>
      </div>

      {/* کارت‌ها */}
      <div className='flex flex-col gap-16 w-full items-center'>
        {/* کارت نسخه پیشرفته */}
        <div className='w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl border border-gray-200'>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              نسخه پیشرفته با لیست بسیار بلند
            </h2>
            <p className='text-gray-600'>
              این نسخه برای لیست‌های طولانی با مجازی‌سازی و دایره انتخاب توخالی
              طراحی شده است
            </p>
          </div>

          <AdvancedSelect
            items={longItems}
            value={advancedSelected}
            onChange={setAdvancedSelected}
          />

          {/* نمایش آیتم‌های انتخاب‌شده */}
          <div className='mt-6 p-4 rounded-xl border border-dashed border-gray-200 bg-purple-50'>
            <h3 className='mb-2 text-gray-700 font-semibold'>
              آیتم‌های انتخاب‌شده
            </h3>
            {advancedSelected.length === 0 ? (
              <p className='text-gray-400 text-sm'>
                هنوز آیتمی انتخاب نشده است
              </p>
            ) : (
              <div className='flex flex-wrap gap-2'>
                {advancedSelected.map((item) => (
                  <span
                    key={item.id}
                    className='px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700'
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* کارت مولتی سلکت گروه‌بندی‌شده */}
        <div className='w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl border border-gray-200 flex flex-col gap-8'>
          <div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              مولتی سلکت گروه‌بندی‌شده
            </h2>
            <p className='text-gray-600'>
              انتخاب چندگانه با جستجو، دکمه انتخاب همه و گروه‌بندی بر اساس حروف
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-8 w-full'>
            {/* ژانر */}
            <div className='flex-1'>
              <MultiSelector
                items={gameGenres}
                selectedItems={selectedGenres}
                onChange={setSelectedGenres}
                label='ژانر بازی'
                placeholder='ژانر مورد نظر را انتخاب کنید...'
                searchPlaceholder='جستجوی ژانر...'
                emptyMessage='ژانری یافت نشد'
              />
              {selectedGenres.length > 0 && (
                <div className='mt-3 rounded-lg bg-sky-50 p-3'>
                  <p className='text-sky-900 font-medium text-sm'>
                    {selectedGenres.length} ژانر انتخاب شده است
                  </p>
                </div>
              )}
            </div>

            {/* پلتفرم */}
            <div className='flex-1'>
              <MultiSelector
                items={gamePlatforms}
                selectedItems={selectedPlatforms}
                onChange={setSelectedPlatforms}
                label='پلتفرم'
                placeholder='پلتفرم مورد نظر را انتخاب کنید...'
                searchPlaceholder='جستجوی پلتفرم...'
                emptyMessage='پلتفرمی یافت نشد'
              />
              {selectedPlatforms.length > 0 && (
                <div className='mt-3 rounded-lg bg-emerald-50 p-3'>
                  <p className='text-emerald-900 font-medium text-sm'>
                    {selectedPlatforms.length} پلتفرم انتخاب شده است
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
