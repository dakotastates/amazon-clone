import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdminHeader from './AdminHeader'
import ManageAdmin from './ManageAdmin'

function Admin() {

  return(
    <Routes>
      <Route path='/*' element={<><AdminHeader/><Dashboard/></>} />
      <Route path='/manage-admin' element={<><AdminHeader/><ManageAdmin/></>} />
    </Routes>
  )
}

export default Admin;
