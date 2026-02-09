'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { StatCard } from '@/components/stat-card'
import { getUsers } from '@/services/users'
import { getProducts } from '@/services/products'

export default function DashboardPage() {
  const [usersCount, setUsersCount] = useState(0)
  const [productsCount, setProductsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersData, productsData] = await Promise.all([
          getUsers(1, 0),
          getProducts(1, 0),
        ])
        setUsersCount(usersData.total)
        setProductsCount(productsData.total)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <VStack gap={4} py={20}>
        <Spinner size='xl' />
        <Text>در حال بارگذاری داشبورد...</Text>
      </VStack>
    )
  }

  return (
    <Box as='main'>
      <Heading size='xl' mb={6} color={'gray.500'}>
        نمای کلی داشبورد
      </Heading>
      <SimpleGrid
        color={'gray.400'}
        columns={{ base: 1, md: 2, lg: 4 }}
        gap={4}
      >
        <StatCard label='کل کاربران' value={usersCount} />
        <StatCard label='کل محصولات' value={productsCount} />
      </SimpleGrid>
    </Box>
  )
}
