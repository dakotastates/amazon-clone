import { useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './admin/Admin'
import Payment from './components/Payment'
import Orders from './components/Orders'
import ProductPage from './components/ProductPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { auth } from './firebase';
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51L1F70IVhxIy5qAnH5pZ7NX9VM6tCvcZAyBy0ebp0pwreo0rirTcR1zKXbNNejdphHPOjONGFTNhJPT9Ruh6etmy00PFqugjXf');

function App() {

  const [{ basket }, dispatch] = useStateValue();
  const admin = true

  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is', authUser)

      if (authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="app">

        <Routes>
          <Route path='/product/:id' element={<><Header /><ProductPage /></>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/checkout' element={<><Header /><Checkout/></>} />
          <Route path='/orders' element={<><Header /><Orders/></>} />
          <Route path='/payment' element={<><Header /><Elements stripe={promise}><Payment/></Elements></>} />
          {admin ?   <Route path='/admin/*' element={<Admin/>} /> : <Route path="*" element={<><Header /><NotFound/></>}/>}
          <Route path='/' element={<><Header /><Home/></>} />
          <Route path="*" element={<><Header /><NotFound/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
