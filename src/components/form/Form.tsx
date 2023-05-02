import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { IUser } from '../table/UsersTable';
import { create, update } from '../../services/UserServices';
import Input from './Input';
import { toast } from 'react-toastify';

let id = 11; // for assigning new id to users

interface FormProps {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  editUser: IUser | undefined;
}

const Form: React.FC<FormProps> = ({ setUsers, editUser }) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [hobbies, setHobbies] = useState([{ id: 1, value: '' }]);

  const hasValidationError = (user: IUser): boolean => {
    const emailRegex =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

    if (user.name.length < 3 || user.name.length > 25) {
      setUsernameError('Name must be within 3-25 characters');
      return true;
    } else {
      setUsernameError('');
    }

    if (user.email.length === 0) {
      setEmailError('This field cannot be empty');
      return true;
    } else if (!user.email.match(emailRegex)) {
      setEmailError('Must be a valid email');
      return true;
    } else {
      setEmailError('');
    }

    if (user.address.city.length === 0) {
      setAddressError('This field cannot be empty');
      return true;
    } else {
      setAddressError('');
    }

    if (user.phone.length === 0) {
      setPhoneError('This field cannot be empty');
      return true;
    } else {
      setPhoneError('');
    }

    return false;
  };

  const postHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      id,
      name: username,
      email,
      address: { city: address },
      phone,
      hobbies: hobbies,
    };
    console.log(user);

    try {
      if (editUser) {
        update(editUser.id, user);
        setUsers((prev) => {
          let filteredUsers = prev.filter((user) => user.id !== editUser.id);
          return [...filteredUsers, { ...user, id: editUser.id }];
        });
        toast.success('User edited successfully', { autoClose: 1000 });
        setUsername('');
        setEmail('');
        setAddress('');
        setPhone('');
        setHobbies([{ id: 1, value: '' }]);
      } else {
        if (hasValidationError(user)) {
          return;
        }
        create(user).catch((err) => console.error('create user error', err));
        setUsers((prev) => [...prev, user]);
        id++;
        toast.success('User created successfully', { autoClose: 1000 });
        setUsername('');
        setEmail('');
        setAddress('');
        setPhone('');
        setHobbies([{ id: 1, value: '' }]);
      }
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

  const hobbyChangeHandler = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedHobbies = hobbies.map((hobby) => {
      if (hobby.id === id) {
        return { ...hobby, value: e.target.value };
      }
      return hobby;
    });
    setHobbies(updatedHobbies);
  };

  const addHobbyHandler = (id: number) => {
    const newId = Math.max(...hobbies.map((hobby) => hobby.id)) + 1;
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(id, 0, { id: newId, value: '' });
    setHobbies(updatedHobbies);
  };

  const removeHobbyHandler = (id: number) => {
    const filteredHobbies = hobbies.filter((hobby) => hobby.id !== id);
    setHobbies(filteredHobbies);
  };

  useEffect(() => {
    if (editUser) {
      setUsername(editUser.name);
      setEmail(editUser.email);
      setAddress(editUser.address.city);
      setPhone(editUser.phone);
      setHobbies(editUser.hobbies ?? [{ id: 1, value: '' }]);
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
        error={usernameError}
      />
      <Input
        type='email'
        name='email'
        label='Email'
        placeholder='Enter e-mail address'
        value={email}
        onChange={changeHandler}
        error={emailError}
      />
      <Input
        type='text'
        name='address'
        label='Address'
        placeholder='Enter home address'
        value={address}
        onChange={changeHandler}
        error={addressError}
      />
      <Input
        type='tel'
        name='phone'
        label='Enter phone number'
        placeholder='Enter phone number'
        value={phone}
        onChange={changeHandler}
        error={phoneError}
      />

      {hobbies.map((hobby) => (
        <div
          key={hobby.id}
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <Input
            type='text'
            name='hobby'
            label='Hobby'
            placeholder='Enter hobby'
            value={hobby.value}
            onChange={(e) => hobbyChangeHandler(hobby.id, e)}
            error=''
          />
          <button
            type='button'
            className='btn'
            style={{
              height: '30px',
              width: '10px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => addHobbyHandler(hobby.id)}
          >
            +
          </button>
          {hobby.id !== 1 && (
            <button
              type='button'
              className='btn'
              style={{
                height: '30px',
                width: '10px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => removeHobbyHandler(hobby.id)}
            >
              -
            </button>
          )}
        </div>
      ))}

      <button className='btn' type='submit' style={{ width: '200px' }}>
        Submit
      </button>
    </form>
  );
};
export default Form;
