import { useState, useEffect } from 'react'
import '../styles/Payment.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase'



function CreateAddress({user, setAddress, addresses, setAddressChange}) {

  const location = useLocation();

  const [newAddress, setNewAddress] = useState(false)
  // const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')

  const [error, setError] = useState(null)

  const navigation = useNavigate();



  const addAddress = () =>{
    db
      .collection('users')
      .doc(user?.uid)
      .collection('address')
      .add({
         fullName: fullName,
         phoneNumber: phoneNumber,
         addressLine1: addressLine1,
         addressLine2: addressLine2,
         city: city,
         state: state,
         zipCode: zipCode

       }).then(()=>{
          setAddress({
            fullName: fullName,
            phoneNumber: phoneNumber,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipCode: zipCode
          })
          setAddressChange(false)
       }).catch((err) =>{
         console.log(err)
       })

  }

  const editAddress = () =>{
    // db
    //   .collection('products')
    //   .doc(location.state.product.id)
    //   .update({
    //      title: title,
    //      brand: brand,
    //      description: description,
    //      price: price,
    //      image: image,
    //      quantity: quantity,
    //  }).then(()=>{
    //     navigation('../');
    //  }).catch((err) =>{
    //    console.log(err)
    //  })

  }

  const handleUseAddress = e =>{
    e.preventDefault()
      setAddress(JSON.parse(selectedAddress))
      setAddressChange(false)

  }

  const handleSubmit = e =>{
    e.preventDefault()
    if (location.state){
      editAddress()
    } else{
      addAddress()
    }
  }


  const onChangeValue = e =>{
    // e.preventDefault()
    const value = e.target.value
    // console.log(value)
    const addressObj = JSON.parse(value)
    setSelectedAddress(value)
  }

if(newAddress){
  return(
    <div className='create__address'>

      <div className='create__addressContainer'>
        <div className='address__closeBtn'>
          <button className='closeBtn' onClick={()=>setNewAddress(!newAddress)}>X</button>
        </div>
        <h1>Add a new address</h1>

        <form onSubmit={handleSubmit}>
          <h5>Full name (First and Last name)</h5>
          <input type='text' value={fullName} onChange={e => setFullName(e.target.value)} />

          <h5>Phone number</h5>
          <input type='text' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

          <h5>Address</h5>
          <input type='text' placeholder='Street address or P.O. Box' value={addressLine1} onChange={e => setAddressLine1(e.target.value)} />
          <br/>
          <input type='text' placeholder='Apt, suit, unit, building, floor, etc' value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />

          <div className='address__form'>
            <div className='address__city'>
              <h5>City</h5>
              <input type='text' value={city} onChange={e => setCity(e.target.value)} />
            </div>

            <div className='address__state'>
              <h5>State</h5>
              <input type='text' value={state} onChange={e => setState(e.target.value)} />
            </div>

            <div className='address__zip'>
              <h5>ZipCode</h5>
              <input type='text' value={zipCode} onChange={e => setZipCode(e.target.value)} />
            </div>

          </div>


          <button onClick={handleSubmit} type='submit' className='create__addressButton '>{location.state? 'Update' : 'Use'} this Address</button>

          {error && <div>{error}</div>}
        </form>

      </div>
    </div>
  )
} else {
  return (
    <div className='create__address'>
      <div className='create__addressContainer'>
        <h2>Addresses</h2>
        {(addresses.length > 0) ?
          <form >
            {addresses.map((address, index) => (
              <div key={address.id}>
                <input onChange={onChangeValue} type="radio" value={JSON.stringify(address.data)} name="address" /> <strong>{address.data.fullName}</strong> {address.data.addressLine1}, {address.data.addressLine2}, {address.data.city}, {address.data.state}, {address.data.zipCode}
              </div>
            ))}

            <div className='address__btns'>
              <button className='new__address' onClick={()=>setNewAddress(!newAddress)}>Add a new address</button>
              <button className='create__addressButton' onClick={handleUseAddress}>Use this address</button>
            </div>
          </form>
          :
          <button className='new__address' onClick={()=>setNewAddress(!newAddress)}>Add a new address</button>
         }

      </div>
    </div>
  )
}
}

export default CreateAddress;
