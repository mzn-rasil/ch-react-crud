import React, { SetStateAction, Dispatch } from 'react';
import { remove } from '../../services/UserServices';
import UserRow from './UserRow';

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  phone: string;
}

const Columns = [
  'UID',
  'Name',
  'Email',
  'Address',
  'Phone',
  'Delete',
  'Edit',
] as const;

type UsersTableProps = {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  onEdit: (id: number) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers, onEdit }) => {
  const deleteHandler = async (id: number) => {
    try {
      remove(id);
      const filteredData = users.filter((user: IUser) => user.id !== id);
      setUsers(filteredData);
      alert(`Deleted user with id: ${id}`);
    } catch (error: any) {
      console.error('delete user error', error.message);
    }
  };

  return (
    <table>
      <thead>
        <tr style={{ fontWeight: 'bold' }}>
          {Columns.map((column, index) => (
            <td key={index} className='table-heading'>
              {column}
            </td>
          ))}
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user: IUser) => (
            <UserRow
              id={user.id}
              name={user.name}
              email={user.email}
              address={user.address.city}
              phone={user.phone}
              onDelete={deleteHandler}
              onEdit={onEdit}
            />
          ))
        ) : (
          <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
            <td>No results found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default UsersTable;
