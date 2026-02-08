'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Badge,
  Skeleton,
} from '@chakra-ui/react'
import { getProducts, searchProducts } from '@/services/products'
import type { Product } from '@/types/product'
import { SkeletonCard } from '@/components/skeleton-card'
import Image from 'next/image'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts(30, 0)
      setProducts(data.products)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts()
      return
    }

    try {
      setSearching(true)
      const data = await searchProducts(searchQuery)
      setProducts(data.products)
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setSearching(false)
    }
  }

  if (loading) {
    return (
      <Box>
        <Skeleton height="40px" mb={6} width="200px" />
        <Skeleton height="40px" mb={6} width="400px" />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </SimpleGrid>
      </Box>
    )
  }

  return (
    <Box>
      <Heading size="lg" mb={6}  color={'gray.500'}>
        محصولات
      </Heading>

      {/* Search */}
      <HStack mb={6} gap={4} flexWrap="wrap">
        <Input
          placeholder="جستجوی محصولات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          maxW="400px"
          color="black"
          _dark={{ color: "white" }}
        />
        <Button
          onClick={handleSearch}
          disabled={searching}
          colorPalette="blue"
        >
          {searching ? 'در حال جستجو...' : 'جستجو'}
        </Button>
        {searchQuery && (
          <Button onClick={loadProducts} variant="outline">
            پاک کردن
          </Button>
        )}
      </HStack>

      {/* Products Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            as="article"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg="white"
            _dark={{ bg: 'gray.800' }}
            _hover={{
              shadow: 'md',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s',
            }}
          >
            <VStack align="stretch" gap={4}>
              {product.thumbnail && (
                <Box
                  as="figure"
                  w="100%"
                  h="250px"
                  borderRadius="md"
                  overflow="hidden"
                  bg="gray.100"
                  _dark={{ bg: "gray.700" }}
                  position="relative"
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              )}

              <VStack align="stretch" gap={2}>
                <HStack justify="space-between" align="start">
                  <Heading 
                    size="sm" 
                    flex={1}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"color="blue.400"
                    style={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.title}
                  </Heading>
                  <Badge colorPalette="blue" fontSize="sm" fontWeight="bold" fontFamily={'heading'}>
                    ${product.price}
                  </Badge>
                </HStack>

                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: 'gray.400' }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  display="-webkit-box"
                  style={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.description}
                </Text>

                <HStack gap={2} flexWrap="wrap">
                  <Badge colorPalette="green">{product.category}</Badge>
                  <Badge colorPalette="purple">{product.brand}</Badge>
                </HStack>

                <HStack gap={4} fontSize="xs" color="gray.500">
                  <Text>⭐ {product.rating}</Text>
                  <Text>Stock: {product.stock}</Text>
                  {product.discountPercentage > 0 && (
                    <Text fontFamily={'fangsong'} color="green.500" fontWeight="bold">
                      -{product.discountPercentage}%
                    </Text>
                  )}
                </HStack>
              </VStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {products.length === 0 && (
        <Text textAlign="center" py={8} color="gray.500">
          محصولی یافت نشد
        </Text>
      )}
    </Box>
  )
}
