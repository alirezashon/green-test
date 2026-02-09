import { notFound } from 'next/navigation'
import { GameDetails } from '@/services/rawg'
import { getGameById } from '@/services/games'
import GameDetail from './_components/gameDetail'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  try {
    const game = await getGameById(resolvedParams.id)
    return {
      title: `${game.name} | بازی‌ها`,
      description: game.description_raw
        ? game.description_raw.substring(0, 160)
        : `اطلاعات کامل بازی ${game.name}`,
    }
  } catch {
    return {
      title: 'بازی یافت نشد',
    }
  }
}

export default async function GameDetailPage({ params }: PageProps) {
  const resolvedParams = await params

  try {
    const game: GameDetails = await getGameById(resolvedParams.id)
    return <GameDetail game={game} />
  } catch (error) {
    console.error('[Game Detail Page] Failed to load game:', error)
    notFound()
  }
}
