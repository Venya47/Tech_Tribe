import React from 'react';
import { Box, Heading, Text, Stack, IconButton, HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const PostCard = ({
  id,
  title,
  content,
  author,
  timestamp,
  domainSlug,
  isSaved,
  onSaveToggle,
  showSaveButton = true
}) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
      transition="box-shadow 0.2s, border-color 0.2s"
      _hover={{ boxShadow: 'md', borderColor: 'gray.300' }}
    >
      <Stack spacing={2}>
        <HStack justify="space-between" align="flex-start">
          <Heading size="sm" flex={1}>
            {title}
          </Heading>
          {showSaveButton && domainSlug && id && onSaveToggle && (
            <IconButton
              aria-label={isSaved ? 'Unsave post' : 'Save post'}
              icon={<StarIcon />}
              size="sm"
              variant="ghost"
              colorScheme={isSaved ? 'yellow' : 'gray'}
              onClick={() => onSaveToggle(domainSlug, id)}
            />
          )}
        </HStack>
        <Text fontSize="sm" color="gray.600">
          {content}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {author} · {timestamp}
        </Text>
      </Stack>
    </Box>
  );
};

export default PostCard;

