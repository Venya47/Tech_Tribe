import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext.jsx';
import DomainCard from '../../src/components/DomainCard.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { domains, user, joinExistingDomain } = useAuth();

  const handleJoin = (slug) => {
    if (!user) {
      navigate('/auth');
    } else {
      joinExistingDomain(slug, user);
    }
  };

  return (
    <Stack spacing={{ base: 10, md: 16 }}>
      {/* Hero */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        gap={{ base: 8, md: 10 }}
      >
        <Stack spacing={5} maxW="560px">
          <Heading
            as="h1"
            size="2xl"
            lineHeight="1.1"
            letterSpacing="tight"
          >
            Find your domain.
            <br />
            Connect with your community.
          </Heading>
          <Text fontSize="md" color="gray.600">
            A focused networking space where you connect only with professionals
            from your specific domain – from full stack development to data
            science, DevOps, and beyond.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
            <Button
              size="md"
              colorScheme="brand"
              onClick={() => navigate('/auth')}
            >
              {user ? 'Go to my community' : 'Sign in / Sign up'}
            </Button>
            <Button
              size="md"
              variant="ghost"
              onClick={() =>
                document
                  .getElementById('domain-preview')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore domains
            </Button>
          </Stack>
        </Stack>

        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
          minW={{ base: '100%', md: '340px' }}
        >
          <Stack spacing={4}>
            <Text fontSize="sm" color="gray.500" textTransform="uppercase">
              Why domains
            </Text>
            <Heading size="sm">Meaningful connections, not endless feeds.</Heading>
            <Text fontSize="sm" color="gray.600">
              Every conversation, post, and connection is anchored in a shared
              professional context. Less noise, more signal.
            </Text>
          </Stack>
        </Box>
      </Flex>

      {/* Domain preview */}
      <Stack spacing={4} id="domain-preview">
        <Stack direction="row" justify="space-between" align="baseline">
          <Heading size="md">Popular domains</Heading>
          <Text fontSize="sm" color="gray.500">
            Choose a domain now, expand later.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {domains.slice(0, 6).map((domain) => (
            <DomainCard
              key={domain.slug}
              name={domain.name}
              memberCount={domain.memberCount}
              onJoin={() => handleJoin(domain.slug)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default HomePage;

