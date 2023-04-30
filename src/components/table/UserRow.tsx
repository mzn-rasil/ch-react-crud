import React from 'react';

type UserRowProps = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const UserRow: React.FC<UserRowProps> = ({
  id,
  name,
  email,
  address,
  phone,
  onDelete,
  onEdit,
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{phone}</td>
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
