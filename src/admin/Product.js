import { db } from '../firebase'
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom';


function Product({product}) {

  const [{  }, dispatch] = useStateValue();

  const { image, title, brand, quantity, price} = product?.data

  const navigation = useNavigate();

  const handleDelete = e =>{
    e.preventDefault()
    db.collection('products').doc(product.id).delete()

    dispatch({
      type: 'DELETE_PRODUCT',
      id: product.id
    })
  }

  const handleUpdate = e =>{
    e.preventDefault()
    navigation('./add-product', { state: { product: product } });
  }


  return(
    <tr>
      <td>
        <img
          className='allProduct__image'
          src={image}
          alt={title}
        />
      </td>
      <td>{title}</td>
      <td>{brand}</td>
      <td>{price}</td>
      <td>{quantity}</td>


      <td>
        <button onClick={handleUpdate} type="button">Edit</button>
        <button onClick={handleDelete} type="button">Delete</button>
      </td>
    </tr>
  )
}

export default Product;
