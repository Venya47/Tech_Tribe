import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Avatar,
  useBreakpointValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import PostCard from './PostCard';

const MemberProfilePanel = ({ member, domainSlug, domainPosts, onBack }) => {
  const posts = (domainPosts || []).filter((p) => p.authorId === member.id);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Button
        size="sm"
        variant="ghost"
        leftIcon={<ArrowBackIcon />}
        onClick={onBack}
        mb={4}
        colorScheme="gray"
      >
        Back to Friends
      </Button>

      <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.200"
        overflow="hidden"
        boxShadow="sm"
      >
        <Box
          h="120px"
          bgGradient="linear(to-br, brand.400, brand.600)"
          borderBottomWidth="1px"
          borderColor="gray.100"
        />
        <Box px={6} pb={6} mt={-10} position="relative">
          <Avatar
            size="xl"
            name={member.name}
            bg="brand.500"
            color="white"
            borderWidth="4px"
            borderColor="white"
            boxShadow="md"
          />
          <Heading size="lg" mt={4} fontWeight="semibold">
            {member.name}
          </Heading>
          <Text color="gray.600" fontSize="md" fontWeight="medium" mt={1}>
            {member.role}
          </Text>
          {member.about && (
            <Text fontSize="sm" color="gray.600" mt={3} lineHeight="tall">
              {member.about}
            </Text>
          )}
        </Box>
      </Box>

      <Heading size="sm" mt={8} mb={3} color="gray.700">
        Posts by {member.name}
      </Heading>
      {posts.length === 0 ? (
        <Box
          bg="white"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Text fontSize="sm" color="gray.600">
            No posts yet.
          </Text>
        </Box>
      ) : (
        <Stack spacing={4}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              timestamp={post.timestamp}
              showSaveButton={false}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MemberProfilePanel;
