import {useEffect, useState} from 'react';
import '../styles/Reviews.css'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'

function Reviews({productId, image, title}) {
  const navigation = useNavigate();
  const [reviews, setReviews] = useState([])

  useEffect(()=>{
    db
      .collection('products')
      .doc(productId)
      .collection('reviews')
      .onSnapshot(snapshot => (
        setReviews(snapshot.docs.map(doc =>({
          reviews: doc.data()
        })))
      ))
  },[])

  useEffect(()=>{

  },[reviews])



  return(
    <div className='product__reviews'>
      <div className='reviews__left'>
        <h1> Customer Reviews</h1>
        <div className='review__avgRating'>
          {[...Array(5)].map((star, index) =><span className="star">&#9733;</span>)}
          4.5 out of 5
        </div>
        <hr/>
        <h3>Review this product</h3>
        <p>Share your thoughts with other customers</p>
        <button onClick={()=>navigation(`../create-review/${productId}`, {state:{
          id: productId,
          title: title,
          image: image,
        }})}>Write a customer review</button>
      </div>
      <div className='reviews__right'>

        {(reviews.length > 0) ?
          reviews.map((review, index) =>(
            <div className='review__container'>
              <div className='review__customer'>{review.reviews.displayName}</div>
              <div className='review__rating'>
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= review.reviews.rating ? "on" : "off"}
                      disabled={true}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
                <p>{review.reviews.headline}</p>
              </div>
              <div className='review__date'>Reviewed in the United States on August 23, 2022</div>
              <div className='review__description'>{review.reviews.review}</div>
            </div>
          ))

          :
          <div className='review__container'>
            <h3>Be the first to review this product</h3>
          </div>

         }




      </div>
    </div>
  )
}

export default Reviews;
