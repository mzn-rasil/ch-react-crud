import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAuthUser {
  token: string;
}

interface IAuthUserValue {
  authUser: IAuthUser | null;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<IAuthUserValue>({
  authUser: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<IAuthUser | null>(() => {
    try {
      const token = Cookies.get('token');
      if (token) {
        return { token };
      } else {
        Cookies.set('token', JSON.stringify(null));
        return null;
      }
    } catch (err) {
      return null;
    }
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/users';

  const handleLogin = (token: string) => {
    Cookies.set('token', token, { expires: 1 });
    setAuthUser({ token });
    navigate(from, { replace: true });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setAuthUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
