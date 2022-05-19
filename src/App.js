import { useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Payment from './components/Payment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { auth } from './firebase';
import { useStateValue } from './StateProvider'

function App() {

  const [{ basket }, dispatch] = useStateValue();

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
          <Route path='/login' element={<Login/>} />
          <Route path='/checkout' element={<><Header /><Checkout/></>} />
          <Route path='/payment' element={<><Header /><Payment/></>} />
          <Route path='/' element={<><Header /><Home/></>} />
          <Route path="*" element={<><Header /><NotFound/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
