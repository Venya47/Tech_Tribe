import React, { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockPostsByDomain, mockMembersByDomain } from '../data/mockPosts';
import PostCard from '../components/PostCard';
import CommunitySidebar, {
  SIDEBAR_W_COLLAPSED,
  SIDEBAR_W_EXPANDED_CSS
} from '../components/CommunitySidebar';
import ProfilePanel from '../components/ProfilePanel';
import CreatePostPanel from '../components/CreatePostPanel';
import MemberProfilePanel from '../components/MemberProfilePanel';

const CommunityPage = () => {
  const { domainSlug } = useParams();
  const { domains, user, userPosts, toggleSavedPost, isPostSaved, getSavedIdsForDomain } = useAuth();
  const [activeSection, setActiveSection] = useState('feed');
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const domain = domains.find((d) => d.slug === domainSlug);
  const mockPosts = mockPostsByDomain[domainSlug] || [];
  const myPostsForDomain = (userPosts || []).filter((p) => p.domainSlug === domainSlug);
  const allPosts = useMemo(
    () => [...myPostsForDomain, ...mockPosts],
    [myPostsForDomain, mockPosts]
  );
  const savedIds = getSavedIdsForDomain(domainSlug);
  const savedPosts = useMemo(
    () => allPosts.filter((p) => savedIds.includes(p.id)),
    [allPosts, savedIds]
  );
  const members = mockMembersByDomain[domainSlug] || [];
  const selectedMember = selectedMemberId ? members.find((m) => m.id === selectedMemberId) : null;
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const setSection = (section) => {
    setSelectedMemberId(null);
    setActiveSection(section);
  };

  if (!domain) {
    return (
      <Box p={8}>
        <Heading size="md" mb={2}>
          Community not found
        </Heading>
        <Text fontSize="sm" color="gray.600">
          This domain community does not exist yet. Try joining or creating it from the sign up page.
        </Text>
      </Box>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'feed':
        return (
          <Stack spacing={5}>
            <Box>
              <Heading size="md" fontWeight="600">
                Feed
              </Heading>
              <Text fontSize="sm" color="gray.600" mt={1}>
                All posts in {domain.name}
              </Text>
            </Box>
            {allPosts.length === 0 ? (
              <Box
                bg="white"
                borderRadius="xl"
                p={8}
                borderWidth="1px"
                borderColor="gray.200"
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.600">
                  No posts yet. Be the first to ask a question or share a resource.
                </Text>
              </Box>
            ) : (
              <Stack spacing={4}>
                {allPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    timestamp={post.timestamp}
                    domainSlug={domainSlug}
                    isSaved={isPostSaved(domainSlug, post.id)}
                    onSaveToggle={toggleSavedPost}
                    showSaveButton
                  />
                ))}
              </Stack>
            )}
          </Stack>
        );

      case 'create-post':
        return (
          <Stack spacing={5}>
            <CreatePostPanel
              domainSlug={domainSlug}
              onSuccess={() => setSection('feed')}
            />
          </Stack>
        );

      case 'saved':
        return (
          <Stack spacing={5}>
            <Box>
              <Heading size="md" fontWeight="600">
                Saved posts
              </Heading>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Posts you saved from {domain.name}
              </Text>
            </Box>
            {savedPosts.length === 0 ? (
              <Box
                bg="white"
                borderRadius="xl"
                p={8}
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.600">
                  No saved posts. Use the star on any post in Feed to save it here.
                </Text>
              </Box>
            ) : (
              <Stack spacing={4}>
                {savedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    timestamp={post.timestamp}
                    domainSlug={domainSlug}
                    isSaved
                    onSaveToggle={toggleSavedPost}
                    showSaveButton
                  />
                ))}
              </Stack>
            )}
          </Stack>
        );

      case 'messages':
        return (
          <Stack spacing={5}>
            <Box>
              <Heading size="md" fontWeight="600">
                Messages
              </Heading>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Conversations with community members
              </Text>
            </Box>
            <Box
              bg="white"
              borderRadius="xl"
              p={8}
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Text fontSize="sm" color="gray.600">
                Direct messages and group chats will appear here. Coming soon.
              </Text>
            </Box>
          </Stack>
        );

      case 'friends':
        return (
          <Stack spacing={5}>
            <Box>
              <Heading size="md" fontWeight="600">
                Friends
              </Heading>
              <Text fontSize="sm" color="gray.600" mt={1}>
                People in the {domain.name} community. Click a profile to view.
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {members.map((member) => (
                <Box
                  key={member.id}
                  as="button"
                  textAlign="left"
                  bg="white"
                  borderRadius="xl"
                  p={5}
                  borderWidth="1px"
                  borderColor="gray.200"
                  boxShadow="sm"
                  transition="all 0.2s"
                  _hover={{ boxShadow: 'md', borderColor: 'brand.200' }}
                  onClick={() => {
                    setSelectedMemberId(member.id);
                    setActiveSection('profile');
                  }}
                >
                  <Text fontWeight="600" fontSize="md">
                    {member.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {member.role}
                  </Text>
                </Box>
              ))}
              {members.length === 0 && (
                <Box
                  bg="white"
                  borderRadius="xl"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.200"
                  gridColumn="1 / -1"
                >
                  <Text fontSize="sm" color="gray.600">
                    Community member list will grow as more people join.
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Stack>
        );

      case 'profile':
        if (selectedMember) {
          return (
            <MemberProfilePanel
              member={selectedMember}
              domainSlug={domainSlug}
              domainPosts={allPosts}
              onBack={() => {
                setSelectedMemberId(null);
                setActiveSection('friends');
              }}
            />
          );
        }
        return (
          <Box>
            <Heading size="md" mb={4} fontWeight="600">
              Profile &amp; settings
            </Heading>
            <ProfilePanel domainSlug={domainSlug} domainPosts={allPosts} />
          </Box>
        );

      default:
        return null;
    }
  };

  const contentPadding = isDesktop
    ? {
        pl: sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED_CSS,
        pr: 8,
        py: 8
      }
    : { px: 4, py: 6 };

  return (
    <Box minH="100vh" bg="gray.50">
      <CommunitySidebar
        activeSection={activeSection}
        onSectionChange={setSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
      />

      <Box {...contentPadding} transition="padding-left 0.2s ease">
        <Box maxW="800px" mx={isDesktop ? 0 : 'auto'}>
          <Box mb={6}>
            <Text fontSize="xs" textTransform="uppercase" color="gray.500" fontWeight="600" letterSpacing="wider">
              Community
            </Text>
            <Heading size="lg" mt={1} fontWeight="700">
              {domain.name}
            </Heading>
            <Text fontSize="sm" color="gray.600" mt={1}>
              {domain.memberCount.toLocaleString()} members
            </Text>
          </Box>

          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default CommunityPage;
