import {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom';

function Search() {

  const [{ products }, dispatch] = useStateValue();
  const navigation = useNavigate();

  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const searchQuery = e =>{
    e.preventDefault()
    console.log('query', query)

  }

  const handleChange = e =>{
    const searchWord = e.target.value;
    setQuery(searchWord)

    const newFilter = products.filter((value) => {
      return value.data.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const resultClick = (value) =>{
    navigation(`/product/${value.id}`, {state:{
      id: value.data.id,
      title: value.data.title,
      image: value.data.image,
      price: value.data.price,
      rating: '5'
    }} )
    clearInput()
  }

  const clearInput = () => {
    setFilteredData([]);
    setQuery("");
  };


  return(
    <div className='header__search'>
      <input  value={query} onChange={handleChange} className='header__searchInput' type='text' />
      <SearchIcon onClick={searchQuery} className='header__searchIcon' />

      {filteredData.length != 0 && (
       <div className="dataResult">
         {filteredData.slice(0, 15).map((value, key) => {
           return (
             <div
              className='dataItem'
              onClick={() => resultClick(value)}>
              {value.data.title}
            </div>

           );
         })}
       </div>
     )}
    </div>
  )
}

export default Search;
