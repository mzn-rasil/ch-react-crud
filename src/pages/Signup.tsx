import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import FormInput from '../components/form/FormInput';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  name: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  }),
});

export interface ISignupUser {
  username: string;
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
}

const intialSignupValues = {
  username: '',
  email: '',
  password: '',
  name: {
    firstName: '',
    lastName: '',
  },
};

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupUser>({
    defaultValues: intialSignupValues,
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: ISignupUser) => {
    console.log(data);
  };

  return (
    <Flex
      justify='center'
      align='center'
      minHeight='100vh'
      width='full'
      bg='gray.200'
    >
      <Card
        px={20}
        py={20}
        minWidth='600px'
        borderTop='6px solid'
        borderColor='purple.400'
      >
        <VStack as='form' spacing={8} onSubmit={handleSubmit(onSubmit)}>
          <Heading as='h1' color='purple.700' mb={6}>
            Signup
          </Heading>
          <Box
            width='full'
            display='grid'
            gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))'
            gap={8}
          >
            <FormInput
              type='text'
              label='Username'
              placeholder='Enter username'
              {...register('username')}
            />

            <FormInput
              type='email'
              label='E-mail'
              placeholder='Enter e-mail address'
              {...register('email')}
            />

            <FormInput
              type='password'
              label='Password'
              placeholder='Enter password'
              {...register('password')}
            />

            <FormInput
              type='text'
              label='First Name'
              placeholder='Your first name'
              {...register('name.firstName')}
            />

            <FormInput
              type='text'
              label='Last Name'
              placeholder='Your last name'
              {...register('name.lastName')}
            />
          </Box>

          <HStack>
            <Text>Existing User?</Text>
            <Button
              type='button'
              variant='unstyled'
              color='blue.500'
              textDecoration='underline'
              _hover={{ color: 'blue.700' }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </HStack>
          <Button type='submit' colorScheme='purple' width='full'>
            Signup
          </Button>
        </VStack>
      </Card>
    </Flex>
  );
};
export default Signup;
