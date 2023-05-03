import { Box, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UsersContext, defaultUser } from '../../context/usersContext';
import FormInput from './FormInput';
import HobbiesFormInput from './HobbiesFormInput';
import { IUser } from '../table/UsersTable';
import { create, update } from '../../services/UserServices';

let id = 11; // for assigning new id to users

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Must be more than 3 characters')
    .max(25, 'Must be less than 25 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  address: yup.string().required('Address is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^$/, 'Match format 984-xxxxxxx'),
});

const initialValues = {
  username: '',
  email: '',
  address: '',
  phone: '',
  hobbies: [
    {
      id: 1,
      value: '',
    },
  ],
};

const Form: React.FC = () => {
  const { setUsers, editUser, setEditUser } = useContext(UsersContext);
  const editUserExists = Object.values(editUser).every((prop) => !!prop);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: editUserExists ? editUser : initialValues,
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const {
    fields: hobbies,
    append: onAddHobby,
    remove: onRemoveHobby,
  } = useFieldArray({
    control,
    name: 'hobbies',
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUser> = (formdata) => {
    const user = { ...formdata, id };
    console.log(user);
    try {
      const isEdit = Object.values(editUser).every((item) => !!item);
      if (isEdit) {
        update(editUser.id, user);
        setUsers((prev) => {
          let filteredUsers = prev.filter((user) => user.id !== editUser.id);
          return [...filteredUsers, { ...user, id: editUser.id }];
        });
        setEditUser(defaultUser);
        navigate('/users');
        toast.success('User edited successfully', { autoClose: 1000 });
      } else {
        create(user).catch((err) => console.error('create user error', err));
        setUsers((prev) => [...prev, user]);
        id++;
        navigate('/users');
        toast.success('User created successfully', { autoClose: 1000 });
      }
    } catch (error: any) {
      console.error('post user error', error.message);
    }
  };

  return (
    <Box
      as='form'
      borderTop='8px solid'
      borderColor='purple.500'
      boxShadow='2xl'
      borderRadius='lg'
      width='full'
      p={24}
      display='grid'
      gridTemplateColumns='repeat(auto-fit, minmax(350px, 1fr))'
      gap={8}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        type='text'
        label='Name'
        placeholder='Enter name'
        error={errors?.username?.message}
        {...register('username')}
      />
      <FormInput
        type='email'
        label='Email'
        placeholder='Enter e-mail address'
        error={errors?.email?.message}
        {...register('email')}
      />
      <FormInput
        type='text'
        label='Address'
        placeholder='Enter home address'
        error={errors?.address?.message}
        {...register('address')}
      />
      <FormInput
        type='tel'
        label='Enter phone number'
        placeholder='Enter phone number'
        error={errors?.phone?.message}
        {...register('phone')}
      />

      {hobbies.map((hobby, index) => (
        <HobbiesFormInput
          key={hobby.id}
          hobby={hobby}
          index={index}
          onAddHobby={onAddHobby}
          onRemoveHobby={onRemoveHobby}
          {...register(`hobbies.${index}.value`)}
        />
      ))}

      <Button type='submit' h='50px' alignSelf='end' colorScheme='purple'>
        Submit
      </Button>
    </Box>
  );
};
export default Form;
