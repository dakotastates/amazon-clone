import '../styles/Nav.css'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import { auth } from '../firebase'


function ProductNavbar() {

  const [{ basket, user }, dispatch] = useStateValue();


  return(
    <div className='navbar'>
      <div className='nav__logo'>Manage Products</div>

      <div className='header__nav'>
        <Link to='./'>
          <div className='nav__option'>
            <span className='nav__optionLineOne'>All</span>
            <span className='nav__optionLineTwo'>Products</span>
          </div>
        </Link>
        <Link to='./add-product'>
          <div className='nav__option'>
            <span className='nav__optionLineOne'>Add</span>
            <span className='nav__optionLineTwo'>Product</span>
          </div>
        </Link>


      </div>

    </div>
  )

}

export default ProductNavbar;
