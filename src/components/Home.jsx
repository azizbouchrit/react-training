import axios from 'axios'
import React, { Component } from 'react'
import ProductCard from './ProductCard'

class Home extends Component {
  state = {
    products: [
      { id: '1', title: 'Tshirt', price: 30 },
      { id: '2', title: 'Shoes', price: 50 },
      { id: '3', title: 'Pants', price: 100 }
    ],
    newProduct: {
      id: '',
      title: '',
      price: 0
    },
    formMode: 'NEW'
  }

  async componentDidMount () {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products')
      console.log(data)
      this.setState({ products: data })
    } catch (error) {
      console.log(error)
    }
  }

  handleInputChange = e => {
    const newProduct = { ...this.state.newProduct }
    newProduct[e.currentTarget.name] = e.currentTarget.value
    this.setState({ newProduct })
  }

  handleSubmit = async e => {
    e.preventDefault()
    let products = [...this.state.products]
    const newProduct = { ...this.state.newProduct }
    if (this.state.formMode === 'NEW') {
      try {
        const res = await axios.post(
          'https://fakestoreapi.com/products/',
          newProduct
        )
        console.log(res)
        products = [{ id: Date(), ...this.state.newProduct }, ...products]
      } catch (e) {
        console.log(e)
      }
    }
    if (this.state.formMode === 'EDIT') {
      try {
        const res = await axios.put(
          'https://fakestoreapi.com/products/' + newProduct.id,
          newProduct
        )
        if (res.status === 200) {
          const index = products.findIndex(
            product => product.id === this.state.newProduct.id
          )
          products[index] = { ...this.state.newProduct }
        }
      } catch (e) {
        console.log(e)
        return
      }
    }

    this.setState({
      products,
      newProduct: {
        title: '',
        price: 0
      },
      formMode: 'NEW'
    })
  }

  handleDelete = async id => {
    try {
      const res = await axios.delete('https://fakestoreapi.com/products/' + id)
      console.log(res)
      if (res.status === 200) {
        const products = this.state.products.filter(
          product => product.id !== id
        )
        this.setState({ products })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleEdit = product => {
    this.setState({ newProduct: product, formMode: 'EDIT' })
  }

  render () {
    return (
      <div className='container mt-3 '>
        <form className='d-flex' onSubmit={this.handleSubmit}>
          <input
            className='form-control me-3'
            name='title'
            placeholder='Title'
            value={this.state.newProduct.title}
            onChange={this.handleInputChange}
          />
          <input
            className='form-control me-3'
            name='price'
            placeholder='Price'
            type='number'
            value={this.state.newProduct.price}
            onChange={this.handleInputChange}
          />
          <button className='btn btn-primary'>
            {this.state.formMode === 'NEW' ? 'Add' : 'Edit'}
          </button>
        </form>
        <div className=' mt-3 d-flex flex-wrap justify-content-between'>
          {this.state.products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Home
