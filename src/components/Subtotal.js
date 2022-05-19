import '../styles/Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider'
import { getBasketTotal } from '../reducer';
import { useNavigate } from 'react-router-dom';


function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const navigation = useNavigate();


  return(
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length}):
              <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <button onClick={e => navigation('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal;
