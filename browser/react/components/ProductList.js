import React, { Component } from 'react';

export default class ProductList extends Component {

  constructor() {
    super();
    this.state = {

    };
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSave(e) {

  }

  onDelete(e) {

  }

  render() {
    // destructure from this.props
    const { products, categories } = this.props;
    const { onSave, onDelete } = this;

    return (
      <div className="col-sm-6">
        <div>

          {
            products.map(product => {
              return (
                <div key={ product.id } className="col-sm-4">
                  <div className="panel panel-default">
                    <div className="panel-body">

                      <form onSubmit={ onSave }>

                        <div className="form-group">
                          <label>Name</label>
                          <input name="name" className="form-control" value={ product.name } />
                        </div>

                        <div className="form-group">
                          <label>Price</label>
                          <input type="number" name="price" className="form-control" value={ product.price } />
                        </div>

                        <div className="form-group">
                          <label>In Stock</label>
                          <br />
                          <input type="checkbox" name="inStock" value={ product.inStock } />
                        </div>

                        <div className="form-group">
                          <label>Category</label>
                          <select name="categoryId" className="form-control">
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
                          <button className="btn btn-danger btn-block">Delete</button>
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
