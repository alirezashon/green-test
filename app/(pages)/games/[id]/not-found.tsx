import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <div className='mb-8'>
          <h1 className='text-6xl font-extrabold text-gray-900 dark:text-white mb-4'>
            404
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
        </div>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
          بازی یافت نشد
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          متأسفانه بازی مورد نظر شما یافت نشد. لطفاً به صفحه اصلی بازگردید.
        </p>
        <Link
          href='/games'
          className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'
        >
          <span>بازگشت به لیست بازی‌ها</span>
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
              d='M13 7l5 5m0 0l-5 5m5-5H6'
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
