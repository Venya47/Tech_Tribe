import React from 'react';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';

const DomainCard = ({ name, memberCount, onJoin }) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={5}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.15s ease-out"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
    >
      <Stack spacing={3}>
        <Heading size="md" fontWeight="semibold">
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {memberCount.toLocaleString()} members
        </Text>
        <Button
          onClick={onJoin}
          size="sm"
          colorScheme="brand"
          variant="ghost"
          alignSelf="flex-start"
        >
          Join community
        </Button>
      </Stack>
    </Box>
  );
};

export default DomainCard;

