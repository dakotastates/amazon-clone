import SearchIcon from '@material-ui/icons/Search';

function Search() {


  return(
    <div className='header__search'>
      <input className='header__searchInput' type='text' />
      <SearchIcon className='header__searchIcon' />
    </div>
  )
}

export default Search;
