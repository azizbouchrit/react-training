const ProductCard = (props) => {
  const handleDelete = () => {
    props.onDelete(props.product.id)
  }
  const handleEdit = () => {
    props.onEdit(props.product)
  }

  return (
    <div className='card mb-5' style={{ width: '250px' }}>
      <div className='card-body'>
        <h5 className='card-title'>{props.product.title}</h5>
        <p className='card-text'>Price: {props.product.price}DT</p>
        <button className='btn btn-primary' onClick={handleEdit} >Edit</button>
        <button className='btn btn-danger ms-3' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default ProductCard
