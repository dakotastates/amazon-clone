import '../styles/ProductPage.css'
import {useLocation} from 'react-router-dom';
import Product from './Product'
import Rating from './Rating'
import Reviews from './Reviews'


function ProductPage() {
  const location = useLocation();
  const { id, title, brand, description, image, price, inStock } = location.state

  return(
    <div className='product__page'>

      <div className='pp__top'>
        <div className='pp__left'>
          <img
            src={image}
            alt={title}
          />

        </div>

        <div className='pp__mid'>
          <div className='pp__info'>
            <h1>{title}</h1>

            <p>{brand}</p>

            <div className='pp__rating'>
              <Rating productId={id}  />
            </div>
            <hr/>
            <p className='pp__price'>
              <small>$</small>
              <strong>{price}</strong>
            </p>
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>

        <div className='pp__right'>
          <p className='pp__price'>
            <small>$</small>
            <strong>{price}</strong>
          </p>

          <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>

          <button>Add to Cart</button>
        </div>

      </div>

      <div className='pp__bottom'>
        <Reviews productId={id} />
      </div>

    </div>
  )
}

export default ProductPage;


// <Product
//   id={id}
//   title={title}
//   image={image}
//   price={price}
//   rating={rating}
// />
