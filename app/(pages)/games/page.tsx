import { Suspense } from 'react'
import GamesClient from './_components/GameList'

export default function GamesPage() {
  return (
    <Suspense
      fallback={<div className='p-10 text-center'>در حال بارگذاری...</div>}
    >
      <GamesClient />
    </Suspense>
  )
}
