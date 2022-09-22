import {useState, useEffect} from 'react';
import '../styles/CreateReview.css'
import { useStateValue } from '../StateProvider'
import { useNavigate, useParams, useLocation } from "react-router";
import { db } from '../firebase'
import Rating from './Rating'

function CreateReview() {
  const [review, setReview] = useState('')
  const [headline, setHeadline] = useState('')
  const [product, setProduct] = useState(null)
  const [reviewRating, setReviewRating] = useState(0)

  const [{ user }, dispatch] = useStateValue();


  const navigation = useNavigate();
  const params = useParams();
  const location = useLocation();

  const { id, title, image } = location.state


  useEffect(()=>{
    if (!id){
      navigation('*')
    }

  },[])

  const handleSubmit = e =>{
    e.preventDefault()
    db
      .collection('products')
      .doc(id)
      .collection('reviews')
      .add({
        userId: user?.uid,
        displayName: user?.displayName,
        headline: headline,
        rating: reviewRating,
        review: review
      }).then(()=>{
         navigation(`/product/${params.id}`);
      }).catch((err) =>{
        console.log(err)
      })

  }

  return(
    <div className='create__review'>
      <div className='create__reviewUser'>
        <p>{user?.displayName}</p>
      </div>

      <div className='form__container'>
        <h1>Create Review</h1>

        <div className='item__infoContainer'>
          <img
            className='reviewProduct__image'
            src={image}
            alt={title}
          />
          <div className='item__info'>{title}</div>
        </div>
        <hr/>

        <div className='overall__rating'>
          <h3>Overall rating</h3>
          <Rating setReviewRating={setReviewRating} productId={params.id} />
        </div>


        <hr/>

        <form>
          <h3>Add a headline</h3>
          <input type='text' placeholder="What's most important to know?" value={headline} onChange={e => setHeadline(e.target.value)} />
          <hr/>
          <h3>Add a written review</h3>
          <textarea className='review__textarea' value={review} placeholder='What did you like or dislike? What did you use this product for?' onChange={e => setReview(e.target.value)} />

          <button onClick={handleSubmit} className='submit__btn'>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default CreateReview;


// {[...Array(5)].map((star, index) =><span key={index} className="star">&#9733;</span>)}
