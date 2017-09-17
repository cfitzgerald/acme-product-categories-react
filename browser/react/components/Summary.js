import React, { Component } from 'react';

export default class Summary extends Component {

  render() {
    // destructure from this.props
    const { products, categories } = this.props;

    // needs:
    // 1. number of products: { products.length }

    // 2. list of categories with number of products; number of products with no categories
    const noCategory = products.filter(product => {
      return !product.category; // no category property
    });

    // 3.1 most expensive product: { product.name } and { product.price }
    // ...could have multiple most expensive products (re: acme products)
    const maxPrice = products.reduce((prev, current) => {
      return (current.price > prev) ? current.price : prev;
    }, 0);

    const mostExpensive = products.filter(product => {
      return product.price === maxPrice;
    });

    // 3.2 least expensive product: { product.name } and { product.price }
    const minPrice = products.reduce((prev, current) => {
      return (current.price <= prev) ? current.price : prev;
    }, maxPrice);

    const leastExpensive = products.filter(product => {
      return product.price === minPrice;
    });

    // 4. out of stock products
    const outOfStock = products.filter(product => {
      return !product.inStock;
    });

    // ???: conditional logic for 0, 1, and multiple products/categories

    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Product Summary</div>
          <div className="panel-body">

            <ul className="list-group">

              <li className="list-group-item">There are <strong>{ products.length }</strong> products.</li>

              <li className="list-group-item">Categories:
                <ul>
                  {
                    categories.map(category => {
                      return (
                        <li key={ category.id }><strong>{ category.name }</strong> has <strong>{ category.products.length }</strong> products.</li>
                      );
                    })
                  }
                  <li>No category for <strong>{ noCategory.length }</strong> product(s).</li>
                </ul>
              </li>

              <li className="list-group-item">Most expensive product(s):
                <ul>
                  {
                    mostExpensive.map(product => {
                      return (
                        <li key={ product.id }><strong>{ product.name }</strong> for <strong>{ product.price }</strong>.</li>
                      );
                    })
                  }
                </ul>
              </li>

              <li className="list-group-item">Least expensive product(s):
                <ul>
                  {
                    leastExpensive.map(product => {
                      return (
                        <li key={ product.id }><strong>{ product.name }</strong> for <strong>{ product.price }</strong>.</li>
                      );
                    })
                  }
                </ul>
              </li>

              <li className="list-group-item">Out of Stock:
                <ul>
                  {
                    outOfStock.map(product => {
                      return (
                        <li key={ product.id }>{ product.name }</li>
                      );
                    })
                  }
                </ul>
              </li>

            </ul>

          </div>
        </div>
      </div>
    );
  }
}
