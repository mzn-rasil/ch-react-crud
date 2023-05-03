import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { IUser } from '../table/UsersTable';
import { getAll } from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';

type IResponseUser = Omit<IUser, 'address'> & {
  address: {
    city: string;
  };
};

interface IUserContext {
  searchTerm: string;
  users: IUser[];
  filteredUsers: IUser[];
  editUser: IUser;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setEditUser: Dispatch<SetStateAction<IUser>>;
  editHandler: (id: number) => void;
  isLoading: boolean;
}

export const defaultUser = {
  id: 0,
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

export const UsersContext = createContext<IUserContext>({
  searchTerm: '',
  users: [],
  filteredUsers: [],
  editUser: defaultUser,
  setUsers: () => {},
  setSearchTerm: () => {},
  editHandler: () => {},
  isLoading: false,
  setEditUser: () => {},
});

const UsersContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editUser, setEditUser] = useState<IUser>(defaultUser);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editHandler = async (id: number) => {
    try {
      const user = users.find((user: IUser) => user.id === id) ?? defaultUser;
      setEditUser(user);
      navigate('/newUser');
    } catch (error: any) {
      console.error('edit user error', error.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAll()
      .then((users: IResponseUser[]) => {
        const updatedUsers = users.map((user: IResponseUser) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          address: user.address.city,
          phone: user.phone,
          hobbies: [{ id: 1, value: '' }],
        }));
        setIsLoading(false);
        setUsers(updatedUsers);
      })
      .catch((err) => console.error('get all users error', err));
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        filteredUsers,
        searchTerm,
        setSearchTerm,
        editUser,
        setEditUser,
        editHandler,
        isLoading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
