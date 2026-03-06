import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
  VStack,
  Avatar,
  Textarea
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import PostCard from './PostCard';

const ProfilePanel = ({ domainSlug, domainPosts = [] }) => {
  const { user, domains, updateUser, changeDomain, changePassword, userPosts, currentUserAbout, setUserAbout } = useAuth();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutDraft, setAboutDraft] = useState(currentUserAbout || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDomainSlug, setSelectedDomainSlug] = useState(user?.domainSlug || '');
  const toast = useToast();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: 'Passwords do not match', status: 'error', duration: 3000 });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: 'Password must be at least 8 characters', status: 'error', duration: 3000 });
      return;
    }
    await changePassword(currentPassword, newPassword);
    toast({ title: 'Password updated (demo)', status: 'success', duration: 3000 });
    setPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangeDomain = () => {
    if (!selectedDomainSlug) {
      toast({ title: 'Please select a domain', status: 'error', duration: 3000 });
      return;
    }
    changeDomain(selectedDomainSlug);
    toast({ title: 'Domain updated', status: 'success', duration: 3000 });
    setDomainModalOpen(false);
  };

  const openAboutModal = () => {
    setAboutDraft(currentUserAbout || '');
    setAboutModalOpen(true);
  };
  const saveAbout = () => {
    setUserAbout(aboutDraft.trim());
    setAboutModalOpen(false);
    toast({ title: 'About updated', status: 'success', duration: 2000 });
  };

  const myPostsFromFeed = (domainPosts || []).filter(
    (p) => p.authorEmail && user?.email && p.authorEmail.toLowerCase() === user.email.toLowerCase()
  );
  const myPostsFromContext = (userPosts || []).filter((p) => p.domainSlug === domainSlug);
  const seenIds = new Set(myPostsFromContext.map((p) => p.id));
  const feedOnly = myPostsFromFeed.filter((p) => !seenIds.has(p.id));
  const myPosts = [...myPostsFromContext, ...feedOnly];

  return (
    <Box>
      <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.200"
        overflow="hidden"
        boxShadow="sm"
      >
        <Box
          h="140px"
          bgGradient="linear(to-br, brand.400, brand.600)"
          borderBottomWidth="1px"
          borderColor="gray.100"
        />
        <Box px={6} pb={6} mt={-12} position="relative">
          <Avatar
            size="xl"
            name={user?.name}
            bg="brand.500"
            color="white"
            borderWidth="4px"
            borderColor="white"
            boxShadow="md"
          />
          <Heading size="lg" mt={4} fontWeight="semibold">
            {user?.name}
          </Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            {user?.email}
          </Text>
          <Text color="gray.500" fontSize="sm" mt={0.5}>
            {user?.domainName}
          </Text>
          {currentUserAbout ? (
            <Box mt={4}>
              <Text fontSize="sm" color="gray.700" lineHeight="tall" whiteSpace="pre-wrap">
                {currentUserAbout}
              </Text>
              <Button size="xs" variant="ghost" colorScheme="brand" mt={2} onClick={openAboutModal}>
                Edit about
              </Button>
            </Box>
          ) : (
            <Button size="sm" variant="outline" colorScheme="brand" mt={4} onClick={openAboutModal}>
              Add about
            </Button>
          )}
        </Box>
      </Box>

      <Box mt={6} bg="white" borderRadius="xl" p={5} borderWidth="1px" borderColor="gray.200" boxShadow="sm">
        <Heading size="sm" mb={3} color="gray.800">
          Settings
        </Heading>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
          <Button size="sm" variant="outline" colorScheme="brand" onClick={() => setPasswordModalOpen(true)}>
            Change password
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="brand"
            onClick={() => {
              setSelectedDomainSlug(user?.domainSlug || '');
              setDomainModalOpen(true);
            }}
          >
            Change domain
          </Button>
        </Stack>
      </Box>

      <Box mt={6}>
        <Heading size="sm" mb={3} color="gray.800">
          My posts
        </Heading>
          {myPosts.length === 0 ? (
            <Box
              bg="white"
              borderRadius="lg"
              p={6}
              borderWidth="1px"
              borderColor="gray.200"
              borderStyle="dashed"
            >
              <Text fontSize="sm" color="gray.600">
                You haven&apos;t posted in this community yet. Your posts will appear here.
              </Text>
            </Box>
          ) : (
            <Stack spacing={4}>
              {myPosts.map((post) => (
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

      <Modal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Current password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </FormControl>
              <FormControl>
                <FormLabel>New password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm new password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleChangePassword}>
              Update password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>About you</FormLabel>
              <Textarea
                value={aboutDraft}
                onChange={(e) => setAboutDraft(e.target.value)}
                placeholder="A short bio or headline for your profile..."
                rows={4}
                bg="white"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setAboutModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={saveAbout}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={domainModalOpen} onClose={() => setDomainModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change domain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Select your new domain community</FormLabel>
              <Select
                placeholder="Choose a domain"
                value={selectedDomainSlug}
                onChange={(e) => setSelectedDomainSlug(e.target.value)}
                bg="white"
              >
                {domains.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </Select>
              <Text fontSize="xs" color="gray.500" mt={2}>
                You will be moved to the selected community. Your saved posts are per domain.
              </Text>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setDomainModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleChangeDomain}>
              Change domain
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePanel;
