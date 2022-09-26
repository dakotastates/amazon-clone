import { useState, useEffect } from 'react'
import '../styles/createProduct.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase'
import ImageUpload from './ImageUpload'


function AddProduct() {

  const location = useLocation();

  const [title, setTitle] = useState(location.state ? location.state.product.data.title : '')
  const [brand, setBrand] = useState(location.state ? location.state.product.data.brand : '')
  const [description, setDescription] = useState(location.state ? location.state.product.data.description : '')
  const [price, setPrice] = useState(location.state ? location.state.product.data.price : '')
  const [image, setImage] = useState(location.state ? location.state.product.data.image : '')
  const [quantity, setQuantity] = useState(location.state ? location.state.product.data.quantity : 0)
  // const [category, setCategory] = useState('')
  // const [categories, setCategories] = useState([])
  // const [checkedCategories, setCheckedCategories] = useState(location.state ? location.state.product.data.categories : [])

  const [error, setError] = useState(null)

  const navigation = useNavigate();

  // useEffect(()=>{
  //   db
  //     .collection('category')
  //     .onSnapshot(snapshot => (
  //       setCategories(snapshot.docs.map(doc =>({
  //         id: doc.id,
  //         data: doc.data()
  //       })))
  //     ))
  // },[])



  const addProduct = () =>{
    db.collection('products').add({
       title: title,
       brand: brand,
       description: description,
       price: price,
       image: image,
       quantity: quantity,
     }).then(()=>{
        navigation('../');
     }).catch((err) =>{
       console.log(err)
     })

  }

  const editProduct = () =>{
    db
      .collection('products')
      .doc(location.state.product.id)
      .update({
         title: title,
         brand: brand,
         description: description,
         price: price,
         image: image,
         quantity: quantity,
     }).then(()=>{
        navigation('../');
     }).catch((err) =>{
       console.log(err)
     })

  }

  // const addCategory = e =>{
  //   e.preventDefault()
  //
  //   db.collection('category').add({
  //     category: category
  //   })
  //
  // }

  // const handleChange = e =>{
  //
  //   const isChecked = e.target.checked
  //   if (isChecked){
  //     setCheckedCategories([...checkedCategories, e.target.value])
  //   } else{
  //     const index = checkedCategories.indexOf(e.target.value);
  //     checkedCategories.splice(index, 1)
  //
  //     setCheckedCategories([checkedCategories])
  //     console.log('checked', checkedCategories)
  //   }
  // }

  // const handleToggle = c => ()=>{
  //
  //   const clickedCategory = checkedCategories.indexOf(c.id);
  //   // console.log('clicked Cat', clickedCategory)
  //   const all = [...checkedCategories]
  //
  //   if (clickedCategory === -1) {
  //     all.push(c);
  //   } else {
  //     all.splice(clickedCategory, 1);
  //   }
  //   setCheckedCategories(all);
  //   console.log(all)
  // }

  const handleSubmit = e =>{
    e.preventDefault()
    if (location.state){
      editProduct()
    } else{
      addProduct()
    }
  }


  return(
    <div className='create__product'>


      <div className='create__productContainer'>
        <h1>{location.state ? 'Edit' : 'Create'} Product</h1>

        <form onSubmit={handleSubmit}>
          <h5>Product Title</h5>
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} />

          <h5>Product Brand</h5>
          <input type='text' value={brand} onChange={e => setBrand(e.target.value)} />

          <h5>Description</h5>
          <textarea className='create__productDescription' value={description} onChange={e => setDescription(e.target.value)} />

          <h5>Price</h5>
          <input type='number' min="0.00" max="10000.00" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />

          <h5>Quantity</h5>
          <input type='number' min="0" max="10000"  value={quantity} onChange={e => setQuantity(e.target.value)} />


          <h5>Image Upload</h5>
          <ImageUpload setImage={setImage} />

          <h5>Or Image URL</h5>
          <input type='text' value={image} onChange={e => setImage(e.target.value)} />

          <button type='submit' className='create__productButton '>{location.state? 'Edit' : 'Create'} Product</button>

          {error && <div>{error}</div>}
        </form>

      </div>
    </div>
  )
}

export default AddProduct;



// <h5>Categories</h5>
// {categories?.map((cat, i)=>(
//
//   <li key={i} className="list-unstyled">
//     <input
//       onChange={handleToggle(cat)}
//
//       type="checkbox"
//       className="mr-2"
//     />
//     <label className="form-check-label">{cat.data.category}</label>
//   </li>
//
// ))}



// <h5>Categories</h5>
// {categories?.map((cat, i)=>(
//
//   <li key={i} className="list-unstyled">
//     <input
//       onChange={handleChange}
//       value={cat.data.category}
//       type="checkbox"
//       className="mr-2"
//     />
//     <label className="form-check-label">{cat.data.category}</label>
//   </li>
//
// ))}
// <input type='text' value={category} onChange={e => setCategory(e.target.value)} />
//
// <button onClick={addCategory}>Add Category</button>



// const categoriesJson = [
//   {
//     id: 1,
//     category: 'books',
//     subcategories: [
//       {id: 1, subcategory: 'ebooks'},
//       {id: 2, subcategory: 'hardback'}
//     ]
//   },
//   {
//     id:2,
//     category: 'electronics',
//     subcategories: [
//       {id: 1, subcategory:'phones'},
//       {id: 2, subcategory: 'tv'}
//     ]
//   },
//   {
//     id:3,
//     category: 'toys',
//     subcategories: [
//       {id: 1, subcategory: 'adult'},
//       {id: 2, subcategory: 'baby'},
//     ]
//   }
// ]
