import { Divider } from '@chakra-ui/react';
import { useContext } from 'react';
import { UsersContext } from '../components/context/usersContext';
import SearchAndSort from '../components/table/SearchAndSort';
import UsersTable from '../components/table/UsersTable';
import UserLayout from '../layout/UserLayout';

const Users: React.FC = () => {
  const { searchTerm, users, filteredUsers } = useContext(UsersContext);

  return (
    <UserLayout>
      <SearchAndSort />
      <Divider my={6} border='0.5px solid' borderColor='purple.400' />

      <UsersTable users={searchTerm ? filteredUsers : users} />
    </UserLayout>
  );
};

export default Users;
