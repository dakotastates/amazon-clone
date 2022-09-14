import { useStateValue } from '../StateProvider'

function Dashboard() {

  const [{ products }, dispatch] = useStateValue();
  console.log(products)
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
