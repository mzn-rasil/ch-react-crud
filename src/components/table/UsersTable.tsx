import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import UserRow from './UserRow';
import { UsersContext } from '../../context/usersContext';

export interface IUser {
  id: number;
  username: string;
  email: string;
  address: string;
  phone: string;
  hobbies: {
    id: number;
    value: string;
  }[];
  geoLocation: string;
}

const Columns = [
  'UID',
  'Name',
  'Email',
  'Address',
  'Phone',
  'Hobbies',
  'Geolocation',
  'CTA',
  'View',
] as const;

type UsersTableProps = {
  users: IUser[];
};

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const { isLoading } = useContext(UsersContext);

  return (
    <Table
      variant='striped'
      colorScheme='purple'
      size='sm'
      minWidth='800px'
      overflow='auto'
    >
      <Thead>
        <Tr>
          {Columns.map((column, index) => (
            <Th
              key={index}
              textAlign='center'
              color='purple.800'
              fontWeight='bold'
              fontSize='md'
              py={4}
            >
              {column}
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {users.length > 0 ? (
          users.map((user: IUser) => (
            <UserRow
              key={user.id}
              users={users}
              id={user.id}
              username={user.username}
              email={user.email}
              address={user.address}
              phone={user.phone}
              hobbies={user.hobbies}
              geoLocation={user.geoLocation}
            />
          ))
        ) : isLoading ? (
          <Tr>
            <Td colSpan={Columns.length} textAlign='center' height='400px'>
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
            </Td>
          </Tr>
        ) : (
          <Tr>
            <Td
              colSpan={Columns.length}
              textAlign='center'
              fontSize='lg'
              fontWeight='semibold'
            >
              No results found.
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};
export default UsersTable;
