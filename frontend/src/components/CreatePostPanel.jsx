import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const CreatePostPanel = ({ domainSlug, onSuccess }) => {
  const { addUserPost } = useAuth();
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t || !c) {
      toast({ title: 'Title and content required', status: 'warning', duration: 3000 });
      return;
    }
    setSubmitting(true);
    const post = addUserPost(domainSlug, { title: t, content: c });
    setSubmitting(false);
    if (post) {
      setTitle('');
      setContent('');
      toast({ title: 'Post published', status: 'success', duration: 3000 });
      onSuccess?.();
    } else {
      toast({ title: 'Could not create post', status: 'error', duration: 3000 });
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      boxShadow="sm"
    >
      <Box bg="gray.50" px={6} py={4} borderBottomWidth="1px" borderColor="gray.100">
        <Heading size="md">Create a post</Heading>
        <Text fontSize="sm" color="gray.600" mt={1}>
          Share a question, resource, or idea with your community.
        </Text>
      </Box>
      <Box as="form" onSubmit={handleSubmit} p={6}>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel fontWeight="medium">Title</FormLabel>
            <Input
              placeholder="What's your post about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              bg="white"
              borderColor="gray.200"
              _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="medium">Content</FormLabel>
            <Textarea
              placeholder="Add more details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              bg="white"
              borderColor="gray.200"
              resize="vertical"
              _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="brand"
            size="md"
            isLoading={submitting}
            loadingText="Publishing..."
          >
            Publish
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePostPanel;
