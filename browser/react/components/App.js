import React, { Component } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Summary from './Summary';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Acme Product/Categories React!</h1>
        </div>
        <div className="row">
          <ProductList />
          <ProductForm />
          <Summary />
        </div>
      </div>
    );
  }
}
