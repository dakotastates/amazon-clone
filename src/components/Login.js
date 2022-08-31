import { useState } from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigate();

  const signIn = e => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth)=>{
        if (auth){
          navigation('/');
        }
      })
      .catch(error => alert(error.message))
  }



  return(
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='Amazon logo'
        />
      </Link>

      <div className='login__container'>
        <h1>Sign-In</h1>

        <form>
          <h5>Email</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <button className='login__signInButton' type='submit' onClick={signIn}>Sign In</button>
        </form>
        <p>
          By signing-in you agree to AMAZON FAKE CLONE's Conditions of Use & Sale. Please see our Privary Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button className='login__registerButton' onClick={()=>navigation('/register')}>Create your Amazon account</button>
      </div>
    </div>
  )
}

export default Login;
