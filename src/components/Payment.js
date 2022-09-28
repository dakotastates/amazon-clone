import { useState, useEffect } from 'react'
import '../styles/Payment.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import { db } from '../firebase'
import CreateAddress from './CreateAddress'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigation = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('')
  const [addressChange, setAddressChange] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState(null)

  useEffect(()=>{
    if (!basket.length > 0){
      navigation('/')
    }
  },[])

  useEffect(()=>{
    db
      .collection('users')
      .doc(user?.uid)
      .collection('address')
      .onSnapshot(snapshot => (
        setAddresses(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  },[])


  useEffect(() =>{
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  }, [basket])
// console.log('clientSecret', clientSecret)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await  stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {

      //nosql database
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          shippingAddress: address,
          created: paymentIntent.created
        })

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({
        type: 'EMPTY_BASKET'
      })

      navigation('../orders', { replace: true });

    })
  }

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  }


  return(
    <div className='payment'>
      <div className='payment__container'>
        <h1>Checkout (<Link to='/checkout'>{basket.length}</Link>)</h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>

            {addressChange ?

              <div>
                <CreateAddress user={user} setAddress={setAddress} addresses={addresses} setAddressChange={setAddressChange} />
              </div>

              :

              <div>
              {address ?
                <div>

                  <p>{address.fullName}</p>
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>{address.city} {address.state}, {address.zipCode}</p>
                </div>
                :
                <div>Please provide an address Address</div>
              }

              </div>

            }

            <div onClick={()=>setAddressChange(!addressChange)}>
              {addressChange ? 'Close' : 'Change'}
            </div>

          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and Delivery</h3>
          </div>
          <div className='payment__items'>
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
        <div className='payment__section'>
            <div className='payment__title'>
              <h3>Payment Method</h3>
            </div>
            <div className='payment__details'>
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />

                <div className='payment__priceContainer'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3>Order Total: {value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </div>
                <button disabled={processing || disabled || succeeded || !address}>
                  <span>{processing ? <p>Processing...</p> : 'Buy Now'}</span>
                </button>

                {error && <div>{error}</div>}
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;
