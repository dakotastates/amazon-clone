import {useState, useEffect} from 'react'
import '../styles/Rating.css'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'

function Rating({productId}) {

  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [allRatings, setAllRatings] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  const handleRatings = (index) =>{
    db
      .collection('products')
      .doc(productId)
      .collection('ratings')
      .doc(user?.uid)
      .set({
        userId: user?.uid,
        rating: index
      })

    // setStarRating(index)
  }

  useEffect(()=>{
    db
      .collection('products')
      .doc(productId)
      .collection('ratings')
      .onSnapshot(snapshot => (
        setAllRatings(snapshot.docs.map(doc =>({
          ratings: doc.data()
        })))
      ))
      // console.log('allratings', allRatings[0].ratings)

  },[])

  useEffect(()=>{
    setStarRating(allRatings?.reduce((ratings, rating)=> (rating.ratings.rating + ratings), 0)/ allRatings.length)
  },[allRatings])


  return(
    <div className="star-rating">
    {[...Array(5)].map((star, index) => {
      index += 1;
      return (
        <button
          type="button"
          key={index}
          className={index <= (hover || starRating) ? "on" : "off"}
          onClick={() => handleRatings(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(starRating)}
          disabled={!user}
        >
          <span className="star">&#9733;</span>
        </button>
      );
    })}
    <div className='rating__num'>{allRatings.length} ratings</div>
  </div>
  )
}

export default Rating;
