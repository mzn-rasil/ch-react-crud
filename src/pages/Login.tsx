import {
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FormInput from '../components/form/FormInput';
import { useAuth } from '../hooks/useAuth';
import { postLoginUser } from '../services/AuthServices';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export interface ILoginUser {
  username: string;
  password: string;
}

const initialLoginValues = {
  username: '',
  password: '',
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: initialLoginValues,
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: ILoginUser) => {
    setIsLoading(true);
    postLoginUser(data)
      .then(({ token }) => {
        handleLogin(token);
      })
      .catch(() => {
        setError('root', { message: 'Invalid username or password' });
      });
  };

  if (authUser?.token) {
    return <Navigate to='/users' replace />;
  }

  return (
    <Flex
      justify='center'
      align='center'
      minHeight='100vh'
      width='full'
      bg='gray.200'
    >
      <Card
        px={24}
        py={20}
        minWidth='500px'
        borderTop='6px solid'
        borderColor='purple.400'
      >
        <VStack as='form' spacing={8} onSubmit={handleSubmit(onSubmit)}>
          <Heading as='h1' color='purple.700' mb={4}>
            Login
          </Heading>
          {<Text color='red.500'>{errors?.root?.message}</Text>}
          <FormInput
            type='text'
            label='Username'
            placeholder='Enter username'
            {...register('username')}
          />

          <FormInput
            type='password'
            label='Password'
            placeholder='Enter password'
            {...register('password')}
          />

          <HStack>
            <Text>New user?</Text>
            <Button
              type='button'
              variant='unstyled'
              color='blue.500'
              textDecoration='underline'
              _hover={{ color: 'blue.700' }}
              onClick={() => navigate('/signup')}
            >
              Signup Now
            </Button>
          </HStack>
          <Button
            isLoading={isLoading}
            loadingText='Logging in...    '
            type='submit'
            colorScheme='purple'
            width='full'
          >
            Login
          </Button>
        </VStack>
      </Card>
    </Flex>
  );
};
export default Login;
