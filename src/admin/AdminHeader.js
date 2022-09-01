import '../styles/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import { auth } from '../firebase'


function AdminHeader() {

  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () =>{
    if (user) {
      auth.signOut();
    }
  }

  return(
    <div className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
        />
      </Link>

      <div className='header__search'>
        <input className='header__searchInput' type='text' />
        <SearchIcon className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <Link to='../'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Admin</span>
            <span className='header__optionLineTwo'>Home</span>
          </div>
        </Link>
        <Link to={!user && '/login'}>
          <div className='header__option' onClick={handleAuthentication}>
            <span className='header__optionLineOne'>Hello, {user ? user.displayName.split(' ')[0] : 'Guest'}</span>
            <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <Link to='../manage-admin'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Manage</span>
            <span className='header__optionLineTwo'>Admin</span>
          </div>
        </Link>
        <Link to='../manage-products'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Manage</span>
            <span className='header__optionLineTwo'>Products</span>
          </div>
        </Link>

      </div>



    </div>
  )

}

export default AdminHeader;
