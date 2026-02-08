import { Box, Text, Heading } from "@chakra-ui/react";

interface StatCardProps {
  label: string;
  value: string | number;
  helpText?: string;
}

export function StatCard({ label, value, helpText }: StatCardProps) {
  return (
    <Box
      as="section"
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
      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mb={2}>
        {label}
      </Text>
      <Heading size="lg" mb={helpText ? 1 : 0}>
        {value}
      </Heading>
      {helpText && (
        <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.500" }}>
          {helpText}
        </Text>
      )}
    </Box>
  );
}
