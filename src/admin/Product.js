
function Product({product}) {



  const {title, brand, description, price} = product?.data



  return(
    <tr>
      <td>{title}</td>
      <td>{brand}</td>
      <td>{price}</td>
      <td>{description}</td>


      <td>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </td>
    </tr>
  )
}

export default Product;
