
import { Routes, Route } from 'react-router-dom';
import ProductNavbar from './ProductNavbar'
import AllProducts from './AllProducts'
import AddProduct from './AddProduct'

function ManageProducts() {
  return(
    <div>
      <ProductNavbar />
      <Routes>
        <Route path='/*' element={<><AllProducts/></>} />
        <Route path='/add-product' element={<><AddProduct/></>} />
      </Routes>
    </div>
  )
}

export default ManageProducts;
