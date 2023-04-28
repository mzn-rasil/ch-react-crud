import React, { SetStateAction, Dispatch } from 'react';
import axios from 'axios';

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  phone: string;
}

type UsersTableProps = {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  onEdit: (id: number) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers, onEdit }) => {
  console.log('table', users);
  const deleteHandler = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
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
          <td className='table-heading'>UID</td>
          <td className='table-heading'>Name</td>
          <td className='table-heading'>Email</td>
          <td className='table-heading'>Address</td>
          <td className='table-heading'>Phone</td>
          <td className='table-heading'>Delete</td>
          <td className='table-heading'>Edit</td>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user: IUser) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
              <td>
                <button className='btn' onClick={() => deleteHandler(user.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className='btn' onClick={() => onEdit(user.id)}>
                  Edit
                </button>
              </td>
            </tr>
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
