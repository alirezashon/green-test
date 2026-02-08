'use client'

import { Box, VStack, Text } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'داشبورد', href: '/dashboard' },
  { label: 'کاربران', href: '/dashboard/users' },
  { label: 'محصولات', href: '/dashboard/products' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <Box
      as='aside'
      width='250px'
      borderRightWidth='1px'
      p={6}
      bg='gray.50'
      _dark={{ bg: 'gray.900' }}
      minH='100vh'
    >
      <VStack align='stretch' gap={2}>
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link key={index} href={item.href} style={{ textDecoration: 'none' }}>
              <Box
                px={4}
                py={2}
                borderRadius='md'
                bg={isActive ? 'blue.500' : 'transparent'}
                color={isActive ? 'white' : 'gray.700'}
                _dark={{
                  color: isActive ? 'white' : 'gray.300',
                }}
                _hover={{
                  bg: isActive ? 'blue.600' : 'gray.200',
                  _dark: {
                    bg: isActive ? 'blue.600' : 'gray.800',
                  },
                }}
              >
                <Text fontWeight={isActive ? 'bold' : 'normal'}>
                  {item.label}
                </Text>
              </Box>
            </Link>
          )
        })}
      </VStack>
    </Box>
  )
}
