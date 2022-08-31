import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { functions } from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'


function ManageAdmin() {

  const [email, setEmail] = useState('')
  const navigation = useNavigate();

  const register = e =>{
    e.preventDefault()

    const addAdminRole = functions.httpsCallable('addAdminRole')
    addAdminRole({ email: email}).then(res => {
      console.log('admin?', res)
    })

  }

  return(
    <div className='login'>

        <div className='login__container'>
          <h1>Add Admin User</h1>

          <form>


            <h5>Email</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

            <button className='login__signInButton ' onClick={register}>Create Admin User</button>

          </form>


        </div>
      </div>
  )
}

export default ManageAdmin;
