import '../styles/ProductPage.css'
import {useLocation} from 'react-router-dom';
import Product from './Product'

function ProductPage() {
  const location = useLocation();
  const { id, title, image, price, rating } = location.state

  return(
    <div>
      <Product
        id={id}
        title={title}
        image={image}
        price={price}
        rating={rating}
      />
      {/* Reviews */}
    </div>
  )
}

export default ProductPage;
