'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Spinner,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { login, setAuthToken } from '@/services/auth'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login({ username, password }).then(async (response) => {
        await setAuthToken(response.accessToken)
        router.push('/dashboard')
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW='md' py={20}>
      <VStack gap={8}>
        <Heading size='2xl'>ورود</Heading>
        <Box
          as='form'
          onSubmit={handleSubmit}
          width='100%'
          borderWidth='1px'
          borderRadius='md'
          p={8}
          bg='white'
          _dark={{ bg: 'gray.800' }}
        >
          <VStack gap={4}>
            {error && (
              <Box
                width='100%'
                p={3}
                borderRadius='md'
                bg='red.50'
                borderWidth='1px'
                borderColor='red.200'
                _dark={{ bg: 'red.900', borderColor: 'red.700' }}
              >
                <Text
                  color='red.600'
                  _dark={{ color: 'red.300' }}
                  fontSize='sm'
                >
                  {error}
                </Text>
              </Box>
            )}
            <Box as='fieldset' width='100%' border='none' p={0} m={0}>
              <Text
                as='label'
                mb={2}
                fontSize='sm'
                fontWeight='medium'
                display='block'
              >
                نام کاربری
              </Text>
              <Input
                placeholder='نام کاربری را وارد کنید'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                color='black'
                _dark={{ color: 'white' }}
              />
            </Box>
            <Box as='fieldset' width='100%' border='none' p={0} m={0}>
              <Text
                as='label'
                mb={2}
                fontSize='sm'
                fontWeight='medium'
                display='block'
              >
                رمز عبور
              </Text>
              <Input
                type='password'
                placeholder='رمز عبور را وارد کنید'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                color='black'
                _dark={{ color: 'white' }}
              />
            </Box>
            <Button
              type='submit'
              width='100%'
              colorPalette='blue'
              disabled={loading}
            >
              {loading ? (
                <HStack gap={2}>
                  <Spinner size='sm' />
                  <Text>در حال ورود...</Text>
                </HStack>
              ) : (
                'ورود'
              )}
            </Button>
            <Text fontSize='xs' color='gray.500' textAlign='center'>
              از هر نام کاربری/رمز عبور DummyJSON استفاده کنید (مثلاً: emilys,
              johnd)
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
