import '../styles/Product.css'
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom';

function Product({id, title, description, brand, image, price, rating, inStock}) {
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
          rating: rating
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

        <div className='product__rating'>
          {Array(rating).fill().map((_, i) => (
            <p>⭐</p>
          ))}
        </div>
      </div>

      <img
        src={image}
        alt={title}
        onClick={() => navigation(`/product/${id}`, {state:{
          id: id,
          title: title,
          brand: brand,
          description: description,
          image: image,
          price: price,
          rating: rating,
          inStock: inStock
        }} )}
      />

      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  )
}

export default Product;
