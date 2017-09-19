import React, { Component } from 'react';
import axios from 'axios';

export default class ProductList extends Component {

  constructor() {
    super();
    this.state = {
      productsList: []
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeStock = this.handleChangeStock.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        this.setState({
          productsList: products
        });
      });
  }

  componentWillReceiveProps(nextProps) {

  }

  // handlers similar to ProductForm, but also taking an id
  handleChangeName(e, id) {
    this.setState({ nameVal: e.target.value });
  }

  handleChangePrice(e, id) {
    this.setState({ priceVal: e.target.value });
  }

  handleChangeStock(e, id) {
    this.setState({ stockVal: e.target.checked });
  }

  handleChangeCategory(e, id) {
    this.setState({ categoryVal: e.target.value });
  }

  handleSave(e, id) {
    e.preventDefault();
  }

  handleDelete(e, id) {
    this.props.deleteProduct(id);
  }

  render() {
    // destructure from this.props
    const { products, categories } = this.props;
    const { handleChangeName, handleChangePrice, handleChangeStock, handleChangeCategory, handleSave, handleDelete } = this;

    return (
      <div className="col-sm-6">
        <div>

          {
            products && products.map(product => {
              return (
                <div key={ product.id } className="col-sm-4">
                  <div className="panel panel-default">
                    <div className="panel-body">

                      <form onSubmit={ handleSave }>

                        <div className="form-group">
                          <label>Name</label>
                          <input
                            name="name"
                            className="form-control"
                            onChange={ (e) => { handleChangeName(e, product.id) } }
                            value={ product.name }
                          />
                        </div>

                        <div className="form-group">
                          <label>Price</label>
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            onChange={ (e) => { handleChangePrice(e, product.id) } }
                            value={ product.price }
                          />
                        </div>

                        <div className="form-group">
                          <label>In Stock</label>
                          <br />
                          <input
                            type="checkbox"
                            name="inStock"
                            onChange={ (e) => { handleChangeStock(e, product.id) } }
                            checked={ product.inStock }
                          />
                        </div>

                        <div className="form-group">
                          <label>Category</label>
                          <select
                            name="categoryId"
                            className="form-control"
                            onChange={ (e) => { handleChangeCategory(e, product.id) } }
                            value={ product.category }
                          >
                            <option value="">-- none --</option>
                            {
                              categories.map(category => {
                                return (
                                  <option key={ category.id } value={ category.id }>{ category.name }</option>
                                );
                              })
                            }
                          </select>
                        </div>

                        <div className="form-group">

                          <button
                            className="btn btn-primary btn-block"
                          >Save</button>

                          <button
                            className="btn btn-danger btn-block"
                            onClick={ (e) => { handleDelete(e, product.id) } }
                          >Delete</button>

                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              );
            })
          }

        </div>
      </div>
    );
  }
}
