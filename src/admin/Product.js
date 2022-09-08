import { db } from '../firebase'
import { useStateValue } from '../StateProvider'


function Product({product}) {

  const [{  }, dispatch] = useStateValue();

  const { title, brand, description, price} = product?.data

  const handleDelete = e =>{
    e.preventDefault()
    console.log(product.id)
    db.collection('products').doc(product.id).delete()

    dispatch({
      type: 'DELETE_PRODUCT',
      id: product.id
    })
  }

  const handleUpdate = e =>{
    e.preventDefault()
    console.log('update')
  }


  return(
    <tr>
      <td>{title}</td>
      <td>{brand}</td>
      <td>{price}</td>
      <td>{description}</td>


      <td>
        <button onClick={handleUpdate} type="button">Edit</button>
        <button onClick={handleDelete} type="button">Delete</button>
      </td>
    </tr>
  )
}

export default Product;
