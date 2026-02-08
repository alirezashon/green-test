"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  VStack,
  HStack,
  Input,
  Button,
  Badge,
} from "@chakra-ui/react";
import { getUsers, searchUsers } from "@/services/users";
import type { User } from "@/types/user";
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(30, 0);
      setUsers(data.users);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadUsers();
      return;
    }

    try {
      setSearching(true);
      const data = await searchUsers(searchQuery);
      setUsers(data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return (
      <VStack gap={4} py={20}>
        <Spinner size="xl" />
        <Text>در حال بارگذاری کاربران...</Text>
      </VStack>
    );
  }

  return (
    <Box>
      <Heading size="xl" mb={6}>
        کاربران
      </Heading>

      <HStack mb={6} gap={4}>
        <Input
          placeholder="جستجوی کاربران..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          maxW="400px"
          color="black"
          _dark={{ color: "white" }}
        />
        <Button onClick={handleSearch} disabled={searching} colorPalette="blue">
          {searching ? "در حال جستجو..." : "جستجو"}
        </Button>
        {searchQuery && (
          <Button onClick={loadUsers} variant="outline">
            پاک کردن
          </Button>
        )}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {users.map((user) => (
          <Box
            key={user.id}
            as="article"
            borderWidth="1px"
            borderRadius="md"
            p={6}
            bg="white"
            _dark={{ bg: "gray.800" }}
            _hover={{
              shadow: 'md',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s',
            }}
          >
            <HStack gap={4} mb={4}>
              <Box
                as="figure"
                width="60px"
                height="60px"
                borderRadius="full"
                overflow="hidden"
                bg="gray.200"
                flexShrink={0}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={444}
                    height={444}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="lg" color={'gray.500'}>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </Text>
                  </Box>
                )}
              </Box>
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" fontSize="lg"  color={'gray.300'}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text fontSize="sm" color="gray.600" direction={'ltr'} _dark={{ color: "gray.400" }}>
                  @{user.username}
                </Text>
              </VStack>
            </HStack>
            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                {user.email}
              </Text>
              <Text fontSize="sm" fontFamily={'fantasy'} direction={'ltr'} color="gray.600" _dark={{ color: "gray.400" }}>
                {user.phone}
              </Text>
              <HStack gap={2} mt={2}>
                <Badge colorPalette="purple">{user.gender}</Badge>
                <Badge colorPalette="orange">Age: {user.age}</Badge>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {users.length === 0 && (
        <Text textAlign="center" py={8} color="gray.500">
          کاربری یافت نشد
        </Text>
      )}
    </Box>
  );
}
