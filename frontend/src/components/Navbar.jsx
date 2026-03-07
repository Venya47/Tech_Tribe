import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Text,
  useDisclosure,
  Stack
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.100" px={{ base: 4, md: 8 }}>
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1120px" mx="auto">
        <HStack spacing={2} alignItems="center">
          <Box
            w={8}
            h={8}
            bg="brand.500"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box w={3} h={3} bg="white" borderRadius="sm" />
          </Box>
          <Text
            as={RouterLink}
            to="/"
            fontWeight="semibold"
            letterSpacing="tight"
            fontSize="lg"
          >
            Domain Connect
          </Text>
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
        />

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }} alignItems="center">
          {!user && !isAuthPage && (
            <Button
              as={RouterLink}
              to="/auth"
              size="sm"
              variant="outline"
              colorScheme="brand"
            >
              Sign in
            </Button>
          )}
          {user && (
            <>
              <Text fontSize="sm" color="gray.600">
                {user.name} · {user.domainName}
              </Text>
              <Button size="sm" variant="ghost" onClick={signOut}>
                Sign out
              </Button>
            </>
          )}
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack spacing={4}>
            {!user && !isAuthPage && (
              <Button
                as={RouterLink}
                to="/auth"
                size="sm"
                variant="outline"
                colorScheme="brand"
                onClick={onClose}
              >
                Sign in
              </Button>
            )}
            {user && (
              <>
                <Text fontSize="sm" color="gray.600">
                  {user.name} · {user.domainName}
                </Text>
                <Button size="sm" variant="ghost" onClick={signOut}>
                  Sign out
                </Button>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

