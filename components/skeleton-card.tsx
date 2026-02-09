import { Box, Skeleton } from '@chakra-ui/react'

export function SkeletonCard() {
  return (
    <Box
      borderWidth='1px'
      borderRadius='md'
      p={4}
      bg='white'
      _dark={{ bg: 'gray.800' }}
    >
      <Skeleton height='200px' mb={4} borderRadius='md' />
      <Skeleton height='20px' mb={2} width='80%' />
      <Skeleton height='16px' mb={2} width='100%' />
      <Skeleton height='16px' mb={2} width='60%' />
      <Skeleton height='16px' width='40%' />
    </Box>
  )
}
