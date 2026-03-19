import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '../../src/context/AuthContext.jsx';
import DomainSelector from '../../src/components/DomainSelector.jsx';

const AuthPage = () => {
  const { domains, signIn, signUpWithDomain } = useAuth();
  const toast = useToast();

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    existingDomainSlug: '',
    newDomainName: ''
  });

  const [signInData, setSignInData] = useState({
    email: '',
    domainSlug: ''
  });

  const handleSignUpChange = (field) => (e) => {
    setSignUpData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignInChange = (field) => (e) => {
    setSignInData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const result = signUpWithDomain(signUpData);
    if (!result) {
      toast({
        title: 'Unable to sign up',
        description: 'Please select or create a valid domain.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    const result = signIn(signInData);
    if (!result) {
      toast({
        title: 'Unable to sign in',
        description: 'Please select a valid domain.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box
      maxW="480px"
      mx="auto"
      bg="white"
      borderRadius="2xl"
      p={{ base: 6, md: 8 }}
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Stack spacing={2} mb={6} textAlign="left">
        <Heading size="lg">Welcome</Heading>
        <Text fontSize="sm" color="gray.600">
          Join or create a domain-focused community to start meaningful
          conversations.
        </Text>
      </Stack>

      <Tabs variant="soft-rounded" colorScheme="brand" isFitted>
        <TabList mb={4}>
          <Tab>Sign up</Tab>
          <Tab>Sign in</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <form onSubmit={handleSubmitSignUp}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Your name"
                    value={signUpData.name}
                    onChange={handleSignUpChange('name')}
                    bg="white"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={signUpData.email}
                    onChange={handleSignUpChange('email')}
                    bg="white"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    value={signUpData.password}
                    onChange={handleSignUpChange('password')}
                    bg="white"
                  />
                </FormControl>

                <DomainSelector
                  domains={domains}
                  mode="signup"
                  value={signUpData.existingDomainSlug}
                  onChangeExisting={(slug) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      existingDomainSlug: slug,
                      newDomainName: ''
                    }))
                  }
                  newDomainName={signUpData.newDomainName}
                  onChangeNew={(name) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      newDomainName: name,
                      existingDomainSlug: ''
                    }))
                  }
                />

                <Button type="submit" colorScheme="brand" mt={2}>
                  Create account
                </Button>
              </Stack>
            </form>
          </TabPanel>

          <TabPanel px={0}>
            <form onSubmit={handleSubmitSignIn}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={signInData.email}
                    onChange={handleSignInChange('email')}
                    bg="white"
                  />
                </FormControl>

                <DomainSelector
                  domains={domains}
                  mode="signin"
                  value={signInData.domainSlug}
                  onChangeExisting={(slug) =>
                    setSignInData((prev) => ({ ...prev, domainSlug: slug }))
                  }
                />

                <Button type="submit" colorScheme="brand" mt={2}>
                  Sign in
                </Button>
              </Stack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AuthPage;

