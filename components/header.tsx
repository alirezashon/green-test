"use client";

import { Box, HStack, Heading, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/services/auth";

export function Header() {
    const router = useRouter();

    const handleLogout = () => {
        removeAuthToken();
        router.push("/login");
    };

    return (
        <Box
            as="header"
            borderBottomWidth="1px"
            px={6}
            py={4}
            bg="white"
            _dark={{ bg: "gray.800" }}
        >
            <HStack justify="space-between">
                <Heading size="lg">Dashboard</Heading>
                <HStack >
                    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                        Welcome back!
                    </Text>
                    <Button onClick={handleLogout} size="sm" colorPalette="red">
                        Logout
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
}
