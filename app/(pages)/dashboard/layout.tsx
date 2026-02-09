'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box } from '@chakra-ui/react'
import { TopNav } from '@/components/top-nav'
import { isAuthenticated } from '@/services/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [router])

  return (
    <Box minH='100vh' bg='gray.50' _dark={{ bg: 'gray.950' }}>
      <TopNav />
      <Box p={{ base: 4, md: 6, lg: 8 }} maxW='container.xl' mx='auto'>
        {children}
      </Box>
    </Box>
  )
}
