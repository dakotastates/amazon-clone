import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdminHeader from './AdminHeader'
import ManageAdmin from './ManageAdmin'
import ManageProducts from './ManageProducts'

function Admin() {

  return(
    <Routes>
      <Route path='/*' element={<><AdminHeader/><Dashboard/></>} />
      <Route path='/manage-admin' element={<><AdminHeader/><ManageAdmin/></>} />
      <Route path='/manage-products/*' element={<><AdminHeader/><ManageProducts/></>} />
    </Routes>
  )
}

export default Admin;
