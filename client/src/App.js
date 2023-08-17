import './App.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import AccountCreated from './components/AccountCreated'
import Home from './components/Home'
import Users from './components/Users'
import EditUsers from './components/EditUsers'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='account-created' element={<AccountCreated />} />
        <Route path='users' element={<Users />} />
        <Route path='editusers' element={<EditUsers />} />
      </Routes>


    </>
  );
}

export default App;
