import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import { getById } from '../services/UserServices';
import { IUser } from '../components/table/UsersTable';
import {
  Box,
  Center,
  HStack,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getByUserId } from '../services/PostServices';

interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface IUserWithPosts extends IUser {
  posts: IPost[];
}

const User: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  console.log(user);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getById(Number(id))
        .then((user) => setUser(user))
        .catch((error) => setError(error));

      getByUserId(Number(id))
        .then((posts) => {
          setPosts(posts);
        })
        .catch((error) => setError(error));
    }
  }, [id]);

  return (
    <UserLayout>
      {user ? (
        <Box width='full' border='1px solid' p={24}>
          <HStack
            spacing={4}
            divider={
              <StackDivider borderWidth='2px' borderColor='purple.400' />
            }
          >
            <Center
              border='1px solid'
              borderRadius='full'
              width='40px'
              height='40px'
              bg='purple.400'
              color='white'
              fontWeight='bold'
            >
              {user.username[0]}
            </Center>
            <VStack align='start'>
              <Text fontWeight='bold' fontSize='lg'>
                {user.username}
              </Text>
              <Text fontSize='sm' color='gray.500'>
                {user.email}
              </Text>
            </VStack>
          </HStack>
        </Box>
      ) : (
        <Box>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='purple.400'
            size='xl'
          />
          <Text>Loading...</Text>
        </Box>
      )}
    </UserLayout>
  );
};
export default User;
