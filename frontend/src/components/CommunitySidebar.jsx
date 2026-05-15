import React from 'react';
import {
  Box,
  VStack,
  Button,
  Text,
  Divider,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react';
import {
  ChatIcon,
  StarIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
  AtSignIcon,
  SettingsIcon
} from '@chakra-ui/icons';

const navItems = [
  { id: 'feed', label: 'Feed', icon: RepeatIcon },
  { id: 'create-post', label: 'Create post', icon: AddIcon },
  { id: 'saved', label: 'Saved posts', icon: StarIcon },
  { id: 'messages', label: 'Messages', icon: ChatIcon },
  { id: 'friends', label: 'Friends', icon: AtSignIcon }
];

const SIDEBAR_W_COLLAPSED = 72;
// 4/12 = 33.333% of the viewport width (with sensible bounds)
const SIDEBAR_W_EXPANDED_CSS = 'clamp(260px, 33.333vw, 420px)';

const CommunitySidebar = ({ activeSection, onSectionChange, isCollapsed = false, onToggleCollapse }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const showCollapse = !isMobile && typeof onToggleCollapse === 'function';

  const NavItem = ({ id, label, Icon }) => {
    const isActive = activeSection === id;
    const common = {
      onClick: () => onSectionChange(id)
    };

    if (isCollapsed) {
      return (
        <Tooltip label={label} placement="right">
          <IconButton
            aria-label={label}
            icon={<Icon />}
            variant={isActive ? 'solid' : 'ghost'}
            colorScheme={isActive ? 'brand' : 'gray'}
            size="sm"
            mx={2}
            my={1}
            borderRadius="md"
            {...common}
          />
        </Tooltip>
      );
    }

    return (
      <Button
        variant={isActive ? 'solid' : 'ghost'}
        colorScheme="brand"
        size="sm"
        justifyContent="flex-start"
        leftIcon={<Icon />}
        mx={2}
        my={1}
        borderRadius="md"
        _hover={{ bg: isActive ? 'brand.600' : 'blackAlpha.50' }}
        {...common}
      >
        {label}
      </Button>
    );
  };

  if (isMobile) {
    return (
      <Box
        as="nav"
        w="full"
        flexShrink={0}
        bg="white"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
        overflow="hidden"
        boxShadow="sm"
      >
        <VStack align="stretch" spacing={0} py={3}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeSection === id ? 'solid' : 'ghost'}
              colorScheme="brand"
              size="sm"
              justifyContent="flex-start"
              leftIcon={Icon ? <Icon /> : undefined}
              onClick={() => onSectionChange(id)}
              borderRadius="md"
              mx={2}
              _hover={{ bg: activeSection === id ? 'brand.600' : 'blackAlpha.50' }}
            >
              {label}
            </Button>
          ))}
          <Divider my={3} />
          <Box px={3} py={1}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold" mb={2}>
              Account
            </Text>
            <Button
              variant={activeSection === 'profile' ? 'solid' : 'ghost'}
              colorScheme="brand"
              size="sm"
              w="full"
              justifyContent="flex-start"
              onClick={() => onSectionChange('profile')}
              borderRadius="md"
            >
              Profile
            </Button>
          </Box>
        </VStack>
      </Box>
    );
  }

  const sidebarWidth = isCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED_CSS;

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      w={sidebarWidth}
      minW={isCollapsed ? SIDEBAR_W_COLLAPSED : undefined}
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.200"
      zIndex={10}
      overflowY="auto"
      overflowX="hidden"
      boxShadow="sm"
      transition="width 0.2s ease"
    >
      <Flex direction="column" h="100%">
        <Box px={3} pt={3} pb={2}>
          <HStack justify={isCollapsed ? 'center' : 'space-between'} align="center">
            {!isCollapsed ? (
              <HStack spacing={3}>
                <Box
                  w={9}
                  h={9}
                  bg="brand.500"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box w={3} h={3} bg="white" borderRadius="sm" />
                </Box>
                <Text fontWeight="700" letterSpacing="tight">
                  Domain Connect
                </Text>
              </HStack>
            ) : (
              <Box
                w={9}
                h={9}
                bg="brand.500"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box w={3} h={3} bg="white" borderRadius="sm" />
              </Box>
            )}

            {showCollapse && (
              <Tooltip label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
                <IconButton
                  aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={onToggleCollapse}
                />
              </Tooltip>
            )}
          </HStack>
        </Box>

        <Divider />

        <Box py={2}>
          <VStack align="stretch" spacing={0}>
            {navItems.map(({ id, label, icon: Icon }) => (
              <NavItem key={id} id={id} label={label} Icon={Icon} />
            ))}
          </VStack>
        </Box>

        <Box flex={1} />

        <Box pb={3}>
          <Divider mb={2} />
          {!isCollapsed && (
            <Text
              fontSize="xs"
              color="gray.500"
              textTransform="uppercase"
              fontWeight="semibold"
              px={4}
              mb={1}
            >
              Account
            </Text>
          )}
          <Box px={isCollapsed ? 0 : 2}>
            <NavItem id="profile" label="Profile" Icon={SettingsIcon} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CommunitySidebar;
export { SIDEBAR_W_COLLAPSED, SIDEBAR_W_EXPANDED_CSS };
