import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  RadioGroup,
  Radio,
  Stack,
  FormHelperText
} from '@chakra-ui/react';

const DomainSelector = ({
  domains,
  mode = 'signup',
  value,
  onChangeExisting,
  newDomainName,
  onChangeNew
}) => {
  const [selectionMode, setSelectionMode] = useState('existing');

  const handleModeChange = (nextValue) => {
    setSelectionMode(nextValue);
  };

  return (
    <Box>
      <FormLabel fontSize="sm" mb={2}>
        Domain community
      </FormLabel>
      <RadioGroup
        onChange={handleModeChange}
        value={selectionMode}
        mb={3}
        size="sm"
      >
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Radio value="existing">Select existing</Radio>
          {mode === 'signup' && <Radio value="new">Create new</Radio>}
        </Stack>
      </RadioGroup>

      {selectionMode === 'existing' && (
        <FormControl isRequired mb={mode === 'signup' ? 3 : 0}>
          <Select
            placeholder="Choose a domain"
            value={value || ''}
            onChange={(e) => onChangeExisting?.(e.target.value)}
            bg="white"
          >
            {domains.map((domain) => (
              <option key={domain.slug} value={domain.slug}>
                {domain.name}
              </option>
            ))}
          </Select>
          <FormHelperText fontSize="xs">
            Join an existing professional community.
          </FormHelperText>
        </FormControl>
      )}

      {selectionMode === 'new' && mode === 'signup' && (
        <FormControl isRequired>
          <Input
            placeholder="Enter new domain name"
            value={newDomainName}
            onChange={(e) => onChangeNew?.(e.target.value)}
            bg="white"
          />
          <FormHelperText fontSize="xs">
            Example: Quantum Computing, Robotics, SRE Platform Engineering.
          </FormHelperText>
        </FormControl>
      )}
    </Box>
  );
};

export default DomainSelector;

