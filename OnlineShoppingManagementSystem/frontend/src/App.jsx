
import './App.css'
import Welcome from './pages/Welcome/Welcome';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Products from './components/Products/Products';
import Dashboard from './pages/Dashboard/Dashboard';
import { Route, Routes } from 'react-router'
import PrivatePage from './components/PrivateRoute/PrivatePage';
import Cart from './components/Cart/Cart';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/*' element={<PrivatePage children={<Dashboard />} />} >
        <Route path='products' element={<Products/>} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App;
