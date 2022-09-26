import {useState, useEffect} from 'react';
import '../styles/ProductsAdmin.css'
import { db } from '../firebase'
import Product from './Product'
import { useStateValue } from '../StateProvider'


function AllProducts() {
  const [{ products }, dispatch] = useStateValue();


  return(
    <div className='products__container'>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Quantity</th>

        </tr>
      </thead>
       <tbody>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
       </tbody>
     </table>
    </div>
  )
}

export default AllProducts;
