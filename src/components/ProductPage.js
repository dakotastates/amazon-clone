import '../styles/ProductPage.css'
import {useLocation} from 'react-router-dom';
import Product from './Product'

function ProductPage() {
  const location = useLocation();
  const { id, title, brand, description, image, price, rating, inStock } = location.state

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
              {Array(rating).fill().map((_, i) => (
                <p>⭐</p>
              ))}
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
        <div className='product__reviews'>
          <h1>Reviews</h1>
          {/* Reviews */}
        </div>


      </div>

      {/* Reviews */}
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
