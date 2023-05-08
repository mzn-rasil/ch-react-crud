import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import UserForm from './pages/UserForm';
import UsersContextProvider from './context/usersContext';
import User from './pages/User';
import RequireAuth from './components/auth/RequireAuth';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <UsersContextProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<RequireAuth />}>
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/newUser' element={<UserForm />} />
        </Route>
      </Routes>
    </UsersContextProvider>
  );
}

export default App;
