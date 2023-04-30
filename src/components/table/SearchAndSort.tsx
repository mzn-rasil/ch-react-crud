import React, { Dispatch, SetStateAction } from 'react';
import { IUser } from './UsersTable';

type SearchAndSortProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
};

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchTerm,
  setSearchTerm,
  users,
  setUsers,
}) => {
  const sortUsers = (order: 'asc' | 'desc') => {
    const usersCopy = [...users];
    usersCopy.sort((user1, user2) => {
      if (order === 'asc') return user1.name.localeCompare(user2.name);
      if (order === 'desc') return -user1.name.localeCompare(user2.name);
      return 0;
    });
    setUsers(usersCopy);
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <input
        type='text'
        name='search'
        placeholder='Search user by name'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='btn' onClick={() => sortUsers('asc')}>
        Sort (A - Z)
      </button>
      <button className='btn' onClick={() => sortUsers('desc')}>
        Sort (Z - A)
      </button>
    </div>
  );
};
export default SearchAndSort;
