import {useState, useEffect} from 'react';
import { db } from '../firebase'
import Product from './Product'

function AllProducts() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    db
      .collection('products')
      .onSnapshot(snapshot => (
        setProducts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  },[])

  return(
    <div>
      All Products
      {products.map(product =>(
        <Product product={product} />
      ))}
    </div>
  )
}

export default AllProducts;
