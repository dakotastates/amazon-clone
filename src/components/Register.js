import { useState } from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'


function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)

  const navigation = useNavigate();

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e =>{
    e.preventDefault()
    setError('')
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) =>{
        if (auth){
          // debugger
          auth.user.updateProfile({
            displayName: name
          }).then(()=>{
            navigation('/');
          })

        }
      })
      .catch(error => alert(error.message))
  }

  // const register = e => {
  //   e.preventDefault()
  //   setError('')
  //   if(validatePassword()) {
  //     // Create a new user with email and password using firebase
  //       createUserWithEmailAndPassword(auth, email, password)
  //       .then((res) => {
  //         debugger
  //            res.user.updateProfile({
  //             displayName: name
  //           }).then(()=>{
  //             navigation('/');
  //           })
  //
  //         })
  //       .catch(err => setError(err.message))
  //   }
  //   setName('')
  //   setEmail('')
  //   setPassword('')
  //   setConfirmPassword('')
  // }

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
        <h1>Sign-Up</h1>

        <form>
          <h5>Your name</h5>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />

          <h5>Email</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <h5>Re-enter password</h5>
          <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

          <button className='login__signInButton ' onClick={register}>Create your Amazon account</button>

          {error && <div>{error}</div>}
        </form>

        <p>Already have an account?</p>
        <button className='login__registerButton' type='submit' onClick={()=>navigation('/login')}>Sign In</button>
      </div>
    </div>
  )
}

export default Register;
