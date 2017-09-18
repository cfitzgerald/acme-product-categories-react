import React, { Component } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Summary from './Summary';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      categories: []
    };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    return Promise.all([
      // returns all products (including categories)
      axios.get('/api/products'),
      // returns all categories (including products)
      axios.get('/api/categories')
    ])
      .then(([ productResults, categoryResults ]) => {
        // RESULTS.data...
        const products = productResults.data;
        const categories = categoryResults.data;
        // setState with products and categories
        this.setState({
          products,
          categories
        });
      });
  }

  // takes a NEW product object; passed to ProductForm below (this.props.createProduct)
  createProduct(product) {
    return axios.post('/api/products', product)
      .then(result => {
        return Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
      })
      .then(([ productResults, categoryResults ]) => {
        const products = productResults.data;
        const categories = categoryResults.data;
        this.setState({
          products,
          categories
        });
      });
  }

  // takes an EXISTING product id; passed to ProductList below
  deleteProduct(id) {
    return axios.delete(`/api/products/${ id }`)
      .then(result => {
        return Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
      })
      .then(([ productResults, categoryResults ]) => {
        const products = productResults.data;
        const categories = categoryResults.data;
        this.setState({
          products,
          categories
        });
      });
  }

  // takes an EXISTING product id and product (req.body); passed to ProductList below
  updateProduct(id, product) {
    return axios.put(`/api/products/${ id }`, product)
      .then(result => {
        return Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
      })
      .then(([ productResults, categoryResults ]) => {
        const products = productResults.data;
        const categories = categoryResults.data;
        this.setState({
          products,
          categories
        });
      });
  }

  render() {
    // destructure from this.state, this
    const { products, categories } = this.state;
    const { createProduct, deleteProduct, updateProduct } = this;

    return (
      <div className="container">
        <div className="page-header">
          <h1>Acme Product/Categories <small>React!</small></h1>
        </div>
        <div className="row">
          <ProductList deleteProduct={ deleteProduct } updateProduct= { updateProduct } products={ products } categories={ categories } />
          <ProductForm createProduct={ createProduct } categories={ categories } />
          <Summary products={ products } categories={ categories } />
        </div>
      </div>
    );
  }
}
