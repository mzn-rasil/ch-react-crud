import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/form/Form';
import UsersTable from './components/table/UsersTable';
import { getAll } from './services/UserServices';

import { IUser } from './components/table/UsersTable';
import SearchAndSort from './components/table/SearchAndSort';

function App() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [editUser, setEditUser] = useState<IUser | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const editHandler = async (id: number) => {
    try {
      const user = users.find((user: IUser) => user.id === id);
      setEditUser(user);
    } catch (error: any) {
      console.error('edit user error', error.message);
    }
  };

  useEffect(() => {
    getAll()
      .then((users) => setUsers(users))
      .catch((err) => console.error('get all users error', err));
  }, []);

  return (
    <>
      <Form setUsers={setUsers} editUser={editUser} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <h1>Users:</h1>
        <SearchAndSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          users={users}
          setUsers={setUsers}
        />
      </div>
      <UsersTable
        users={searchTerm ? filteredUsers : users}
        setUsers={setUsers}
        onEdit={editHandler}
      />
    </>
  );
}

export default App;
