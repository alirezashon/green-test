'use client'

import { Fragment, useMemo, useRef, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { HiChevronUpDown } from 'react-icons/hi2'
import { PiCheckCircleDuotone } from 'react-icons/pi'

interface Item {
  id: number
  label: string
  value: string
}

interface Props {
  items: Item[]
  value: Item[]
  onChange: (items: Item[]) => void
}

export function AdvancedSelect({ items, value, onChange }: Props) {
  const [query, setQuery] = useState('')

  // فیلتر گزینه‌ها بر اساس متن جستجو
  const filteredItems = useMemo(
    () =>
      items.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  )

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 5,
  })

  const allSelected = value.length === items.length

  const toggleAll = () => {
    onChange(allSelected ? [] : items)
  }

  // اندازه‌گیری مجدد لیست هنگام تغییر تعداد گزینه‌های فیلتر شده
  useEffect(() => {
    if (parentRef.current) {
      rowVirtualizer.measure()
    }
  }, [filteredItems.length, rowVirtualizer])

  return (
    <Listbox value={value} onChange={onChange} multiple>
      {({ open }) => (
        <div className="relative w-full ">
          {/* دکمه اصلی انتخاب چندگانه */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-right shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-gray-400 text-sm">انتخاب آیتم‌ها</span>
            ) : (
              <>
                {value.slice(0, 3).map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium"
                  >
                    {item.label}
                  </span>
                ))}
                {value.length > 3 && (
                  <span className="rounded-full bg-gray-200 text-gray-700 px-3 py-1 text-xs">
                    +{value.length - 3}
                  </span>
                )}
              </>
            )}
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <HiChevronUpDown className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          {/* بدنه بازشونده شامل جستجو و لیست مجازی */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute z-20 mt-2 w-full max-h-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
              {/* بخش جستجو در بالای لیست */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* دکمه انتخاب یا لغو همه گزینه‌ها */}
              <div
                onClick={toggleAll}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                {allSelected ? 'لغو انتخاب همه' : 'انتخاب همه'}
              </div>

              {/* لیست مجازی گزینه‌ها */}
              <div
                ref={parentRef}
                className="relative overflow-auto"
                style={{ height: '240px' }}
                onScroll={() => rowVirtualizer.measure()}
              >
                <div
                  style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const item = filteredItems[virtualRow.index]
                    if (!item) return null

                    return (
                      <Listbox.Option
                        key={virtualRow.key}
                        value={item}
                        className={({ active, selected }) =>
                          `absolute top-0 left-0 right-0 px-4 py-2 text-sm cursor-pointer transition
                           ${active ? 'bg-blue-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
                           ${selected ? 'text-blue-700 dark:text-blue-400 font-medium' : 'text-gray-800 dark:text-gray-200'}`
                        }
                        style={{
                          height: virtualRow.size ?? 44,
                          transform: `translateY(${virtualRow.start}px)`,
                          willChange: 'transform',
                        }}
                      >
                        {({ selected }) => (
                          <div className="flex items-center gap-3">
                            {/* دایره توخالی به صورت پیش‌فرض و دایره تیک‌دار در حالت انتخاب */}
                            <span
                              className={[
                                'flex h-5 w-5 items-center justify-center rounded-full border',
                                selected
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'bg-white dark:bg-gray-900 border-gray-400 dark:border-gray-600',
                              ].join(' ')}
                            >
                              {selected ? (
                                <PiCheckCircleDuotone className="h-4 w-4 text-white" />
                              ) : (
                                <span className="block h-2 w-2 rounded-full bg-transparent" />
                              )}
                            </span>

                            <span className="truncate">{item.label}</span>
                          </div>
                        )}
                      </Listbox.Option>
                    )
                  })}
                </div>
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default AdvancedSelect