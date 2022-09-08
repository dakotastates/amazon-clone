import { useState, useEffect } from 'react'
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
  const [categories, setCategories] = useState([])
  const [checkedCategories, setCheckedCategories] = useState([])

  const [error, setError] = useState(null)

  const navigation = useNavigate();

  useEffect(()=>{
    db
      .collection('category')
      .onSnapshot(snapshot => (
        setCategories(snapshot.docs.map(doc =>({
          id: doc.id,
          data: doc.data()
        })))
      ))
  },[])



  const addProduct = e =>{
    e.preventDefault()
    console.log('checked in product', checkedCategories)
    db.collection('products').add({
       title: title,
       brand: brand,
       description: description,
       price: price,
       image: image,
       categories: checkedCategories
     }).then(()=>{
        navigation('../');
     }).catch((err) =>{
       console.log(err)
     })

  }

  const addCategory = e =>{
    e.preventDefault()

    db.collection('category').add({
      category: category
    })

  }

  const handleToggle = c => ()=>{

    const clickedCategory = checkedCategories.indexOf(c.id);
    // console.log('clicked Cat', clickedCategory)
    const all = [...checkedCategories]

    if (clickedCategory === -1) {
      all.push(c.data);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckedCategories(all);
    console.log(all)
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

          <h5>Categories</h5>
          {categories?.map((cat, i)=>(

            <li key={i} className="list-unstyled">
              <input
                onChange={handleToggle(cat)}
                type="checkbox"
                className="mr-2"
              />
              <label className="form-check-label">{cat.data.category}</label>
            </li>

          ))}
          <input type='text' value={category} onChange={e => setCategory(e.target.value)} />

          <button onClick={addCategory}>Add Category</button>



          <button className='login__signInButton ' onClick={addProduct}>Add Product</button>

          {error && <div>{error}</div>}
        </form>

      </div>
    </div>
  )
}

export default AddProduct;
