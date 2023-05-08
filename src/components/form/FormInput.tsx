import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';
import React from 'react';

type FormInputProps = {
  type: string;
  label?: string;
  placeholder?: string;
  error?: string;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, label, placeholder, error, ...rest }, ref) => {
    return (
      <FormControl isRequired isInvalid={!!error}>
        <HStack spacing={2}>
          <FormLabel mb={0}>{label}</FormLabel>
          <FormErrorMessage>{error}</FormErrorMessage>
        </HStack>
        <Input
          _active={{ borderColor: 'purple.500' }}
          _focus={{ borderColor: 'purple.500' }}
          pl={type === 'tel' ? '90px' : ''}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </FormControl>
    );
  }
);

export default FormInput;
