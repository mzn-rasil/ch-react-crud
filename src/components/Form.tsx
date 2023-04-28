import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import axios from 'axios';
import { IUser } from './UsersTable';

let id = 11; // for assigning new id to users

interface FormProps {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  editUser: IUser | undefined;
}

const Form: React.FC<FormProps> = ({ setUsers, editUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const postHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = {
        id,
        name: username,
        email,
        address: { city: address },
        phone,
      };
      if (editUser) {
        await axios.patch(
          `https://jsonplaceholder.typicode.com/users/${editUser.id}`,
          formData
        );
        setUsers((prev) => {
          let filteredUsers = prev.filter((user) => user.id !== editUser.id);
          return [...filteredUsers, formData];
        });
      } else {
        await axios.post(
          'https://jsonplaceholder.typicode.com/users',
          formData
        );
        setUsers((prev) => [...prev, formData]);
        id++;
      }
      setUsername('');
      setEmail('');
      setAddress('');
      setPhone('');
    } catch (error: any) {
      console.error('post user error', error.message);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (editUser) {
      setUsername(editUser.name);
      setEmail(editUser.email);
      setAddress(editUser.address.city);
      setPhone(editUser.phone);
    }
  }, [editUser]);

  return (
    <form className='form-wrapper' onSubmit={postHandler}>
      <div className='form-field'>
        <label htmlFor='username'>Name</label>
        <br />
        <input
          type='text'
          name='username'
          placeholder='Enter Name'
          value={username}
          onChange={changeHandler}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='email'>Email</label>
        <br />
        <input
          type='email'
          name='email'
          placeholder='Enter e-mail address'
          value={email}
          onChange={changeHandler}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='address'>Address</label>
        <br />
        <input
          type='text'
          name='address'
          placeholder='Enter home address'
          value={address}
          onChange={changeHandler}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='phone'>Phone</label>
        <br />
        <input
          type='tel'
          name='phone'
          placeholder='Enter phone number'
          value={phone}
          onChange={changeHandler}
        />
      </div>
      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  );
};
export default Form;
