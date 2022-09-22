import '../styles/Product.css'
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom';
import Rating from './Rating'

function Product({id, title, description, brand, image, price, inStock}) {
  const [{ basket }, dispatch] = useStateValue();

  const navigation = useNavigate();

  // console.log('This is the basket', basket)
  const addToBasket = () =>{
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          brand: brand,
          description: description,
          image: image,
          price: price,
        }
      })
  }

  return(
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p><p>{brand}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className='pp__rating'>
          <Rating productId={id}  />
        </div>
      </div>

      <img
        src={image}
        alt={title}
        onClick={() => navigation(`/product/${id}`)}
      />

      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  )
}

export default Product;
