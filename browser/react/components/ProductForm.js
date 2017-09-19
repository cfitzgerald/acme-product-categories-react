import React, { Component } from 'react';

export default class ProductForm extends Component {

  constructor() {
    super();
    this.state = {
      nameVal: '',
      priceVal: 0,
      stockVal: false,
      categoryVal: '',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeStock = this.handleChangeStock.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChangeName(e) {
    this.setState({ nameVal: e.target.value });
  }

  handleChangePrice(e) {
    this.setState({ priceVal: e.target.value });
  }

  handleChangeStock(e) {
    this.setState({ stockVal: e.target.checked });
  }

  handleChangeCategory(e) {
    this.setState({ categoryVal: e.target.value });
  }

  handleSave(e) {
    e.preventDefault();
    // create a new product object with form name/values
    const newProduct = {
      name: e.target.name.value,
      price: e.target.price.value,
      inStock: e.target.inStock.checked,
      categoryId: e.target.categoryId.value
    };
    console.log('newProduct = ', newProduct);

    // invoke createProduct passed from App.js as a prop
    this.props.createProduct(newProduct)
      .then(result => {
        // reset/clear form data
        this.setState({
          nameVal: '',
          priceVal: 0,
          stockVal: false,
          categoryVal: '',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // ???: validation...

  render() {
    // console.log('ProductForm render()!');
    const { nameVal, priceVal, stockVal, categoryVal } = this.state;
    const { handleChangeName, handleChangePrice, handleChangeStock, handleChangeCategory, handleSave } = this;
    const { categories } = this.props;

    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Add a Product</div>
          <div className="panel-body">

            <form onSubmit={ handleSave }>

              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  className="form-control"
                  onChange={ handleChangeName }
                  value={ nameVal }
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  onChange={ handleChangePrice }
                  value={ priceVal }
                />
              </div>

              <div className="form-group">
                <label>In Stock</label>
                <br />
                <input
                  type="checkbox"
                  name="inStock"
                  onChange={ handleChangeStock }
                  checked={ stockVal }
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="categoryId"
                  className="form-control"
                  onChange={ handleChangeCategory }
                  value={ categoryVal }
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
                <button className="btn btn-primary btn-block">Save</button>
              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }
}
