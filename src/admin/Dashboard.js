import { useStateValue } from '../StateProvider'
import {useEffect, useState} from 'react';
import { db } from '../firebase'

function Dashboard() {

  const [{ products }, dispatch] = useStateValue();


  useEffect(()=>{
    // db

      // .collection('users')
      // .doc('*')
      // .onSnapshot(snapshot => {
      //   console.log('users',snapshot.docs)
      //   setOrders(snapshot.docs.map(doc => ({
      //     id: doc.id,
      //     data: doc.data()
      //   })))
      // })
      // console.log(orders)
  },[])

  return(
    <div>
      <h1>Dashboard</h1>

      <h3>Recently Added Products</h3>

      <ul>
      {products.map(product =>(

          <li key={product.id}>{product.data.title} </li>

      )
     )}
     </ul>
    </div>
  )
}

export default Dashboard;
