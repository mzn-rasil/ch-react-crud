import { Button, Flex, HStack, Icon, Input, Spacer } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { RepeatIcon } from '@chakra-ui/icons';
import { UsersContext } from '../context/usersContext';

enum Order {
  'asc' = 'asc',
  'desc' = 'desc',
}

const SearchAndSort: React.FC = () => {
  const { searchTerm, setSearchTerm, users, setUsers } =
    useContext(UsersContext);
  const sortUsers = (order: Order.asc | Order.desc) => {
    const usersCopy = [...users];
    usersCopy.sort((user1, user2) => {
      if (order === 'asc') return user1.username.localeCompare(user2.username);
      if (order === 'desc')
        return -user1.username.localeCompare(user2.username);
      return 0;
    });
    setUsers(usersCopy);
  };

  const resetUsers = () => {
    const usersCopy = [...users];
    usersCopy.sort((user1, user2) => user1.id - user2.id);
    setUsers(usersCopy);
  };

  return (
    <Flex justify='space-between' align='center' width='100%'>
      <Input
        type='text'
        name='search'
        placeholder='Search user by name'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        maxWidth='400px'
        _focus={{ borderColor: 'purple.400' }}
      />
      <Spacer />
      <HStack spacing={12}>
        <Button variant='ghost' colorScheme='purple' onClick={resetUsers}>
          <Icon as={RepeatIcon} />
        </Button>
        <Button colorScheme='purple' onClick={() => sortUsers(Order.asc)}>
          Sort (A - Z)
        </Button>
        <Button colorScheme='purple' onClick={() => sortUsers(Order.desc)}>
          Sort (Z - A)
        </Button>
      </HStack>
    </Flex>
  );
};
export default SearchAndSort;
