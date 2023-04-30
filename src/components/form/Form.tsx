import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { IUser } from '../table/UsersTable';
import { create, update } from '../../services/UserServices';
import Input from './Input';

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
    const user = {
      id,
      name: username,
      email,
      address: { city: address },
      phone,
    };

    try {
      if (editUser) {
        update(editUser.id, user);
        setUsers((prev) => {
          let filteredUsers = prev.filter((user) => user.id !== editUser.id);
          return [...filteredUsers, user];
        });
      } else {
        create(user).catch((err) => console.error('create user error', err));
        setUsers((prev) => [...prev, user]);
        id++;
      }
    } catch (error: any) {
      console.error('post user error', error.message);
    } finally {
      setUsername('');
      setEmail('');
      setAddress('');
      setPhone('');
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
      <Input
        type='text'
        name='username'
        label='Name'
        placeholder='Enter name'
        value={username}
        onChange={changeHandler}
      />
      <Input
        type='email'
        name='email'
        label='Email'
        placeholder='Enter e-mail address'
        value={email}
        onChange={changeHandler}
      />
      <Input
        type='text'
        name='address'
        label='Address'
        placeholder='Enter home address'
        value={address}
        onChange={changeHandler}
      />
      <Input
        type='tel'
        name='phone'
        label='Enter phone number'
        placeholder='Enter phone number'
        value={phone}
        onChange={changeHandler}
      />
      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  );
};
export default Form;
