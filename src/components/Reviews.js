import '../styles/Reviews.css'
import { useNavigate } from 'react-router-dom';

function Reviews({productId}) {
  const navigation = useNavigate();

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
        <button onClick={()=>navigation(`../create-review/${productId}`)}>Write a customer review</button>
      </div>
      <div className='reviews__right'>

        <div className='review__container'>
          <div className='review__customer'>Tiffany</div>
          <div className='review__rating'>
            {[...Array(5)].map((star, index) =><span className="star">&#9733;</span>)}
          </div>
          <div className='review__date'>Reviewed in the United States on August 23, 2022</div>
          <div className='review__description'>Like that I can use small pods, great for traveling also great for the airplane</div>
        </div>

        <div className='review__container'>
          <div className='review__customer'>Ken</div>
          <div className='review__rating'>
            {[...Array(5)].map((star, index) =><span className="star">&#9733;</span>)}
          </div>
          <div className='review__date'>Reviewed in the United States on August 23, 2022</div>
          <div className='review__description'>Like that I can use small pods, great for traveling also great for the airplane</div>
        </div>

        <div className='review__container'>
          <div className='review__customer'>Tara</div>
          <div className='review__rating'>
            {[...Array(5)].map((star, index) =><span className="star">&#9733;</span>)}
          </div>
          <div className='review__date'>Reviewed in the United States on August 23, 2022</div>
          <div className='review__description'>Like that I can use small pods, great for traveling also great for the airplane</div>
        </div>

      </div>
    </div>
  )
}

export default Reviews;
