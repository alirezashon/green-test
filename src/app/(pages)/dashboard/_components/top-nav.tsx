'use client'

import { Box, HStack, Heading, Button, Text } from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { removeAuthToken } from '@/services/auth'

export function TopNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    removeAuthToken()
    router.push('/login')
  }

  const navItems = [
    { label: 'داشبورد', href: '/dashboard' },
    { label: 'محصولات', href: '/dashboard/products' },
    { label: 'کاربران', href: '/dashboard/users' },
  ]

  return (
    <Box
      as='nav'
      position='sticky'
      top={0}
      zIndex={1000}
      borderBottomWidth='1px'
      bg='white'
      _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
      px={{ base: 4, md: 8 }}
      py={4}
    >
      <HStack justify='space-between' align='center' flexWrap='wrap' gap={4}>
        <HStack gap={8}>
          <Heading
            size='lg'
            fontWeight='bold'
            color='black'
            _dark={{ color: 'white' }}
          >
            DummyJSON
          </Heading>
          <HStack gap={4} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Text
                    px={3}
                    py={2}
                    borderRadius='md'
                    fontWeight={isActive ? 'bold' : 'normal'}
                    color={isActive ? 'blue.600' : 'gray.700'}
                    _dark={{
                      color: isActive ? 'blue.400' : 'gray.300',
                    }}
                    _hover={{
                      bg: 'gray.100',
                      _dark: { bg: 'gray.800' },
                    }}
                  >
                    {item.label}
                  </Text>
                </Link>
              )
            })}
          </HStack>
        </HStack>
        <HStack gap={4}>
          <Button
            onClick={handleLogout}
            size='sm'
            colorPalette='red'
            variant='outline'
          >
            خروج
          </Button>
        </HStack>
      </HStack>
    </Box>
  )
}
