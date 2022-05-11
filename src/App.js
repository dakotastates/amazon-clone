import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">

        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/checkout' element={<><Header /><Checkout/></>} />
          <Route path='/' element={<><Header /><Home/></>} />
          <Route path="*" element={<><Header /><NotFound/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
