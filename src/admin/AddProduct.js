import { useState } from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'


function AddProduct() {
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')

  const [error, setError] = useState(null)

  const navigation = useNavigate();



  const addProduct = e =>{
    e.preventDefault()

    db.collection('products').add({
       title: title,
       brand: brand,
       description: description,
       price: price,
       image: image,
     })

  }


  return(
    <div className='login'>


      <div className='login__container'>
        <h1>Add Product</h1>

        <form>
          <h5>Product Title</h5>
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} />

          <h5>Product Brand</h5>
          <input type='text' value={brand} onChange={e => setBrand(e.target.value)} />

          <h5>Description</h5>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />

          <h5>Price</h5>
          <input type='number' min="0.00" max="10000.00" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />

          <h5>Image URL</h5>
          <input type='text' value={image} onChange={e => setImage(e.target.value)} />



          <button className='login__signInButton ' onClick={addProduct}>Add Product</button>

          {error && <div>{error}</div>}
        </form>

      </div>
    </div>
  )
}

export default AddProduct;
