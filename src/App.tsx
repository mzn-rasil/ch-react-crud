import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './components/Form';
import UsersTable from './components/UsersTable';

import { IUser } from './components/UsersTable';

function App() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [editUser, setEditUser] = useState<IUser | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  console.log('app', users);

  const getUsers = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    } catch (error: any) {
      console.error('fetch users error', error.message);
    }
  };

  const editHandler = async (id: number) => {
    try {
      const user = users.find((user: IUser) => user.id === id);
      setEditUser(user);
    } catch (error: any) {
      console.error('edit user error', error.message);
    }
  };

  const sortAscending = () => {};

  const sortDescending = () => {};

  useEffect(() => {
    getUsers();
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
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <input
            type='text'
            name='search'
            placeholder='Search user by name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <button className='btn' onClick={sortAscending}>
            Sort (A - Z)
          </button>
          <button className='btn' onClick={sortDescending}>
            Sort (Z - A)
          </button>
        </div>
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
