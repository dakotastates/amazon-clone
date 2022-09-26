import '../styles/Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigation = useNavigate();


  return(
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          className='checkout__ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt='Ad'
        />

        <div>
          <h3>Hello, {user?.displayName}</h3>
          {basket.length === 0 ? <div><h2 className='checkout__title'><strong>Your Amazon Cart is empty.</strong></h2> {!user ? <button onClick={()=> navigation('/login') }>Login to your account</button> : null} </div>: <h2 className='checkout__title'>Shopping Cart</h2>}
          {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
             />
          ))}


        </div>
      </div>
      {(basket.length > 0) ?
        <div className='checkout__right'>
          <Subtotal />
        </div>
        : null}


    </div>
  )
}

export default Checkout;
