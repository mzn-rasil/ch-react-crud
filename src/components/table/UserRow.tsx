import React from 'react';
import { IUser } from './UsersTable';

interface IUserRow extends IUser {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const UserRow: React.FC<IUserRow> = ({
  id,
  name,
  email,
  address,
  phone,
  hobbies,
  onDelete,
  onEdit,
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address.city}</td>
      <td>{phone}</td>
      <td>
        {hobbies ? hobbies.map((hobby) => hobby.value).join(', ') : '---'}
      </td>
      <td>
        <button className='btn' onClick={() => onDelete(id)}>
          Delete
        </button>
      </td>
      <td>
        <button className='btn' onClick={() => onEdit(id)}>
          Edit
        </button>
      </td>
    </tr>
  );
};
export default UserRow;
