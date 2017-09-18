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
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeName(e) {
    this.setState({ nameVal: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ priceVal: e.target.value });
  }

  onChangeStock(e) {
    this.setState({ stockVal: e.target.checked });
  }

  onChangeCategory(e) {
    this.setState({ categoryVal: e.target.value });
  }

  onSave(e) {
    e.preventDefault();
    // create a new product object with form name/values
    const newProduct = {
      name: e.target.name.value,
      price: e.target.price.value,
      inStock: e.target.inStock.checked,
      categoryId: e.target.categoryId.value
    };
    // console.log('newProduct = ', newProduct);

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
    const { onChangeName, onChangePrice, onChangeStock, onChangeCategory, onSave } = this;
    const { categories } = this.props;

    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Add a Product</div>
          <div className="panel-body">

            <form onSubmit={ onSave }>

              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  className="form-control"
                  onChange={ onChangeName }
                  value={ nameVal }
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  onChange={ onChangePrice }
                  value={ priceVal }
                />
              </div>

              <div className="form-group">
                <label>In Stock</label>
                <br />
                <input
                  type="checkbox"
                  name="inStock"
                  onChange={ onChangeStock }
                  checked={ stockVal }
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="categoryId"
                  className="form-control"
                  onChange={ onChangeCategory }
                  value={ categoryVal} >
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
