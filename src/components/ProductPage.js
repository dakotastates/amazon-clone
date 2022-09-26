import {useEffect, useState} from 'react';
import '../styles/ProductPage.css'
import { useParams, useNavigate} from 'react-router-dom';
import Product from './Product'
import Rating from './Rating'
import Reviews from './Reviews'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'


function ProductPage() {
  const [product, setProduct] = useState([])
  const [inStock, setInStock] = useState(false)

  const [{ basket }, dispatch] = useStateValue();

  const params = useParams();
  const navigation = useNavigate();

  const { title, brand, description, image, price, quantity } = product


  useEffect(()=>{
    const docRef = db.collection("products").doc(params.id);

    docRef.get().then((doc) => {
      if (doc.exists) {
          // console.log("Document data:", doc.data());
          const data = doc.data()
          setProduct(data)
      } else {
            // doc.data() will be undefined in this case
          console.log("No such document!");
          navigation('*')
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

  },[product])

  useEffect(()=>{
    if (quantity == 0){
      setInStock(false)
    } else{
      setInStock(true)
    }
  },[product])

  const addToBasket = () =>{
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: params.id,
          title: title,
          brand: brand,
          description: description,
          image: image,
          price: price,
        }
      })
  }


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
              <Rating productId={params.id}  />
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

          <button onClick={addToBasket} disabled={!inStock}>{inStock ? 'Add to Cart' : 'Out of Stock'}</button>

        </div>

      </div>

      <div className='pp__bottom'>
        <Reviews productId={params.id} image={image} title={title} />
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
