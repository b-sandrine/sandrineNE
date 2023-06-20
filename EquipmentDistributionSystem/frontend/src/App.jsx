import { Route, Routes } from 'react-router'
import './App.css'
import Welcome from './pages/Welcome/Welcome'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import PrivatePage from './auth/PrivatePage'
import Dashboard from './pages/Dashboard/Dashboard'
import Employees from './components/Employees/Employees'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/*' element={<PrivatePage children={<Dashboard />} />} >
        <Route path='employees' element={<Employees />} />
      </Route>
    </Routes>
  )
}

export default App
