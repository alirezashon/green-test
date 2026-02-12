'use client';

import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState, useRef, useEffect } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { HiChevronUpDown } from 'react-icons/hi2';
import { PiCheckCircleDuotone } from 'react-icons/pi';

export interface SelectItem {
    id: string | number;
    label: string;
    group?: string;
    [key: string]: any;
}

interface MultiSelectorProps {
    items: SelectItem[];
    selectedItems: (string | number)[];
    onChange: (selected: (string | number)[]) => void;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    searchPlaceholder?: string;
    emptyMessage?: string;
    maxHeight?: string;
}

// ارتفاع ثابت هر ردیف برای مجازی‌سازی دستی
const ITEM_HEIGHT = 48;

const MultiSelector: React.FC<MultiSelectorProps> = ({
    items,
    selectedItems,
    onChange,
    label,
    placeholder = 'انتخاب کنید...',
    disabled = false,
    searchPlaceholder = 'جستجو...',
    emptyMessage = 'موردی یافت نشد',
    maxHeight = '60vh',
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);

    // فیلتر کردن گزینه‌ها بر اساس متن جستجو
    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;

        const query = searchQuery.toLowerCase().trim();
        return items.filter((item) =>
            item.label.toLowerCase().includes(query) ||
            item.group?.toLowerCase().includes(query)
        );
    }, [items, searchQuery]);

    // گروه‌بندی گزینه‌ها بر اساس فیلد گروه
    const groupedItems = useMemo(() => {
        const groups: Record<string, SelectItem[]> = {};

        filteredItems.forEach((item) => {
            const groupKey = item.group || 'سایر';
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(item);
        });

        const sortedGroups = Object.keys(groups).sort();
        const result: Array<{ type: 'group'; name: string } | { type: 'item'; item: SelectItem }> = [];

        sortedGroups.forEach((groupName) => {
            result.push({ type: 'group', name: groupName });
            groups[groupName]
                .sort((a, b) => a.label.localeCompare(b.label))
                .forEach((item) => {
                    result.push({ type: 'item', item });
                });
        });

        return result;
    }, [filteredItems]);

    // محاسبه وضعیت اسکرول برای مجازی‌سازی
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setScrollTop(target.scrollTop);
        setViewportHeight(target.clientHeight);
    };

    // محاسبه محدوده ردیف‌های قابل نمایش
    const totalHeight = groupedItems.length * ITEM_HEIGHT;
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 5);
    const endIndex = Math.min(
        groupedItems.length,
        Math.ceil((scrollTop + viewportHeight) / ITEM_HEIGHT) + 5
    );
    const visibleItems = groupedItems.slice(startIndex, endIndex);
    const offsetTop = startIndex * ITEM_HEIGHT;

    // انتخاب همه گزینه‌های قابل مشاهده
    const handleSelectAll = () => {
        const visibleItemIds = filteredItems.map((item) => item.id);
        const newSelected = [...new Set([...selectedItems, ...visibleItemIds])];
        onChange(newSelected);
    };

    // حذف انتخاب همه گزینه‌ها
    const handleDeselectAll = () => {
        onChange([]);
    };

    // تغییر وضعیت انتخاب یک گزینه
    const handleItemToggle = (itemId: string | number) => {
        if (selectedItems.includes(itemId)) {
            onChange(selectedItems.filter((id) => id !== itemId));
        } else {
            onChange([...selectedItems, itemId]);
        }
    };

    // متن نمایشی داخل دکمه اصلی
    const displayLabel = useMemo(() => {
        if (selectedItems.length === 0) {
            return placeholder;
        }
        if (selectedItems.length === 1) {
            const selectedItem = items.find((item) => item.id === selectedItems[0]);
            return selectedItem?.label || placeholder;
        }
        return `${selectedItems.length} مورد انتخاب شده`;
    }, [selectedItems, items, placeholder]);

    // پاک کردن متن جستجو هنگام بستن لیست
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
        }
    }, [isOpen]);

    return (
        <div className="w-full" dir="rtl">
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <Listbox
                value={selectedItems}
                onChange={onChange}
                multiple
                disabled={disabled}
            >
                {({ open }) => {
                    useEffect(() => {
                        setIsOpen(open);
                    }, [open]);

                    return (
                        <div className="relative">
                            {/* دکمه اصلی نمایش انتخاب‌ها */}
                            <Listbox.Button
                                className={`
                  relative w-full cursor-default rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-right text-sm shadow-sm transition-all
                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                  ${disabled ? 'cursor-not-allowed opacity-60 bg-gray-50' : 'hover:border-gray-400'}
                  ${selectedItems.length > 0 ? 'text-gray-900' : 'text-gray-500'}
                `}
                            >
                                <span className="block truncate">{displayLabel}</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                                    <HiChevronUpDown
                                        className={`h-5 w-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </span>
                                {selectedItems.length > 0 && (
                                    <span className="absolute inset-y-0 right-3 flex items-center">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                                            {selectedItems.length}
                                        </span>
                                    </span>
                                )}
                            </Listbox.Button>

                            {/* بدنه بازشونده شامل جستجو و لیست گزینه‌ها */}
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    static
                                    className={`
                    absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl
                    focus:outline-none
                  `}
                                >
                                    {/* بخش بالای لیست: جستجو و دکمه‌های انتخاب همه / حذف همه */}
                                    <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm p-3">
                                        {/* ورودی جستجو */}
                                        <div className="relative mb-3">
                                            <input
                                                type="text"
                                                placeholder={searchPlaceholder}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-right text-sm text-gray-800 outline-none transition-all
                          focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                                autoFocus
                                            />
                                            {searchQuery && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSearchQuery('');
                                                    }}
                                                    className="absolute inset-y-0 left-2 flex items-center justify-center rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                                                    aria-label="پاک کردن جستجو"
                                                >
                                                    <IoCloseCircle size={18} />
                                                </button>
                                            )}
                                        </div>

                                        {/* دکمه‌های کنترلی و نمایش تعداد انتخاب‌شده‌ها */}
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectAll();
                                                    }}
                                                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all
                            hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 active:scale-95"
                                                >
                                                    انتخاب همه
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeselectAll();
                                                    }}
                                                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-all
                            hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 active:scale-95"
                                                >
                                                    حذف همه
                                                </button>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {selectedItems.length > 0
                                                    ? `${selectedItems.length} مورد انتخاب شده`
                                                    : 'هیچ موردی انتخاب نشده'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* لیست گزینه‌ها با مجازی‌سازی ساده */}
                                    <div
                                        ref={scrollContainerRef}
                                        onScroll={handleScroll}
                                        className="overflow-y-auto"
                                        style={{ maxHeight }}
                                    >
                                        {filteredItems.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                                {emptyMessage}
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    height: totalHeight || 'auto',
                                                    position: 'relative',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: offsetTop,
                                                        left: 0,
                                                        right: 0,
                                                    }}
                                                >
                                                    {visibleItems.map((entry, idx) => {
                                                        if (entry.type === 'group') {
                                                            return (
                                                                <div
                                                                    key={`group-${entry.name}-${startIndex + idx}`}
                                                                    className="sticky top-0 z-0 bg-gray-50/95 px-4 py-2 text-xs font-semibold text-gray-600 backdrop-blur-sm"
                                                                >
                                                                    {entry.name}
                                                                </div>
                                                            );
                                                        }

                                                        const item = entry.item;
                                                        const isSelected = selectedItems.includes(item.id);

                                                        return (
                                                            <Listbox.Option
                                                                key={item.id}
                                                                value={item.id}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleItemToggle(item.id);
                                                                }}
                                                                className={({ active }) =>
                                                                    `relative flex cursor-pointer select-none items-center gap-3 px-4 py-3 text-sm transition-colors
                                  ${active ? 'bg-sky-50 text-sky-900' : 'text-gray-900'}
                                  ${isSelected ? 'bg-sky-100' : ''}
                                  hover:bg-sky-50`
                                                                }
                                                            >
                                                                {({ active }) => (
                                                                    <>
                                                                        {/* دایره توخالی همیشه نمایش داده می‌شود و در حالت انتخاب تیک می‌خورد */}
                                                                        <span
                                                                            className={[
                                                                                'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all',
                                                                                isSelected
                                                                                    ? 'bg-sky-600 border-sky-600'
                                                                                    : 'bg-white border-gray-300',
                                                                                active ? 'ring-2 ring-sky-200' : '',
                                                                            ].join(' ')}
                                                                        >
                                                                            {isSelected ? (
                                                                                <PiCheckCircleDuotone className="h-3.5 w-3.5 text-white" />
                                                                            ) : (
                                                                                <span className="block h-2 w-2 rounded-full bg-transparent" />
                                                                            )}
                                                                        </span>

                                                                        <span
                                                                            className={`flex-1 truncate text-right ${isSelected
                                                                                ? 'font-semibold text-sky-900'
                                                                                : 'font-normal text-gray-700'
                                                                                }`}
                                                                        >
                                                                            {item.label}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Listbox.Options>
                            </Transition>
                        </div>
                    );
                }}
            </Listbox>
        </div>
    );
};

export default MultiSelector;
