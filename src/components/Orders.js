import { useState, useEffect } from 'react';
import '../styles/Orders.css'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'
import Order from './Order'
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);

  const [{ basket, user }, dispatch] = useStateValue();

  const navigation = useNavigate();

  useEffect(()=>{
    if(user){
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        ))
    } else {
      setOrders([user])
    }

  },[])

  if (user) {
    return(
      <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__order'>
          {orders?.map(order=>(
            <Order order={order} />
          ))}
        </div>
      </div>
    )
  }else{
    navigation('/login');
  }

}

export default Orders;
