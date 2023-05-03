import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import UserForm from './pages/UserForm';
import UsersContextProvider from './context/usersContext';

function App() {
  return (
    <UsersContextProvider>
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/newUser' element={<UserForm />} />
      </Routes>
    </UsersContextProvider>
  );
}

export default App;
