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
  }

  componentDidMount() {
    return Promise.all([
      axios.get('/api/products'),
      axios.get('/api/categories')
    ])
      .then(([ productResults, categoryResults ]) => {
        // results.data...
        const products = productResults.data;
        const categories = categoryResults.data;
        this.setState({
          products,
          categories
        });
      });
  }

  // createProduct(product) {

  // }

  // deleteProduct(){}

  // updateProduct(){}

  render() {
    // destructure from this.state
    const { products, categories } = this.state;
    // console.log(products, categories);

    return (
      <div className="container">
        <div className="page-header">
            <h1>Acme Product/Categories <small>React!</small></h1>
        </div>
        <div className="row">
          <ProductList products={ products } categories={ categories } />
          <ProductForm />
          <Summary products={ products } categories={ categories } />
        </div>
      </div>
    );
  }
}
