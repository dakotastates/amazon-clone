import {useState} from 'react';
import '../styles/CreateReview.css'

function CreateReview() {
  const [review, setReview] = useState('')
  const [headline, setHeadline] = useState('')

  return(
    <div className='create__review'>
      <div className='create__reviewUser'>
        <p>Dakota</p>
      </div>

      <div className='form__container'>
        <h1>Create Review</h1>

        <div className='item__infoContainer'>
          <div className='item__info'>WACACO Nanopresso NS Adapter, Accessories for Nanopresso Portable Espresso Machine, Compat</div>
        </div>
        <hr/>

        <div className='overall__rating'>
          <h3>Overall rating</h3>
          {[...Array(5)].map((star, index) =><span className="star">&#9733;</span>)}
        </div>


        <hr/>

        <form>
          <h3>Add a headline</h3>
          <input type='text' placeholder="What's most important to know?" value={headline} onChange={e => setHeadline(e.target.value)} />
          <hr/>
          <h3>Add a written review</h3>
          <textarea className='review__textarea' value={review} placeholder='What did you like or dislike? What did you use this product for?' onChange={e => setReview(e.target.value)} />

          <button className='submit__btn'>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default CreateReview;
